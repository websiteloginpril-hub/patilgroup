// Builds knowledge-base.json from your website's content.
//
// Two ways to feed it content (use either or both):
//
// 1) LOCAL FILES — put .html, .md, or .txt files in the /data folder
//    (easiest if you can export/copy your site's pages as files)
//
// 2) LIVE URLS — list your page URLs in urls.txt (one per line),
//    and this script will fetch + extract the text automatically
//
// Run with: npm run ingest

import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import * as cheerio from "cheerio";
import matter from "gray-matter";
import { chunkText } from "./lib/chunk.js";

const DATA_DIR = path.join(process.cwd(), "data");
const URLS_FILE = path.join(process.cwd(), "urls.txt");
const OUTPUT_FILE = path.join(process.cwd(), "knowledge-base.json");

async function extractFromHtml(html, source) {
  const $ = cheerio.load(html);

  // Strip elements that are never real content
  $("script, style, noscript, nav, footer, header, svg, iframe, form").remove();

  const title = $("title").first().text().trim() || $("h1").first().text().trim();

  // Prefer <main>/<article> if present, otherwise fall back to <body>
  const root = $("main").length ? $("main") : $("article").length ? $("article") : $("body");

  const text = root
    .find("p, li, h1, h2, h3, h4, blockquote, td, th")
    .map((_, el) => $(el).text().trim())
    .get()
    .filter(Boolean)
    .join("\n\n");

  return { title, text: text || $.text().trim() };
}

function extractFromMarkdown(raw) {
  const { data, content } = matter(raw);
  return { title: data.title || "", text: content };
}

async function loadLocalFiles() {
  if (!fs.existsSync(DATA_DIR)) return [];
  const files = fs.readdirSync(DATA_DIR).filter((f) => !f.startsWith("."));
  const results = [];

  for (const file of files) {
    const full = path.join(DATA_DIR, file);
    const ext = path.extname(file).toLowerCase();
    const raw = fs.readFileSync(full, "utf-8");

    let title = file;
    let text = raw;

    if (ext === ".html" || ext === ".htm") {
      ({ title, text } = await extractFromHtml(raw, file));
    } else if (ext === ".md" || ext === ".markdown") {
      ({ title, text } = extractFromMarkdown(raw));
      title = title || file;
    } // .txt: used as-is

    results.push({ source: file, title, text });
    console.log(`  ✓ loaded ${file} (${text.length} chars)`);
  }
  return results;
}

async function loadUrls() {
  if (!fs.existsSync(URLS_FILE)) return [];
  const urls = fs
    .readFileSync(URLS_FILE, "utf-8")
    .split("\n")
    .map((u) => u.trim())
    .filter((u) => u && !u.startsWith("#"));

  const results = [];
  for (const url of urls) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": "WebsiteChatbotIngest/1.0" } });
      if (!res.ok) {
        console.warn(`  ✗ skipped ${url} (HTTP ${res.status})`);
        continue;
      }
      const html = await res.text();
      const { title, text } = await extractFromHtml(html, url);
      results.push({ source: url, title, text });
      console.log(`  ✓ fetched ${url} (${text.length} chars)`);
    } catch (err) {
      console.warn(`  ✗ failed ${url}: ${err.message}`);
    }
  }
  return results;
}

async function main() {
  console.log("Loading local files from /data ...");
  const localDocs = await loadLocalFiles();

  console.log("Fetching URLs from urls.txt ...");
  const urlDocs = await loadUrls();

  const allDocs = [...localDocs, ...urlDocs];

  if (allDocs.length === 0) {
    console.error(
      "\nNo content found. Add files to /data (.html, .md, .txt) or list page URLs in urls.txt, then re-run."
    );
    process.exit(1);
  }

  let allChunks = [];
  for (const doc of allDocs) {
    const chunks = chunkText(doc.text, doc.source, doc.title);
    allChunks = allChunks.concat(chunks);
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allChunks, null, 2));
  console.log(
    `\nDone. Wrote ${allChunks.length} chunks from ${allDocs.length} page(s) to ${OUTPUT_FILE}`
  );
}

main();
