/**
 * Website Chatbot Widget
 *
 * Embed on any page with:
 *   <link rel="stylesheet" href="https://YOUR-SERVER/widget.css">
 *   <script src="https://YOUR-SERVER/widget.js"
 *           data-api-url="https://YOUR-SERVER/api/chat"
 *           data-title="Ask us anything"
 *           data-subtitle="Answers based on our site"
 *           data-greeting="Hi! Ask me anything about this site."
 *           defer></script>
 */
(function () {
  const scriptTag = document.currentScript;
  const API_URL = scriptTag?.dataset.apiUrl || "/api/chat";
  const TITLE = scriptTag?.dataset.title || "Ask us anything";
  const SUBTITLE = scriptTag?.dataset.subtitle || "Answers based on this site's content";
  const GREETING = scriptTag?.dataset.greeting || "Hi! Ask me anything about this site — I'll answer from its content.";

  const history = [];

  const root = document.createElement("div");
  root.id = "wcb-root";
  root.innerHTML = `
    <button class="wcb-launcher" aria-label="Open chat" aria-expanded="false">
      <span class="wcb-launcher-icon-chat">${icon("chat")}</span>
      <span class="wcb-launcher-icon-close">${icon("close")}</span>
    </button>
    <div class="wcb-panel" role="dialog" aria-label="${escapeHtml(TITLE)}">
      <div class="wcb-header">
        <div class="wcb-header-title">${escapeHtml(TITLE)}</div>
        <div class="wcb-header-sub">${escapeHtml(SUBTITLE)}</div>
      </div>
      <div class="wcb-messages" id="wcb-messages"></div>
      <div class="wcb-inputbar">
        <textarea class="wcb-input" id="wcb-input" rows="1" placeholder="Type your question..."></textarea>
        <button class="wcb-send" id="wcb-send" aria-label="Send">${icon("send")}</button>
      </div>
      <div class="wcb-footer">Powered by your website's content</div>
    </div>
  `;
  document.body.appendChild(root);

  const launcher = root.querySelector(".wcb-launcher");
  const messagesEl = root.querySelector("#wcb-messages");
  const inputEl = root.querySelector("#wcb-input");
  const sendBtn = root.querySelector("#wcb-send");

  launcher.addEventListener("click", () => {
    const isOpen = root.classList.toggle("wcb-open");
    launcher.setAttribute("aria-expanded", String(isOpen));
    if (isOpen && !messagesEl.dataset.greeted) {
      addMessage("bot", GREETING);
      messagesEl.dataset.greeted = "1";
      inputEl.focus();
    }
  });

  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  });
  inputEl.addEventListener("input", () => {
    inputEl.style.height = "auto";
    inputEl.style.height = Math.min(inputEl.scrollHeight, 90) + "px";
  });
  sendBtn.addEventListener("click", send);

  async function send() {
    const text = inputEl.value.trim();
    if (!text) return;

    addMessage("user", text);
    inputEl.value = "";
    inputEl.style.height = "auto";
    sendBtn.disabled = true;
    const typingEl = addTyping();

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });
      const data = await res.json();
      typingEl.remove();

      if (!res.ok) {
        addMessage("bot", data.error || "Something went wrong. Please try again.");
        return;
      }

      addMessage("bot", data.answer, data.sources);
      history.push({ role: "user", content: text });
      history.push({ role: "assistant", content: data.answer });
    } catch (err) {
      typingEl.remove();
      addMessage("bot", "I couldn't reach the server just now. Please try again in a moment.");
    } finally {
      sendBtn.disabled = false;
    }
  }

  function addMessage(role, text, sources) {
    const wrap = document.createElement("div");
    wrap.className = `wcb-msg wcb-${role}`;
    const bubble = document.createElement("div");
    bubble.className = "wcb-bubble";
    bubble.textContent = text;
    wrap.appendChild(bubble);



    messagesEl.appendChild(wrap);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return wrap;
  }

  function addTyping() {
    const wrap = document.createElement("div");
    wrap.className = "wcb-msg wcb-bot wcb-typing";
    wrap.innerHTML = `<div class="wcb-bubble"><span class="wcb-dot"></span><span class="wcb-dot"></span><span class="wcb-dot"></span></div>`;
    messagesEl.appendChild(wrap);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return wrap;
  }

  function icon(name) {
    if (name === "chat") {
      return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    }
    if (name === "close") {
      return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6 6 18M6 6l12 12" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>`;
    }
    if (name === "send") {
      return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    }
    return "";
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }
})();
