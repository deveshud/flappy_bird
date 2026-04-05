import Phaser from "phaser";
import { createWorld } from "../features/world/createWorld.js";
import { getAudioManager } from "../services/audio.js";
import { getBestScore } from "../services/storage.js";
import { GAME_HEIGHT, GAME_WIDTH, SCENE_KEYS } from "../shared/constants/game.js";

export class MenuScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.menu);
  }

  create() {
    this.audioManager = getAudioManager();
    this.world = createWorld(this, { groundScrollSpeed: 18 });

    const titleShadow = this.add.text(GAME_WIDTH / 2, 118, "Flappy Bird", {
      fontFamily: "Trebuchet MS",
      fontSize: "58px",
      color: "#17415e",
      fontStyle: "bold",
    }).setOrigin(0.5).setDepth(10);
    titleShadow.y += 6;
    titleShadow.setAlpha(0.24);

    this.add.text(GAME_WIDTH / 2, 112, "Flappy Bird", {
      fontFamily: "Trebuchet MS",
      fontSize: "58px",
      color: "#ffffff",
      fontStyle: "bold",
      stroke: "#18415d",
      strokeThickness: 10,
    }).setOrigin(0.5).setDepth(11);

    this.add.text(GAME_WIDTH / 2, 152, "Arcade flight, one tap at a time", {
      fontFamily: "Trebuchet MS",
      fontSize: "21px",
      color: "#15324c",
      fontStyle: "bold",
    }).setOrigin(0.5).setDepth(11);

    const heroBird = this.add.image(GAME_WIDTH / 2 - 10, 258, "bird").setScale(1.5).setDepth(12);
    const leftPipe = this.add.image(86, 338, "pipe").setOrigin(0.5, 0).setScale(0.88, 0.78).setDepth(9);
    leftPipe.setTint(0xbff78d);
    const rightPipe = this.add.image(GAME_WIDTH - 86, 430, "pipe").setOrigin(0.5, 1).setScale(0.88, 0.74).setDepth(9);
    rightPipe.setTint(0xa8ea7c);

    this.tweens.add({
      targets: heroBird,
      y: heroBird.y - 12,
      angle: -6,
      duration: 1100,
      ease: "Sine.InOut",
      yoyo: true,
      repeat: -1,
    });

    const infoShadow = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT - 192, 320, 170, 0x18354c, 0.15);
    infoShadow.setDepth(11);
    infoShadow.y += 8;

    const infoCard = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT - 198, 320, 170, 0xf7f2df, 0.94);
    infoCard.setStrokeStyle(3, 0xffffff, 0.65);
    infoCard.setDepth(12);

    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT - 244, "HOW TO PLAY", {
      fontFamily: "Trebuchet MS",
      fontSize: "16px",
      color: "#6c7a86",
      fontStyle: "bold",
      letterSpacing: 3,
    }).setOrigin(0.5).setDepth(13);

    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT - 208, "Tap or press space to flap", {
      fontFamily: "Trebuchet MS",
      fontSize: "24px",
      color: "#15324c",
      fontStyle: "bold",
    }).setOrigin(0.5).setDepth(13);

    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT - 178, "Stay centered and thread the gaps", {
      fontFamily: "Trebuchet MS",
      fontSize: "18px",
      color: "#486173",
    }).setOrigin(0.5).setDepth(13);

    this.bestBadge = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT - 140, `Best score: ${getBestScore()}`, {
      fontFamily: "Trebuchet MS",
      fontSize: "18px",
      color: "#2d5f32",
      backgroundColor: "#dff4c8",
      padding: { left: 14, right: 14, top: 8, bottom: 8 },
    }).setOrigin(0.5).setDepth(13);

    this.startLabel = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT - 92, "Click to start", {
      fontFamily: "Trebuchet MS",
      fontSize: "28px",
      color: "#ffffff",
      fontStyle: "bold",
      stroke: "#18415d",
      strokeThickness: 6,
    }).setOrigin(0.5).setDepth(13);

    this.tweens.add({
      targets: this.startLabel,
      alpha: 0.55,
      duration: 700,
      ease: "Sine.InOut",
      yoyo: true,
      repeat: -1,
    });

    this.input.keyboard.once("keydown-SPACE", () => this.startGame());
    this.input.once("pointerdown", () => this.startGame());
  }

  update(_, delta) {
    this.world?.update(delta);
  }

  startGame() {
    this.audioManager.unlock();
    this.audioManager.playSwoosh();
    this.scene.start(SCENE_KEYS.game);
  }
}
