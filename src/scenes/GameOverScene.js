import Phaser from "phaser";
import { createWorld } from "../features/world/createWorld.js";
import { getBestScore, saveBestScore } from "../services/storage.js";
import { GAME_HEIGHT, GAME_WIDTH, RESTART_LOCK_MS, SCENE_KEYS } from "../shared/constants/game.js";

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.gameOver);
  }

  init(data) {
    this.score = data.score ?? 0;
  }

  create() {
    createWorld(this);

    const bestScore = saveBestScore(this.score);

    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, 320, 240, 0x16324f, 0.82).setStrokeStyle(4, 0xf9e6a6);

    this.add.text(GAME_WIDTH / 2, 240, "Game Over", {
      fontFamily: "Trebuchet MS",
      fontSize: "42px",
      color: "#ffffff",
    }).setOrigin(0.5);

    this.add.text(GAME_WIDTH / 2, 320, `Score: ${this.score}`, {
      fontFamily: "Trebuchet MS",
      fontSize: "28px",
      color: "#f9e6a6",
    }).setOrigin(0.5);

    this.add.text(GAME_WIDTH / 2, 368, `Best: ${bestScore || getBestScore()}`, {
      fontFamily: "Trebuchet MS",
      fontSize: "24px",
      color: "#ffffff",
    }).setOrigin(0.5);

    this.restartPrompt = this.add.text(GAME_WIDTH / 2, 460, "Get ready...", {
      fontFamily: "Trebuchet MS",
      fontSize: "22px",
      color: "#ffffff",
    }).setOrigin(0.5);
    this.canRestart = false;

    this.time.delayedCall(RESTART_LOCK_MS, () => {
      this.canRestart = true;
      this.restartPrompt.setText("Click or press space to restart");
      this.input.once("pointerdown", () => this.restart());
      this.input.keyboard.once("keydown-SPACE", () => this.restart());
    });
  }

  restart() {
    if (!this.canRestart) {
      return;
    }

    this.scene.start(SCENE_KEYS.game);
  }
}
