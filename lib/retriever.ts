/**
 * retriever.ts
 * TF-IDF + cosine-similarity retriever — ported from website-chatbot/lib/retriever.js
 * Dependency-free. Works in Next.js API routes (server-side only).
 */

export interface Chunk {
  id: string;
  source: string;
  title: string;
  text: string;
}

export interface SearchResult extends Chunk {
  score: number;
}

const STOPWORDS = new Set(
  "a an the is are was were be been being to of in on for with and or but if then so as at by from this that these those it its it's your you we our i he she they them his her their not no do does did can could should would will shall may might have has had"
    .split(" ")
);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

interface DocVector {
  vec: Map<string, number>;
  norm: number;
}

export class Retriever {
  private chunks: Chunk[];
  private vectors: DocVector[] = [];
  private idf: Map<string, number> = new Map();

  constructor(chunks: Chunk[]) {
    this.chunks = chunks;
    this._buildIndex();
  }

  private _buildIndex() {
    const df = new Map<string, number>();
    const docs = this.chunks.map((chunk) => {
      const tokens = tokenize(chunk.text + " " + (chunk.title || ""));
      const tf = new Map<string, number>();
      for (const t of tokens) tf.set(t, (tf.get(t) || 0) + 1);
      tf.forEach((_, t) => df.set(t, (df.get(t) || 0) + 1));
      return { tf, length: tokens.length };
    });

    const N = this.chunks.length || 1;
    this.idf.clear();
    df.forEach((count, term) => {
      this.idf.set(term, Math.log(1 + N / count));
    });

    this.vectors = docs.map((doc) => {
      const vec = new Map<string, number>();
      doc.tf.forEach((count, term) => {
        const idf = this.idf.get(term) || 0;
        vec.set(term, (count / (doc.length || 1)) * idf);
      });
      let norm = 0;
      vec.forEach((v) => { norm += v * v; });
      return { vec, norm: Math.sqrt(norm) || 1 };
    });
  }

  search(query: string, k = 5): SearchResult[] {
    const qTokens = tokenize(query);
    const qtf = new Map<string, number>();
    for (const t of qTokens) qtf.set(t, (qtf.get(t) || 0) + 1);

    const qVec = new Map<string, number>();
    qtf.forEach((count, term) => {
      const idf =
        this.idf.get(term) || Math.log(1 + this.chunks.length);
      qVec.set(term, (count / (qTokens.length || 1)) * idf);
    });
    let qNorm = 0;
    qVec.forEach((v) => { qNorm += v * v; });
    qNorm = Math.sqrt(qNorm) || 1;

    const queryTerms = Array.from(new Set(qTokens));
    const scores = this.vectors.map(({ vec, norm }, i) => {
      let dot = 0;
      qVec.forEach((qv, term) => {
        const dv = vec.get(term);
        if (dv) dot += dv * qv;
      });
      const matchedTerms = queryTerms.filter((t) => vec.has(t)).length;
      const coverage = matchedTerms / (queryTerms.length || 1);
      return { i, score: (dot / (norm * qNorm)) * (0.5 + coverage / 2) };
    });

    scores.sort((a, b) => b.score - a.score);

    const seenSources = new Set<string>();
    const results: SearchResult[] = [];
    for (const { i, score } of scores) {
      const source = this.chunks[i].source;
      if (score <= 0 || seenSources.has(source)) continue;
      seenSources.add(source);
      results.push({ ...this.chunks[i], score });
      if (results.length === k) break;
    }
    return results;
  }
}
