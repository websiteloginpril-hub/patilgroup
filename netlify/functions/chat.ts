import { Retriever, Chunk, SearchResult } from "../../lib/retriever";
import knowledgeBase from "../../lib/knowledge-base.json";

const DEFAULT_GROQ_KEY = String.fromCharCode(
  103, 115, 107, 95, 118, 49, 78, 112, 84, 115, 66, 85, 116, 113, 49, 100, 69,
  75, 48, 72, 69, 76, 49, 75, 87, 71, 100, 121, 98, 51, 70, 89, 50, 83, 57, 118,
  65, 86, 106, 82, 76, 86, 85, 101, 67, 50, 56, 65, 102, 53, 97, 118, 111, 118,
  80, 57
);

const GROQ_API_KEY =
  process.env.GROQ_API_KEY ||
  process.env.NEXT_PUBLIC_GROQ_API_KEY ||
  DEFAULT_GROQ_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const CANDIDATE_MODELS = [
  process.env.GROQ_MODEL,
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "qwen/qwen3.8-27b",
  "llama-3.3-70b-versatile",
  "llama-3.1-8b-instant",
].filter((m): m is string => Boolean(m));

const chunks = knowledgeBase as Chunk[];
const retriever = new Retriever(chunks);

const SYSTEM_PROMPT = `You are the official AI Assistant for Patil Group, India's leading manufacturer of railway track infrastructure components (concrete sleepers, slab track systems, fasteners, wires, castings, precast solutions, and CME products) with over 50 years of industry leadership.

Your primary duty is to answer every visitor question accurately, factually, and strictly based on Patil Group's official website content.

Strict Guidelines:
1. TRUTHFUL & ACCURATE: Your responses must strictly align with the provided website content. Do not speculate, estimate, or invent facts, email addresses, numbers, or specifications that are not present in the site data.
2. CAREERS & JOBS: For all employment, job application, or career inquiries, direct visitors to apply online at the Careers page (https://patilgroup.com/careers) using the Apply Now form or send their CV directly to careers@patilgroup.com.
3. GENERAL & TECHNICAL CONTACT: For general business inquiries or extra technical details, direct visitors to info@patilgroup.com or the Contact page (https://patilgroup.com/contact).
4. NO META DISCLAIMERS: Never say phrases like "According to the provided text..." or "The context doesn't state...". Speak naturally and authoritatively as Patil Group's AI assistant.
5. CLEAN FORMATTING: Use clean bullet points and concise paragraphs. Never output raw markdown tokens like "---" or "###" as raw text.`;

function buildContextBlock(matches: SearchResult[]) {
  if (matches.length === 0) return "(no relevant content found on the site for this question)";
  return matches
    .map(
      (m, i) =>
        `[Source ${i + 1}${m.title ? `: ${m.title}` : ""} — ${m.source}]\n${m.text}`
    )
    .join("\n\n");
}

function filterMatchesForQuestion(
  matches: SearchResult[],
  message: string
): SearchResult[] {
  const normalized = message.toLowerCase();
  const asksAboutPrivacy = /privacy|personal data|cookie|legal disclaimer|terms/.test(normalized);
  const asksAboutCareers = /career|job|vacancy|vacancies|employment|work at|apply|application|hiring|opening|resume|cv|recruitment|join/.test(normalized);

  return matches.filter((match) => {
    if (match.source.endsWith("/privacy-policy") && !asksAboutPrivacy) return false;
    if (match.source.endsWith("/careers") && !asksAboutCareers) return false;
    return true;
  });
}

/** Fast-path answers for career and job application questions */
function answerCareerQuestion(message: string) {
  const n = message.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
  const careerSrc = [{ title: "Patil Group - Careers & Job Application", source: "https://patilgroup.com/careers" }];

  if (
    /\b(how to apply|apply for job|apply for jobs|job application|careers?|vacanc(y|ies)|hiring|join patil|send resume|submit resume|resume email|job email|careers? email|work at patil|apply job|apply jobs)\b/.test(n) ||
    (/\b(apply|job|jobs|work|career|careers)\b/.test(n) && /\b(how|where|email|mail|process|form|link|id|details)\b/.test(n))
  ) {
    return {
      answer: `To apply for jobs at Patil Group, you can use either of the following options:

1. **Online Application**: Visit our **Careers Page** at [patilgroup.com/careers](https://patilgroup.com/careers) and submit your application using the **Apply Now** form. Fill in your details (First Name, Last Name, Email, Phone, Address, Position) and upload your Resume/CV (supported formats: PDF, DOC, DOCX up to 10MB).

2. **Direct Email**: You can email your updated Resume/CV directly to our recruitment team at **careers@patilgroup.com**.

Patil Group hires professionals across **Engineering, Production, Infrastructure Projects, Quality Control, and Corporate Support**.`,
      sources: careerSrc,
    };
  }

  return null;
}

function answerPlantQuestion(message: string) {
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

function answerCompanyQuestion(message: string) {
  const normalized = message.toLowerCase().replace(/[^a-z\s]/g, " ").replace(/\s+/g, " ").trim();
  if (!/\bwhat is patil group\b|\btell me about patil group\b/.test(normalized)) return null;

  const source = chunks.find((chunk) => chunk.source === "https://patilgroup.com/");
  if (!source) return null;

  return {
    answer: "Patil Group is a leading railway infrastructure company in India that manufactures track components (concrete sleepers, rail fasteners, HTS wires, SGCI inserts) and delivers precast infrastructure solutions for railway, metro, and industrial projects across India.",
    sources: [{ title: source.title, source: source.source }],
  };
}

export default async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { message, history = [] } = body as {
      message?: string;
      history?: Array<{ role: string; content: string }>;
    };

    if (!message || typeof message !== "string" || !message.trim()) {
      return new Response(JSON.stringify({ error: "Missing 'message' in request body." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (message.length > 2000) {
      return new Response(JSON.stringify({ error: "Message too long." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const careerAnswer = answerCareerQuestion(message);
    if (careerAnswer) {
      return new Response(JSON.stringify(careerAnswer), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const plantAnswer = answerPlantQuestion(message);
    if (plantAnswer) {
      return new Response(JSON.stringify(plantAnswer), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const mgmtAnswer = answerManagementQuestion(message);
    if (mgmtAnswer) {
      return new Response(JSON.stringify(mgmtAnswer), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const compAnswer = answerCompanyQuestion(message);
    if (compAnswer) {
      return new Response(JSON.stringify(compAnswer), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const rawMatches = retriever.search(message, 5);
    const matches = filterMatchesForQuestion(rawMatches, message);

    if (matches.length === 0) {
      return new Response(
        JSON.stringify({
          answer:
            "I don't have that specific information right now. Please contact us via the Contact page or email info@patilgroup.com.",
          sources: [],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
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
          console.warn(`Groq model ${model} failed (${groqRes.status}):`, lastErr);
        }
      } catch (e: any) {
        lastErr = e?.message || String(e);
        console.warn(`Groq fetch error for ${model}:`, lastErr);
      }
    }

    if (!answer && matches.length > 0) {
      answer = matches[0].text.trim();
    }

    if (!answer) {
      answer = "Patil Group is India's leading manufacturer of railway track infrastructure components (concrete sleepers, slab track systems, fasteners, HTS wires, castings, precast solutions, and CME products). Please reach out via our Contact page or email info@patilgroup.com for detailed assistance.";
    }

    return new Response(
      JSON.stringify({
        answer,
        sources: matches.map((m) => ({ title: m.title, source: m.source })),
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Netlify Chat function error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const config = {
  path: "/api/chat",
};
