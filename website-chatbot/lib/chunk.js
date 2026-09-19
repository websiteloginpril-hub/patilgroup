// Splits long text into overlapping chunks so the retriever can find
// precise, relevant passages instead of whole (too-large) pages.

const MAX_CHUNK_CHARS = 900;   // roughly ~200 tokens
const OVERLAP_CHARS = 150;     // keeps context continuous across chunk boundaries

/**
 * Splits `text` into paragraph-aware chunks of ~MAX_CHUNK_CHARS,
 * each tagged with the source it came from.
 */
export function chunkText(text, source, title = "") {
  const clean = text
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  if (!clean) return [];

  // Split on paragraph breaks first so we don't cut mid-sentence when avoidable.
  const paragraphs = clean.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  const chunks = [];
  let current = "";

  const pushCurrent = () => {
    if (current.trim()) {
      chunks.push(current.trim());
    }
    current = "";
  };

  for (const para of paragraphs) {
    if ((current + "\n\n" + para).length > MAX_CHUNK_CHARS && current) {
      pushCurrent();
      // carry a small overlap forward for continuity
      const tail = current.slice(-OVERLAP_CHARS);
      current = tail;
    }

    if (para.length > MAX_CHUNK_CHARS) {
      // paragraph itself is huge (e.g. dense page) — hard-split it
      pushCurrent();
      for (let i = 0; i < para.length; i += MAX_CHUNK_CHARS - OVERLAP_CHARS) {
        chunks.push(para.slice(i, i + MAX_CHUNK_CHARS).trim());
      }
      continue;
    }

    current = current ? `${current}\n\n${para}` : para;
  }
  pushCurrent();

  return chunks.map((text, i) => ({
    id: `${source}#${i}`,
    source,
    title,
    text,
  }));
}
