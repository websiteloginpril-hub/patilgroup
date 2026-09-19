"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

/**
 * PatilGroupChatWidget
 * ---------------------
 * Floating chat widget backed by the /api/chat route.
 * - Calls Next.js /api/chat which uses TF-IDF retrieval over 107 real website chunks
 * - Returns { answer, sources } — no direct browser-to-Groq calls
 * - Keeps full streaming-like UX with typing indicator while waiting
 */

const BOT_NAME = "Patil Group Assistant";
const FONT_IMPORT_ID = "patil-chat-fonts";
const API_URL = "/api/chat";

// ---- types ----
interface Source {
  title: string;
  source: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
}

type Status = "connected" | "thinking" | "error";

// ---- font loader ----
function useFonts() {
  useEffect(() => {
    if (document.getElementById(FONT_IMPORT_ID)) return;
    const style = document.createElement("style");
    style.id = FONT_IMPORT_ID;
    style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');`;
    document.head.appendChild(style);
  }, []);
}

// ---- inline icons ----
const Icon = {
  Dots: (p: React.SVGProps<SVGSVGElement>) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}>
      <circle cx="5" cy="12" r="1.8" fill="currentColor" />
      <circle cx="12" cy="12" r="1.8" fill="currentColor" />
      <circle cx="19" cy="12" r="1.8" fill="currentColor" />
    </svg>
  ),
  Close: (p: React.SVGProps<SVGSVGElement>) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Chevron: (p: React.SVGProps<SVGSVGElement>) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Send: (p: React.SVGProps<SVGSVGElement>) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M12 19V5M6 11l6-6 6 6" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Bubble: (p: React.SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M4 12a8 8 0 1 1 3.2 6.4L4 20l1.1-3.4A7.96 7.96 0 0 1 4 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

function LogoBadge({ size = 32 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#FFFFFF",
        border: "2px solid #F0A527",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/pg.png"
        alt="Patil Group"
        style={{ width: "82%", height: "82%", objectFit: "contain" }}
      />
    </div>
  );
}

function formatContent(text: string) {
  const blocks = text.split(/```/g);
  return blocks.map((block, idx) => {
    if (idx % 2 === 1) {
      return (
        <pre
          key={idx}
          style={{
            background: "#2A1815",
            borderRadius: 8,
            padding: "10px 12px",
            margin: "8px 0",
            overflowX: "auto",
            fontFamily: "monospace",
            fontSize: 12.5,
            color: "#F3D9C4",
            lineHeight: 1.6,
          }}
        >
          {block.trim()}
        </pre>
      );
    }

    const lines = block.split("\n");
    return (
      <div key={idx} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {lines.map((line, lineIdx) => {
          let content: React.ReactNode = line;

          const bulletMatch = line.match(/^(\s*)[-*•]\s+(.*)$/);
          const isBullet = !!bulletMatch;
          const textToParse = isBullet ? bulletMatch[2] : line;

          const boldParts = textToParse.split(/\*\*([^*]+)\*\*/g);
          if (boldParts.length > 1) {
            content = boldParts.map((part, partIdx) =>
              partIdx % 2 === 1 ? (
                <strong key={partIdx} style={{ fontWeight: 700, color: "inherit" }}>
                  {part}
                </strong>
              ) : (
                part
              )
            );
          } else {
            content = textToParse;
          }

          if (isBullet) {
            return (
              <div
                key={lineIdx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 6,
                  paddingLeft: 12,
                  marginTop: 2,
                }}
              >
                <span style={{ color: "#F0A527", fontSize: 14, lineHeight: "18px" }}>•</span>
                <span style={{ flex: 1 }}>{content}</span>
              </div>
            );
          }

          if (!line.trim()) {
            return <div key={lineIdx} style={{ height: 6 }} />;
          }

          return <div key={lineIdx}>{content}</div>;
        })}
      </div>
    );
  });
}

export default function PatilGroupChatWidget() {
  useFonts();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m0",
      role: "assistant",
      content:
        "Hi! I am the Patil Group AI Assistant. Ask me anything about our products, projects, track systems, or company.",
    },
  ]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<Status>("connected");
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll when messages update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, status, open]);

  // Track chat widget open in Google Analytics
  useEffect(() => {
    if (open && typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "chatbot_opened", {
        event_category: "Chatbot",
        event_label: "Chat Widget Opened",
      });
    }
  }, [open]);

  const resizeTextarea = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  };

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || status === "thinking") return;

    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "chatbot_message_sent", {
        event_category: "Chatbot",
        event_label: "User Sent Message",
      });
    }

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: text };
    const assistantId = crypto.randomUUID();

    // Build history for context (last 6 turns)
    const historyForApi = messages
      .filter((m) => m.content)
      .slice(-6)
      .map(({ role, content }) => ({ role, content }));

    setMessages((prev) => [
      ...prev,
      userMsg,
      { id: assistantId, role: "assistant", content: "" },
    ]);
    setInput("");
    setStatus("thinking");
    requestAnimationFrame(resizeTextarea);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: historyForApi }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Server error (${res.status})`);
      }

      const { answer, sources } = data as { answer: string; sources?: Source[] };

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: answer, sources: sources || [] }
            : m
        )
      );
      setStatus("connected");

      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "chatbot_response_success", {
          event_category: "Chatbot",
          event_label: "Bot Responded Successfully",
        });
      }
    } catch (err) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: `Sorry, something went wrong: ${(err as Error).message}` }
            : m
        )
      );
      setStatus("error");

      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "chatbot_response_error", {
          event_category: "Chatbot",
          event_label: "Bot Response Failed",
          value: (err as Error).message,
        });
      }
    }
  }, [input, messages, status, pathname]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Hi! I am the Patil Group AI Assistant. Ask me anything about our products, projects, track systems, or company.",
      },
    ]);
    setStatus("connected");
    setMenuOpen(false);
  };

  return (
    <>
      <style>{`
        @keyframes p-dot {
          0%,100% { opacity: .25; transform: translateY(0); }
          50%      { opacity: 1;  transform: translateY(-3px); }
        }
        .pchat-scroll::-webkit-scrollbar { width: 5px; }
        .pchat-scroll::-webkit-scrollbar-thumb { background: #C8B8A8; border-radius: 8px; }
        .pchat-scroll::-webkit-scrollbar-track { background: transparent; }
        .pchat-messages {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 16px 14px 8px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          scroll-behavior: smooth;
          min-height: 0;
        }
        .pchat-input::placeholder { color: #B3A79B; }
        .pchat-input:focus { outline: none; }
        .pchat-btn { cursor: pointer; transition: opacity .15s ease; border: none; background: none; }
        .pchat-btn:hover { opacity: 0.7; }
        .pchat-launcher { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .pchat-launcher:hover { transform: translateY(-3px); box-shadow: 0 16px 36px rgba(217,134,15,0.55) !important; }
        @keyframes pchat-slideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .pchat-panel { animation: pchat-slideUp 0.28s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .pchat-source { font-size: 11px; color: #9A8E85; margin-top: 6px; line-height: 1.4; }
        .pchat-source a { color: #8C2622; text-decoration: none; }
        .pchat-source a:hover { text-decoration: underline; }
      `}</style>

      <div
        style={{
          position: "fixed",
          bottom: 28,
          right: 28,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 14,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* ── Chat Panel ── */}
        {open && (
          <div
            className="pchat-panel"
            data-lenis-prevent
            style={{
              background: "#FBF6EF",
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 24px 60px rgba(110,27,24,0.22), 0 4px 16px rgba(0,0,0,0.10)",
              display: "flex",
              flexDirection: "column",
              width: 370,
              height: 500,
              maxHeight: "calc(100vh - 140px)",
              minHeight: 0,
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "13px 16px",
                background: "linear-gradient(120deg, #8C2622, #6E1B18)",
                flexShrink: 0,
                position: "relative",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <LogoBadge size={34} />
                <div>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 600,
                      fontSize: 14,
                      color: "#FFF6EA",
                      display: "block",
                      lineHeight: 1.2,
                    }}
                  >
                    {BOT_NAME}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: "rgba(255,246,234,0.65)",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      marginTop: 2,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: status === "error" ? "#F97316" : "#4ADE80",
                        display: "inline-block",
                        flexShrink: 0,
                      }}
                    />
                    {status === "thinking" ? "Typing…" : status === "error" ? "Error" : "Online"}
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10, position: "relative" }}>
                <button
                  className="pchat-btn"
                  onClick={() => setMenuOpen((v) => !v)}
                  style={{ color: "#FFF6EA", padding: 2, display: "flex" }}
                  title="More options"
                >
                  <Icon.Dots />
                </button>
                <button
                  className="pchat-btn"
                  onClick={() => { setOpen(false); setMenuOpen(false); }}
                  style={{ color: "#FFF6EA", padding: 2, display: "flex" }}
                  title="Close"
                >
                  <Icon.Close />
                </button>

                {menuOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: 32,
                      right: 0,
                      background: "#FFFFFF",
                      border: "1px solid #EFE3D6",
                      borderRadius: 10,
                      boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
                      zIndex: 10,
                      minWidth: 130,
                      overflow: "hidden",
                    }}
                  >
                    <button
                      onClick={clearChat}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "10px 14px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: 13,
                        color: "#2B231F",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      Clear chat
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Message list */}
            <div
              ref={scrollRef}
              className="pchat-messages pchat-scroll"
              data-lenis-prevent
            >
              {messages.map((m, idx) => {
                const isUser = m.role === "user";
                const isLastBot = !isUser && idx === messages.length - 1;
                const isTyping = isLastBot && status === "thinking" && m.content === "";

                return (
                  <div
                    key={m.id}
                    style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start" }}
                  >
                    <div style={{ maxWidth: "82%" }}>
                      <div
                        style={{
                          background: isUser ? "linear-gradient(135deg, #F0A527, #D9860F)" : "#EDEAE6",
                          color: isUser ? "#3A1C08" : "#2B231F",
                          padding: "10px 14px",
                          borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                          fontSize: 13.5,
                          lineHeight: 1.6,
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                          fontWeight: isUser ? 500 : 400,
                        }}
                      >
                        {isTyping ? (
                          <div style={{ display: "flex", gap: 4, padding: "2px 0" }}>
                            {[0, 1, 2].map((i) => (
                              <span
                                key={i}
                                style={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: "50%",
                                  background: "#8A8078",
                                  display: "inline-block",
                                  animation: `p-dot 1s ease-in-out ${i * 0.18}s infinite`,
                                }}
                              />
                            ))}
                          </div>
                        ) : (
                          formatContent(m.content)
                        )}
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input bar */}
            <div style={{ padding: "8px 12px 14px", flexShrink: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "#FFFFFF",
                  border: "1.5px solid #EFE3D6",
                  borderRadius: 999,
                  padding: "4px 6px 4px 16px",
                }}
              >
                <textarea
                  ref={textareaRef}
                  className="pchat-input"
                  value={input}
                  onChange={(e) => { setInput(e.target.value); resizeTextarea(); }}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  placeholder="Ask about Patil Group…"
                  style={{
                    flex: 1,
                    resize: "none",
                    border: "none",
                    background: "transparent",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13.5,
                    color: "#2B231F",
                    padding: "7px 0",
                    maxHeight: 100,
                  }}
                />
                <button
                  onClick={send}
                  disabled={!input.trim() || status === "thinking"}
                  aria-label="Send"
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    border: "none",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      input.trim() && status !== "thinking"
                        ? "linear-gradient(135deg, #F0A527, #D9860F)"
                        : "#F1E6D9",
                    color: input.trim() && status !== "thinking" ? "#3A1C08" : "#C9BBAC",
                    cursor: input.trim() && status !== "thinking" ? "pointer" : "not-allowed",
                    transition: "background 0.2s",
                  }}
                >
                  <Icon.Send />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Launcher Button ── */}
        <button
          onClick={() => { setOpen((v) => !v); setMenuOpen(false); }}
          className="pchat-launcher"
          title={open ? "Close chat" : "Chat with Patil Group AI"}
          aria-label={open ? "Close chat" : "Chat with Patil Group AI"}
          style={{
            width: 54,
            height: 54,
            borderRadius: "50%",
            border: "none",
            background: "linear-gradient(135deg, #F0A527, #D9860F)",
            color: "#3A1C08",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 26px rgba(217,134,15,0.45)",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          {open ? <Icon.Chevron /> : <Icon.Bubble />}
        </button>
      </div>
    </>
  );
}
