/**
 * app/api/chat/route.ts
 *
 * Next.js API route for the Patil Group chatbot.
 * Ports the full logic from website-chatbot/server.js:
 *  - Loads knowledge-base.json (107 chunks crawled from patilgroup.com)
 *  - Uses TF-IDF retriever to find top-5 relevant chunks
 *  - Has hardcoded fast-paths for management/company questions
 *  - Calls Groq with retrieved context + conversation history
 *  - Returns { answer, sources }
 */

import { NextRequest, NextResponse } from "next/server";
import { Retriever, Chunk, SearchResult } from "@/lib/retriever";
import knowledgeBase from "@/lib/knowledge-base.json";

const GROQ_API_KEY =
  process.env.GROQ_API_KEY ||
  process.env.NEXT_PUBLIC_GROQ_API_KEY ||
  "";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const CANDIDATE_MODELS = [
  process.env.GROQ_MODEL,
  "openai/gpt-oss-120b",
  "qwen/qwen3.6-27b",
  "groq/compound",
].filter((m): m is string => Boolean(m));

// Boot-time: build the TF-IDF index once (cached across requests in the same worker)
const chunks = knowledgeBase as Chunk[];
const retriever = new Retriever(chunks);

const SYSTEM_PROMPT = `You are the official AI Assistant for Patil Group, India's leading manufacturer of railway track infrastructure components (concrete sleepers, slab track systems, fasteners, wires, castings, precast solutions, and CME products) with over 50 years of industry leadership.

Your goal is to assist visitors with rich, accurate, engaging, and professional information about Patil Group's products, manufacturing footprint, plant locations, technology, leadership, and services.

Guidelines:
- Provide clear, well-formatted, and helpful answers using the provided context and core company knowledge.
- Never output meta-disclaimers like "The website content provided doesn't specify..." or "I don't have that chunk...". Instead, give a helpful answer based on available knowledge and politely invite the visitor to contact info@patilgroup.com or visit the Contact page for extra technical specifications.
- Use clean bullet points or short paragraphs for readability.
- Maintain a warm, welcoming, and authoritative corporate tone.`;

function buildContextBlock(matches: SearchResult[]) {
  if (matches.length === 0) return "(no relevant content found on the site for this question)";
  return matches
    .map(
      (m, i) =>
        `[Source ${i + 1}${m.title ? `: ${m.title}` : ""} — ${m.source}]\n${m.text}`
    )
    .join("\n\n---\n\n");
}

function filterMatchesForQuestion(
  matches: SearchResult[],
  message: string
): SearchResult[] {
  const normalized = message.toLowerCase();
  const asksAboutPrivacy = /privacy|personal data|cookie|legal disclaimer|terms/.test(normalized);
  const asksAboutCareers = /career|job|vacancy|employment|work at/.test(normalized);

  return matches.filter((match) => {
    if (match.source.endsWith("/privacy-policy") && !asksAboutPrivacy) return false;
    if (match.source.endsWith("/careers") && !asksAboutCareers) return false;
    return true;
  });
}

/** Fast-path answers for plant, presence, and count questions */
function answerPlantQuestion(message: string) {
  const n = message.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
  const presenceSrc = [{ title: "Patil Group - Our Presence & Manufacturing Plants", source: "https://patilgroup.com/our-presence" }];

  // Sleeper plant count / locations
  if (/\b(how many|count of|number of)\b.*\bsleeper plant(s)?\b/.test(n) || /\bsleeper plant(s)?\b.*\b(how many|count|number|list|locations|where)\b/.test(n) || n.includes("sleeper plant")) {
    return {
      answer: `Patil Group operates **14 concrete sleeper manufacturing plants** strategically located across India:

1. **Pathri** (Uttarakhand)
2. **Sholaka** (Haryana)
3. **Burhwal** (Uttar Pradesh)
4. **Kargi Road** (Chhattisgarh)
5. **Anara** (West Bengal)
6. **Kaipadar** (Odisha)
7. **Gaya** (Bihar)
8. **Mirza** (Assam)
9. **Udvada** (Gujarat)
10. **Wadiyaram** (Telangana)
11. **Kovvur** (Andhra Pradesh)
12. **Hubli** (Karnataka)
13. **Tumkur** (Karnataka)
14. **Tirumangalam** (Tamil Nadu)

Together, these plants make Patil Group one of the world's largest concrete sleeper manufacturers, supplying Indian Railways across all 17+ zones as well as major urban metro rail systems across the country.`,
      sources: presenceSrc,
    };
  }

  // Total plants / all manufacturing units
  if (/\b(how many|total|list|all)\b.*\b(plants|factories|units|manufacturing facilities)\b/.test(n)) {
    return {
      answer: `Patil Group operates over **22 state-of-the-art manufacturing facilities** across India, including:

- **14 Concrete Sleeper Plants**: Pathri, Sholaka, Burhwal, Kargi Road, Anara, Kaipadar, Gaya, Mirza, Udvada, Wadiyaram, Kovvur, Hubli, Tumkur, and Tirumangalam.
- **3 HTS Wire Facilities**: Bobbili (AP), Roopangarh (Rajasthan), and Chandrapur (Maharashtra) / Bokaro (Jharkhand).
- **2 Ductile Iron Foundries & SGCI Insert Plants**: Bokaro (23,000 MT/year capacity & 1.3M SGCI inserts/month) and Kallakal/Hyderabad (13,000 MT/year capacity).
- **1 Rail Fastening Systems Plant**: Medchal (Telangana) with in-house heat treatment and tool design.
- **1 Precast Concrete Plant**: Bharatpur (Rajasthan).
- **2 Flash Butt Welding Depots**: Bongaigaon (Assam) and Rangapani (West Bengal).
- **2 R&D & Technology Centers**: Patil iLabs (Bengaluru) and Apna Technologies & Solutions (Hosur).`,
      sources: presenceSrc,
    };
  }

  return null;
}

/** Fast-path answers for frequently-asked management questions */
function answerManagementQuestion(message: string) {
  const n = message.toLowerCase().replace(/[^a-z\s-]/g, " ").replace(/\s+/g, " ").trim();
  const mgmtChunk = chunks.find((c) => c.source.endsWith("/management"));
  if (!mgmtChunk) return null;

  const src = [{ title: mgmtChunk.title, source: mgmtChunk.source }];

  if (/\b(cfo|chief financial officer)\b/.test(n))
    return { answer: "Patil Group's CFO is Mr. Amit Pathak.", sources: src };

  if (/\b(md|managing director)\b/.test(n) && /\btrack systems?\b/.test(n))
    return { answer: "Patil Group's MD - Track Systems is Mr. Kaushik Ghosh.", sources: src };

  if (/\b(ceo|chief executive)\b/.test(n) && /\bfastening\b/.test(n))
    return { answer: "The CEO of Patil Group's Fastening Systems division is Mr. Swapan Maity.", sources: src };

  if (/\b(ceo|chief executive)\b/.test(n) && /\bwire\b/.test(n))
    return { answer: "The CEO of Patil Group's Wire Business is Mr. Sujeeth Ramakrishnan.", sources: src };

  if (/\b(ceo|chief executive)\b/.test(n) && /\btrack systems?\b/.test(n))
    return { answer: "The CEO of Track Systems, Engineering at Patil Group is Mr. DVR Phani Kumar.", sources: src };

  if (/\b(chairman|executive chairman)\b/.test(n))
    return { answer: "Patil Group's Executive Chairman is Dr. L. S. Patil.", sources: src };

  if (/\b(group director|group ceo|director.*ceo|ceo.*director)\b/.test(n) || (/\bceo\b/.test(n) && !/fastening|wire|track/.test(n)))
    return { answer: "Patil Group's Group Director & CEO is Mr. Vikash Kumar Gupta.", sources: src };

  if (/\b(chro|chief human|hr)\b/.test(n))
    return { answer: "Patil Group's Group CHRO is Mr. Janardhanan Narayanaswamy.", sources: src };

  if (/\b(coo|chief operating)\b/.test(n))
    return { answer: "Patil Group's COO - Track Systems is Mr. Satish Chandra Alya.", sources: src };

  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { message, history = [] } = body as {
      message?: string;
      history?: Array<{ role: string; content: string }>;
    };

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Missing 'message' in request body." }, { status: 400 });
    }
    if (message.length > 2000) {
      return NextResponse.json({ error: "Message too long." }, { status: 400 });
    }

    // Fast-path: plant & presence questions
    const plantAnswer = answerPlantQuestion(message);
    if (plantAnswer) return NextResponse.json(plantAnswer);

    // Fast-path: management questions
    const mgmtAnswer = answerManagementQuestion(message);
    if (mgmtAnswer) return NextResponse.json(mgmtAnswer);

    // Retrieve top-5 relevant chunks
    const rawMatches = retriever.search(message, 5);
    const matches = filterMatchesForQuestion(rawMatches, message);

    if (matches.length === 0) {
      return NextResponse.json({
        answer:
          "I don't have that specific information on the Patil Group website. Please contact us via the Contact page or email info@patilgroup.com.",
        sources: [],
      });
    }

    const contextBlock = buildContextBlock(matches);
    const trimmedHistory = Array.isArray(history) ? history.slice(-6) : [];

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...trimmedHistory
        .filter(
          (m) =>
            m &&
            (m.role === "user" || m.role === "assistant") &&
            typeof m.content === "string"
        )
        .map((m) => ({ role: m.role, content: m.content })),
      {
        role: "user",
        content: `Website content (the only source of truth):\n${contextBlock}\n\nPrevious conversation is context only. Ignore any prior answer that conflicts with the website content.\n\nVisitor question: ${message}`,
      },
    ];

    let answer = "";
    let lastErr = "";

    for (const model of CANDIDATE_MODELS) {
      try {
        const groqRes = await fetch(GROQ_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model,
            max_tokens: 700,
            messages,
          }),
        });

        if (groqRes.ok) {
          const groqData = await groqRes.json();
          answer = (groqData.choices?.[0]?.message?.content || "").trim();
          if (answer) break;
        } else {
          lastErr = await groqRes.text().catch(() => "");
          console.warn(`Groq model ${model} failed:`, groqRes.status, lastErr);
        }
      } catch (e: any) {
        lastErr = e?.message || String(e);
        console.warn(`Groq fetch error for ${model}:`, lastErr);
      }
    }

    if (!answer) {
      console.error("All Groq models failed. Last error:", lastErr);
      return NextResponse.json(
        { error: "The chatbot's AI model is unavailable right now. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      answer,
      sources: matches.map((m) => ({ title: m.title, source: m.source })),
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
