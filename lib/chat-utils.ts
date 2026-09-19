/**
 * chat-utils.ts
 * RAG (Retrieval-Augmented Generation) search utility for Patil Group chatbot.
 * - Reads structured text extracted from app pages (website-data.json)
 * - Augments with static knowledge base facts (knowledge-base.ts)
 * - Scores entries by keyword overlap and current page context
 * - Returns a trimmed context string for the Groq system prompt
 */

import websiteData from "./website-data.json";
import { knowledgeBase } from "./knowledge-base";

type WebsiteEntry = {
  type: string;
  text: string;
  key?: string;
};

type PageData = Record<string, WebsiteEntry[]>;

const pageData = websiteData as PageData;

/**
 * Stop-words to ignore during tokenisation.
 */
const STOP_WORDS = new Set([
  "the", "and", "for", "with", "this", "that", "from", "are", "our",
  "has", "have", "been", "was", "were", "will", "can", "not", "but",
  "all", "any", "its", "more", "also", "than", "into", "what", "which",
  "who", "how", "why", "when", "where", "about",
]);

/**
 * Tokenise a string into lower-case words (≥ 3 chars), filtering stop-words.
 */
function tokenise(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 2 && !STOP_WORDS.has(w));
}

/**
 * Score how well an entry's text matches the query tokens.
 */
function scoreEntry(entry: WebsiteEntry, queryTokens: string[]): number {
  const entryTokens = tokenise(entry.text);
  let score = 0;
  for (const qt of queryTokens) {
    for (const et of entryTokens) {
      if (et === qt) score += 4;                          // exact match
      else if (et.startsWith(qt) || qt.startsWith(et)) score += 2; // prefix
      else if (et.includes(qt) || qt.includes(et)) score += 1; // substring
    }
  }
  // Type boosts
  if (entry.type === "header")   score *= 1.5;
  if (entry.type === "metadata") score *= 1.3;
  if (entry.key === "post" || entry.key === "role" || entry.key === "designation") score *= 1.5;
  return score;
}

/**
 * Pair consecutive name + post entries so the chatbot sees
 * "Dr. L. S. Patil — Executive Chairman" as one fact.
 */
function mergeNamePostPairs(entries: WebsiteEntry[]): WebsiteEntry[] {
  const merged: WebsiteEntry[] = [];
  for (let i = 0; i < entries.length; i++) {
    const cur = entries[i];
    const nxt = entries[i + 1];
    if (
      cur.type === "metadata" &&
      cur.key === "name" &&
      nxt &&
      nxt.type === "metadata" &&
      nxt.key === "post"
    ) {
      merged.push({
        type: "metadata",
        key: "person",
        text: `${cur.text} — ${nxt.text}`,
      });
      i++; // skip the post entry
    } else {
      merged.push(cur);
    }
  }
  return merged;
}

/**
 * Format a single page's entries into a readable block.
 */
function formatPage(route: string, entries: WebsiteEntry[]): string {
  const lines: string[] = [`[Page: ${route}]`];
  for (const e of entries) {
    if (e.type === "header") {
      lines.push(`  • ${e.text}`);
    } else if (e.type === "metadata" && e.key) {
      if (e.key === "person") {
        lines.push(`  - ${e.text}`);
      } else {
        lines.push(`  ${e.key}: ${e.text}`);
      }
    } else {
      lines.push(`  ${e.text}`);
    }
  }
  return lines.join("\n");
}

/**
 * Main export — builds a context string for the Groq system prompt.
 *
 * @param query       The user's message.
 * @param maxChars    Maximum character budget for the returned context.
 * @param pathname    The current page path (used to boost relevant sections).
 */
export function searchWebsiteData(
  query: string,
  maxChars = 3500,
  pathname?: string | null
): string {
  const queryTokens = tokenise(query);
  if (queryTokens.length === 0) return knowledgeBase.substring(0, maxChars);

  // ── 1. Pre-process: merge name+post pairs in all pages ────────────────────
  const processedPageData: PageData = {};
  for (const [route, entries] of Object.entries(pageData)) {
    if (Array.isArray(entries)) {
      processedPageData[route] = mergeNamePostPairs(entries);
    }
  }

  // ── 2. Score every route ──────────────────────────────────────────────────
  type ScoredRoute = { route: string; score: number; entries: WebsiteEntry[] };
  const scored: ScoredRoute[] = [];

  for (const [route, entries] of Object.entries(processedPageData)) {
    if (!Array.isArray(entries) || entries.length === 0) continue;

    let routeScore = 0;

    // Bonus if this is the page the user is currently on
    if (pathname && route !== "/" && pathname.startsWith(route)) {
      routeScore += 15;
    }

    // Also score route name itself against query
    const routeTokens = tokenise(route.replace(/-/g, " "));
    for (const qt of queryTokens) {
      for (const rt of routeTokens) {
        if (rt === qt || rt.includes(qt) || qt.includes(rt)) routeScore += 5;
      }
    }

    for (const entry of entries) {
      routeScore += scoreEntry(entry, queryTokens);
    }

    if (routeScore > 0) {
      scored.push({ route, score: routeScore, entries });
    }
  }

  scored.sort((a, b) => b.score - a.score);

  // ── 3. Build context up to maxChars budget ────────────────────────────────
  const parts: string[] = [];
  let used = 0;

  // Always prepend a slice of the static knowledge base
  const kbSlice = knowledgeBase.substring(0, Math.floor(maxChars * 0.35));
  parts.push(kbSlice);
  used += kbSlice.length;

  for (const { route, entries } of scored) {
    if (used >= maxChars) break;

    // Take the top-scoring individual entries per route (more entries = better coverage)
    const scoredEntries = entries
      .map((e) => ({ e, s: scoreEntry(e, queryTokens) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 20)
      .map((x) => x.e);

    if (scoredEntries.length === 0) continue;

    const block = formatPage(route, scoredEntries);
    if (used + block.length > maxChars) {
      const trimmed = block.substring(0, maxChars - used);
      parts.push(trimmed);
      used += trimmed.length;
      break;
    }
    parts.push(block);
    used += block.length;
  }

  return parts.join("\n\n");
}
