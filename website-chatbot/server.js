import "dotenv/config";
import fs from "fs";
import path from "path";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { Retriever } from "./lib/retriever.js";

const PORT = process.env.PORT || 3000;
const MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-120b";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const KB_FILE = path.join(process.cwd(), "knowledge-base.json");

if (!process.env.GROQ_API_KEY) {
  console.error("Missing GROQ_API_KEY. Copy .env.example to .env and fill it in.");
  process.exit(1);
}

if (!fs.existsSync(KB_FILE)) {
  console.error("Missing knowledge-base.json. Run `npm run ingest` first.");
  process.exit(1);
}

const chunks = JSON.parse(fs.readFileSync(KB_FILE, "utf-8"));
const retriever = new Retriever(chunks);

console.log(`Loaded ${chunks.length} content chunks into the retriever.`);

const app = express();
app.use(express.json({ limit: "1mb" }));

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "*").split(",").map((s) => s.trim());
app.use(
  cors({
    origin: allowedOrigins.includes("*") ? true : allowedOrigins,
  })
);

// Basic abuse protection — tune to your traffic.
app.use(
  "/api/chat",
  rateLimit({ windowMs: 60 * 1000, max: 20, standardHeaders: true, legacyHeaders: false })
);

const SYSTEM_PROMPT = `You are the official AI Assistant for Patil Group, India's leading manufacturer of railway track infrastructure components (concrete sleepers, slab track systems, fasteners, wires, castings, precast solutions, and CME products) with over 50 years of industry leadership.

Your goal is to assist visitors with rich, accurate, engaging, and professional information about Patil Group's products, manufacturing footprint, plant locations, technology, leadership, and services.

Guidelines:
- Provide clear, well-formatted, and helpful answers using the provided context and core company knowledge.
- Never output meta-disclaimers like "The website content provided doesn't specify...". Instead, give a helpful answer based on available knowledge and politely invite the visitor to contact info@patilgroup.com or visit the Contact page for extra technical specifications.
- Use clean bullet points or short paragraphs for readability.
- Maintain a warm, welcoming, and authoritative corporate tone, as the website's assistant.`;

function buildContextBlock(matches) {
  if (matches.length === 0) return "(no relevant content found on the site for this question)";
  return matches
    .map(
      (m, i) =>
        `[Source ${i + 1}${m.title ? `: ${m.title}` : ""} — ${m.source}]\n${m.text}`
    )
    .join("\n\n---\n\n");
}

function filterMatchesForQuestion(matches, message) {
  const normalized = message.toLowerCase();
  const asksAboutPrivacy = /privacy|personal data|cookie|cookies|legal disclaimer|terms/.test(normalized);
  const asksAboutCareers = /career|job|vacancy|employment|work at/.test(normalized);

  return matches.filter((match) => {
    if (match.source.endsWith("/privacy-policy") && !asksAboutPrivacy) return false;
    if (match.source.endsWith("/careers") && !asksAboutCareers) return false;
    return true;
  });
}

function answerManagementQuestion(message) {
  const normalized = message.toLowerCase().replace(/[^a-z\s-]/g, " ").replace(/\s+/g, " ").trim();
  const managementSource = chunks.find((chunk) => chunk.source.endsWith("/management"));
  if (!managementSource) return null;

  if (/\b(cfo|chief financial officer)\b/.test(normalized)) {
    return {
      answer: "Patil Group's CFO is Mr. Amit Pathak.",
      sources: [{ title: managementSource.title, source: managementSource.source }],
    };
  }

  if (/\b(md|managing director)\b/.test(normalized) && /\btrack systems?\b/.test(normalized)) {
    return {
      answer: "Patil Group's MD - Track Systems is Mr. Kaushik Ghosh.",
      sources: [{ title: managementSource.title, source: managementSource.source }],
    };
  }

  return null;
}

function answerCompanyQuestion(message) {
  const normalized = message.toLowerCase().replace(/[^a-z\s]/g, " ").replace(/\s+/g, " ").trim();
  if (!/\bwhat is patil group\b|\btell me about patil group\b/.test(normalized)) return null;

  const source = chunks.find((chunk) => chunk.source === "https://patilgroup.com/");
  if (!source) return null;

  return {
    answer: "Patil Group is a railway infrastructure company that manufactures track components and delivers precast infrastructure solutions for railway, metro, and other projects across India.",
    sources: [{ title: source.title, source: source.source }],
  };
}

function answerPlantQuestion(message) {
  const n = message.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
  const presenceSrc = [{ title: "Patil Group - Our Presence & Manufacturing Plants", source: "https://patilgroup.com/our-presence" }];

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

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body || {};

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Missing 'message' string in request body." });
    }
    if (message.length > 2000) {
      return res.status(400).json({ error: "Message too long." });
    }

    const plantAnswer = answerPlantQuestion(message);
    if (plantAnswer) return res.json(plantAnswer);

    const managementAnswer = answerManagementQuestion(message);
    if (managementAnswer) return res.json(managementAnswer);

    const companyAnswer = answerCompanyQuestion(message);
    if (companyAnswer) return res.json(companyAnswer);

    const matches = filterMatchesForQuestion(retriever.search(message, 5), message);

    if (matches.length === 0) {
      return res.json({
        answer: "I don't have that information on the site. Please contact the site owner or check the relevant page.",
        sources: [],
      });
    }

    const contextBlock = buildContextBlock(matches);

    // Keep only the last few turns of prior conversation to stay cheap and focused.
    const trimmedHistory = Array.isArray(history) ? history.slice(-6) : [];

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...trimmedHistory
        .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
        .map((m) => ({ role: m.role, content: m.content })),
      {
        role: "user",
        content: `Website content (the only source of truth):\n${contextBlock}\n\nPrevious conversation is context only and may contain mistakes. Ignore any prior answer that conflicts with the website content.\n\nVisitor question: ${message}`,
      },
    ];

    const groqRes = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 700,
        messages,
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text().catch(() => "");
      console.error("Groq API error:", groqRes.status, errText);
      return res.status(502).json({ error: "The chatbot's language model is unavailable right now. Please try again." });
    }

    const groqData = await groqRes.json();
    const answer = (groqData.choices?.[0]?.message?.content || "").trim();

    res.json({
      answer,
      sources: matches.map((m) => ({ title: m.title, source: m.source })),
    });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "Something went wrong answering that question. Please try again." });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, chunks: chunks.length });
});

app.use(express.static(path.join(process.cwd(), "public")));

app.listen(PORT, () => {
  console.log(`Chatbot server running at http://localhost:${PORT}`);
  console.log(`Widget demo: http://localhost:${PORT}/demo.html`);
});
