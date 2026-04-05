import Phaser from "phaser";
import { createWorld } from "../features/world/createWorld.js";
import { GAME_HEIGHT, GAME_WIDTH, SCENE_KEYS } from "../shared/constants/game.js";

export class MenuScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.menu);
  }

  create() {
    createWorld(this);

    this.add.text(GAME_WIDTH / 2, 180, "Flappy Bird", {
      fontFamily: "Trebuchet MS",
      fontSize: "54px",
      color: "#ffffff",
      stroke: "#18415d",
      strokeThickness: 8,
    }).setOrigin(0.5);

    this.add.text(GAME_WIDTH / 2, 285, "Tap or press space to flap", {
      fontFamily: "Trebuchet MS",
      fontSize: "24px",
      color: "#16324f",
      backgroundColor: "#f9e6a6",
      padding: { left: 14, right: 14, top: 10, bottom: 10 },
    }).setOrigin(0.5);

    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT - 180, "Click to start", {
      fontFamily: "Trebuchet MS",
      fontSize: "28px",
      color: "#ffffff",
      stroke: "#18415d",
      strokeThickness: 6,
    }).setOrigin(0.5);

    this.input.keyboard.once("keydown-SPACE", () => this.startGame());
    this.input.once("pointerdown", () => this.startGame());
  }

  startGame() {
    this.scene.start(SCENE_KEYS.game);
  }
}

