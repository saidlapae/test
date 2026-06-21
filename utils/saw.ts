export interface Criteria {
  id: string;
  name: string;
  type: "benefit" | "cost";
  weight: number;
}
export interface Alternative {
  id: string;
  name: string;
  brand: string;
  values: Record<string, number>;
}
export interface Result {
  alternative: Alternative;
  score: number;
  rank: number;
}

export function calculateSAW(
  criteria: Criteria[],
  alternatives: Alternative[],
): Result[] {
  const maxMin: Record<string, number> = {};
  criteria.forEach((c) => {
    const vals = alternatives.map((a) => a.values[c.id] || 0);
    maxMin[c.id] = c.type === "benefit" ? Math.max(...vals) : Math.min(...vals);
  });

  const results: Result[] = alternatives.map((alt) => {
    let score = 0;
    criteria.forEach((c) => {
      const val = alt.values[c.id] || 0;
      const norm =
        c.type === "benefit" ? val / maxMin[c.id] : maxMin[c.id] / val;
      score += c.weight * norm;
    });
    return { alternative: alt, score: parseFloat(score.toFixed(4)), rank: 0 };
  });

  results.sort((a, b) => b.score - a.score);
  results.forEach((r, i) => (r.rank = i + 1));
  return results;
}
