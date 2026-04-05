import Phaser from "phaser";
import { GAME_HEIGHT, GAME_WIDTH, SCENE_KEYS } from "../shared/constants/game.js";
import { BootScene } from "../scenes/BootScene.js";
import { MenuScene } from "../scenes/MenuScene.js";
import { GameScene } from "../scenes/GameScene.js";
import { GameOverScene } from "../scenes/GameOverScene.js";

export function createGameConfig(parent) {
  return {
    type: Phaser.AUTO,
    parent,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    resolution: Math.min(window.devicePixelRatio || 1, 2),
    render: {
      antialias: true,
      pixelArt: false,
      roundPixels: true,
      powerPreference: "default",
    },
    backgroundColor: "#6ec6ff",
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 },
        debug: false,
      },
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    autoRound: true,
    scene: [BootScene, MenuScene, GameScene, GameOverScene],
    title: "Flappy Bird",
    banner: false,
    callbacks: {
      postBoot(game) {
        game.registry.set("sceneKeys", SCENE_KEYS);
      },
    },
  };
}
