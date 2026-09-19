# Website Chatbot (RAG, answers only from your content)

A self-hosted chatbot for your website. It answers questions using **only your own
website's content** — nothing invented, nothing from the open internet. It works by:

1. **Ingesting** your pages (locally or by fetching live URLs) and splitting them into
   searchable chunks.
2. **Retrieving** the most relevant chunks for each visitor question (no external
   embeddings API needed — it's a self-contained TF-IDF search).
3. **Answering** with a Groq-hosted model, instructed to use *only* the retrieved
   chunks and to say "I don't have that information" rather than guess.

## 1. Install

```bash
npm install
cp .env.example .env
```

Open `.env` and set `GROQ_API_KEY` (get one at https://console.groq.com/keys).
`GROQ_MODEL` defaults to `llama-3.3-70b-versatile` — see
https://console.groq.com/docs/models for the current list of available models if you
want to swap it (e.g. for a faster or larger one).

## 2. Add your website's content

Pick either or both:

**Option A — local files (recommended if you can export your pages):**
Put `.html`, `.md`, or `.txt` files into the `/data` folder. Delete the sample
`sample-faq.md` once you've added your own. Markdown files can have YAML frontmatter
with a `title:`.

**Option B — fetch live pages:**
List your page URLs in `urls.txt` (one per line). The ingest script will fetch each
page and pull out the visible text automatically.

## 3. Build the knowledge base

```bash
npm run ingest
```

This reads everything from `/data` and `urls.txt`, chunks it, and writes
`knowledge-base.json`. **Re-run this any time your website content changes** — the
chatbot only knows what's in this file.

## 4. Run the server

```bash
npm start
```

Visit `http://localhost:3000/demo.html` to try the widget immediately.

## 5. Add the widget to your real website

Add these two tags to any page (adjust the URL to wherever you deploy this server):

```html
<link rel="stylesheet" href="https://YOUR-SERVER/widget.css">
<script src="https://YOUR-SERVER/widget.js"
        data-api-url="https://YOUR-SERVER/api/chat"
        data-title="Ask us anything"
        data-subtitle="Answers based on this site"
        data-greeting="Hi! Ask me anything about this site."
        defer></script>
```

That's it — a chat launcher appears in the bottom-right corner of the page.

## 6. Lock it down for production

- Set `ALLOWED_ORIGINS` in `.env` to your actual site's domain(s), e.g.
  `https://www.yoursite.com` — this stops other sites from calling your API.
- Deploy the server somewhere reachable (Render, Railway, Fly.io, a VPS, etc.) and
  update `data-api-url` in the widget script tag to that address.
- Keep your `.env` file (and your API key) out of version control.
- The rate limiter in `server.js` (20 requests/min per IP by default) is a starting
  point — adjust to your expected traffic.

## How accuracy is enforced

- The system prompt explicitly forbids the model from using outside knowledge — it can
  only answer from the "Website content" block built from your `knowledge-base.json`.
- If retrieval finds nothing relevant to a question, the model is told to say it
  doesn't have that information rather than guess.
- Each answer includes its sources (which page/file it came from), shown under the
  reply in the widget — useful for both trust and debugging.

## Improving answer quality

- **Keep chunks focused**: shorter, well-organized source pages (clear headings,
  one topic per page) retrieve better than one giant page with everything on it.
- **Re-ingest after every content update** — stale `knowledge-base.json` means stale
  or missing answers.
- **Increase retrieved chunks**: in `server.js`, `retriever.search(message, 5)` — raise
  `5` if your pages are short, lower it if answers start including irrelevant context.
- **Swap in real embeddings** if you have a large site (1,000+ pages) and the built-in
  TF-IDF search starts missing relevant chunks — `lib/retriever.js` is a drop-in point
  to swap in a vector database instead.

## Project structure

```
website-chatbot/
├── data/                # your local content files (.html, .md, .txt) go here
├── urls.txt             # optional: live page URLs to fetch instead
├── ingest.js            # builds knowledge-base.json from data/ and urls.txt
├── knowledge-base.json  # generated — the chatbot's actual knowledge
├── lib/
│   ├── chunk.js          # splits pages into overlapping searchable chunks
│   └── retriever.js       # TF-IDF search over the chunks
├── server.js             # Express API (/api/chat) that does retrieval + calls Claude
├── public/
│   ├── widget.css         # embeddable widget styling
│   ├── widget.js           # embeddable widget behavior
│   └── demo.html            # local page to try it on
├── package.json
└── .env.example
```
