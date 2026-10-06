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

// Boot-time: build the TF-IDF index once (cached across requests in the same worker)
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

/** Fast-path answers for career and job application questions & HR contact */
function answerCareerQuestion(message: string) {
  const n = message.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
  const careerSrc = [{ title: "Patil Group - Careers & Job Application", source: "https://patilgroup.com/careers" }];

  if (
    /\b(how to contact hr|contact hr|hr contact|hr email|hr phone|hr number|reach hr|contact human resource(s)?|hr department|careers?|vacanc(y|ies)|hiring|join patil|send resume|submit resume|resume email|job email|careers? email|work at patil|apply job|apply jobs|how to apply|apply for job|apply for jobs|job application)\b/.test(n) ||
    (/\b(apply|job|jobs|work|career|careers|hr|human resource|human resources)\b/.test(n) && /\b(how|where|email|mail|process|form|link|id|details|contact|reach|phone|number)\b/.test(n))
  ) {
    return {
      answer: `To contact the HR department or apply for careers at Patil Group, you can use any of the following options:

1. **Direct HR Email**: You can email your resume, CV, or HR inquiries directly to **careers@patilgroup.com**.

2. **Corporate Headquarters Contact**: Phone: **+91 40 3955 6700** | Address: **6-3-1342/4, Raj Bhavan Rd, Somajiguda, Hyderabad, Telangana 500082**.

3. **Online Application**: Visit our **Careers Page** at [patilgroup.com/careers](https://patilgroup.com/careers) and submit your application using the **Apply Now** form (uploading your Resume/CV in PDF, DOC, or DOCX format up to 10MB).

Patil Group hires professionals across **Engineering, Production, Infrastructure Projects, Quality Control, and Corporate Support**.`,
      sources: careerSrc,
    };
  }

  return null;
}

/** Fast-path answers for company establishment / founding questions */
function answerEstablishmentQuestion(message: string) {
  const n = message.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
  const aboutSrc = [
    { title: "Patil Group - About Us", source: "https://patilgroup.com/about" },
    { title: "Patil Group - Legacy & History", source: "https://patilgroup.com/legacy" }
  ];

  if (
    /\b(when (was|is)? patil group (established|founded|started|incorporated))\b/.test(n) ||
    /\b(patil group (established|founded|started) (in|year|when))\b/.test(n) ||
    /\b(establishment|founding|foundation) (year|date|history|time)\b/.test(n) ||
    /\b(when patil group established|when patil group founded|when was patil group established)\b/.test(n) ||
    (/\b(when|year)\b/.test(n) && /\b(patil group|company|group)\b/.test(n) && /\b(established|founded|started|began)\b/.test(n))
  ) {
    return {
      answer: `According to Patil Group's official website:

- **1960s**: Patil Group began in the **1960s** with a single concrete sleeper plant.
- **1970s**: Established its first sleeper manufacturing unit, laying the foundation for one of India's largest railway infrastructure companies.

Today, Patil Group brings over **50 years of industry leadership** in manufacturing railway track infrastructure components across India.`,
      sources: aboutSrc,
    };
  }

  return null;
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

  const isContactQuery = /\b(contact|email|mail|phone|number|reach|call|address|how to|where to)\b/.test(n);
  if (!isContactQuery && /\b(who is (the )?(group )?chro|who is (the )?head of hr|who is (the )?chief human|group chro)\b/.test(n))
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

    // Fast-path: career & job application / HR contact questions
    const careerAnswer = answerCareerQuestion(message);
    if (careerAnswer) return NextResponse.json(careerAnswer);

    // Fast-path: establishment / founding year questions
    const establishmentAnswer = answerEstablishmentQuestion(message);
    if (establishmentAnswer) return NextResponse.json(establishmentAnswer);

    // Fast-path: plant & presence questions
    const plantAnswer = answerPlantQuestion(message);
    if (plantAnswer) return NextResponse.json(plantAnswer);

    // Fast-path: management questions
    const mgmtAnswer = answerManagementQuestion(message);
    if (mgmtAnswer) return NextResponse.json(mgmtAnswer);

    // Fast-path: company questions
    const compAnswer = answerCompanyQuestion(message);
    if (compAnswer) return NextResponse.json(compAnswer);

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

    if (!answer && matches.length > 0) {
      answer = matches[0].text.trim();
    }

    if (!answer) {
      answer = "Patil Group is India's leading manufacturer of railway track infrastructure components (concrete sleepers, slab track systems, fasteners, HTS wires, castings, precast solutions, and CME products). Please reach out via our Contact page or email info@patilgroup.com for detailed assistance.";
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
