const BEST_SCORE_KEY = "flappy-bird-best-score";

function getStorage() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function getBestScore() {
  const storage = getStorage();
  const value = storage?.getItem(BEST_SCORE_KEY);
  return value ? Number(value) : 0;
}

export function saveBestScore(score) {
  const nextBest = Math.max(score, getBestScore());
  const storage = getStorage();
  storage?.setItem(BEST_SCORE_KEY, String(nextBest));
  return nextBest;
}
