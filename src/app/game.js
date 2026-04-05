import Phaser from "phaser";
import { createGameConfig } from "./gameConfig.js";

let gameInstance;

export function mountGame(parentId) {
  if (gameInstance) {
    return gameInstance;
  }

  gameInstance = new Phaser.Game(createGameConfig(parentId));
  return gameInstance;
}

