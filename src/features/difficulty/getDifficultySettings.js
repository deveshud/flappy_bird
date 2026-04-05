import {
  DIFFICULTY_SCORE_STEP,
  PIPE_DISTANCE,
  PIPE_DISTANCE_STEP,
  PIPE_GAP,
  PIPE_GAP_STEP,
  PIPE_MAX_SPEED,
  PIPE_MIN_DISTANCE,
  PIPE_MIN_GAP,
  PIPE_SPEED,
  PIPE_SPEED_STEP,
} from "../../shared/constants/game.js";

export function getDifficultySettings(score = 0) {
  const tier = Math.floor(score / DIFFICULTY_SCORE_STEP);

  return {
    tier,
    gap: Math.max(PIPE_MIN_GAP, PIPE_GAP - tier * PIPE_GAP_STEP),
    distance: Math.max(PIPE_MIN_DISTANCE, PIPE_DISTANCE - tier * PIPE_DISTANCE_STEP),
    speed: Math.min(PIPE_MAX_SPEED, PIPE_SPEED + tier * PIPE_SPEED_STEP),
  };
}

