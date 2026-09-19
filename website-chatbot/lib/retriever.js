// A dependency-free TF-IDF + cosine-similarity retriever.
// This avoids needing a separate embeddings API/key just to search your own content.
// It's plenty accurate for a single-website knowledge base (tens to low thousands of chunks).

const STOPWORDS = new Set(
  "a an the is are was were be been being to of in on for with and or but if then so as at by from this that these those it its it's your you we our i he she they them his her their not no do does did can could should would will shall may might have has had".split(
    " "
  )
);

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

export class Retriever {
  constructor(chunks) {
    this.chunks = chunks; // [{id, source, title, text}]
    this._buildIndex();
  }

  _buildIndex() {
    const df = new Map(); // document frequency per term
    this.docs = this.chunks.map((chunk) => {
      const tokens = tokenize(chunk.text + " " + (chunk.title || ""));
      const tf = new Map();
      for (const t of tokens) tf.set(t, (tf.get(t) || 0) + 1);
      for (const t of tf.keys()) df.set(t, (df.get(t) || 0) + 1);
      return { tf, length: tokens.length };
    });

    const N = this.chunks.length || 1;
    this.idf = new Map();
    for (const [term, count] of df.entries()) {
      this.idf.set(term, Math.log(1 + N / count));
    }

    // precompute normalized tf-idf vectors + norms
    this.vectors = this.docs.map((doc) => {
      const vec = new Map();
      for (const [term, count] of doc.tf.entries()) {
        const idf = this.idf.get(term) || 0;
        vec.set(term, (count / (doc.length || 1)) * idf);
      }
      let norm = 0;
      for (const v of vec.values()) norm += v * v;
      return { vec, norm: Math.sqrt(norm) || 1 };
    });
  }

  /** Returns top-k chunks most relevant to the query, each with a similarity score. */
  search(query, k = 5) {
    const qTokens = tokenize(query);
    const qtf = new Map();
    for (const t of qTokens) qtf.set(t, (qtf.get(t) || 0) + 1);

    const qVec = new Map();
    for (const [term, count] of qtf.entries()) {
      const idf = this.idf.get(term) || Math.log(1 + this.chunks.length); // unseen term still counts a bit
      qVec.set(term, (count / (qTokens.length || 1)) * idf);
    }
    let qNorm = 0;
    for (const v of qVec.values()) qNorm += v * v;
    qNorm = Math.sqrt(qNorm) || 1;

    const queryTerms = new Set(qTokens);
    const scores = this.vectors.map(({ vec, norm }, i) => {
      let dot = 0;
      for (const [term, qv] of qVec.entries()) {
        const dv = vec.get(term);
        if (dv) dot += dv * qv;
      }
      const matchedTerms = [...queryTerms].filter((term) => vec.has(term)).length;
      const coverage = matchedTerms / (queryTerms.size || 1);
      return { i, score: (dot / (norm * qNorm)) * (0.5 + coverage / 2) };
    });

    scores.sort((a, b) => b.score - a.score);

    const seenSources = new Set();
    const results = [];
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
