import Phaser from "phaser";
import { createWorld } from "../features/world/createWorld.js";
import { getAudioManager } from "../services/audio.js";
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
    this.audioManager = getAudioManager();
    this.world = createWorld(this, { groundScrollSpeed: 22 });

    const previousBest = getBestScore();
    const bestScore = saveBestScore(this.score);
    const isNewBest = this.score > previousBest;

    const scrim = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x10304a, 0.18);
    scrim.setDepth(10);

    const panelShadow = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 10, 336, 316, 0x0c2033, 0.2);
    panelShadow.setDepth(11);
    const panel = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, 336, 316, 0xf8f3df, 0.95);
    panel.setStrokeStyle(4, 0xffffff, 0.65);
    panel.setDepth(12);

    this.add.text(GAME_WIDTH / 2, 214, "ROUND OVER", {
      fontFamily: "Trebuchet MS",
      fontSize: "16px",
      color: "#6c7a86",
      fontStyle: "bold",
      letterSpacing: 4,
    }).setOrigin(0.5).setDepth(13);

    this.add.text(GAME_WIDTH / 2, 256, "Game Over", {
      fontFamily: "Trebuchet MS",
      fontSize: "42px",
      color: "#173850",
      fontStyle: "bold",
    }).setOrigin(0.5).setDepth(13);

    const scoreCard = this.add.rectangle(GAME_WIDTH / 2 - 78, 340, 118, 88, 0xffffff, 0.9);
    scoreCard.setStrokeStyle(2, 0xd9e7ef, 1).setDepth(13);
    const bestCard = this.add.rectangle(GAME_WIDTH / 2 + 78, 340, 118, 88, 0xffffff, 0.9);
    bestCard.setStrokeStyle(2, 0xd9e7ef, 1).setDepth(13);

    this.add.text(GAME_WIDTH / 2 - 78, 316, "SCORE", {
      fontFamily: "Trebuchet MS",
      fontSize: "14px",
      color: "#6c7a86",
      fontStyle: "bold",
      letterSpacing: 3,
    }).setOrigin(0.5).setDepth(14);

    this.add.text(GAME_WIDTH / 2 - 78, 350, String(this.score), {
      fontFamily: "Trebuchet MS",
      fontSize: "34px",
      color: "#173850",
      fontStyle: "bold",
    }).setOrigin(0.5).setDepth(14);

    this.add.text(GAME_WIDTH / 2 + 78, 316, "BEST", {
      fontFamily: "Trebuchet MS",
      fontSize: "14px",
      color: "#6c7a86",
      fontStyle: "bold",
      letterSpacing: 3,
    }).setOrigin(0.5).setDepth(14);

    this.add.text(GAME_WIDTH / 2 + 78, 350, String(bestScore), {
      fontFamily: "Trebuchet MS",
      fontSize: "34px",
      color: "#173850",
      fontStyle: "bold",
    }).setOrigin(0.5).setDepth(14);

    const badgeText = isNewBest ? "New best run" : "Try to beat your best";
    const badgeColor = isNewBest ? "#35662f" : "#486173";
    const badgeBg = isNewBest ? "#dcf4c8" : "#e3edf5";
    this.add.text(GAME_WIDTH / 2, 410, badgeText, {
      fontFamily: "Trebuchet MS",
      fontSize: "18px",
      color: badgeColor,
      fontStyle: "bold",
      backgroundColor: badgeBg,
      padding: { left: 14, right: 14, top: 8, bottom: 8 },
    }).setOrigin(0.5).setDepth(14);

    this.restartPrompt = this.add.text(GAME_WIDTH / 2, 478, "Get ready...", {
      fontFamily: "Trebuchet MS",
      fontSize: "24px",
      color: "#ffffff",
      fontStyle: "bold",
      stroke: "#18415d",
      strokeThickness: 6,
    }).setOrigin(0.5).setDepth(14);
    this.canRestart = false;

    this.time.delayedCall(RESTART_LOCK_MS, () => {
      this.canRestart = true;
      this.restartPrompt.setText("Click or press space to restart");
      this.input.once("pointerdown", () => this.restart());
      this.input.keyboard.once("keydown-SPACE", () => this.restart());
    });
  }

  update(_, delta) {
    this.world?.update(delta);
  }

  restart() {
    if (!this.canRestart) {
      return;
    }

    this.audioManager.unlock();
    this.audioManager.playSwoosh();
    this.scene.start(SCENE_KEYS.game);
  }
}
