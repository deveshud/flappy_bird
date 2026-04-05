import Phaser from "phaser";
import { Bird } from "../features/bird/Bird.js";
import { PipeManager } from "../features/pipes/PipeManager.js";
import { ScoreDisplay } from "../features/scoring/ScoreDisplay.js";
import { createWorld } from "../features/world/createWorld.js";
import { GAME_HEIGHT, GROUND_HEIGHT, SCENE_KEYS } from "../shared/constants/game.js";

export class GameScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.game);
    this.started = false;
    this.isGameOver = false;
  }

  create() {
    const { ground } = createWorld(this);
    this.bird = new Bird(this);
    this.pipes = new PipeManager(this);
    this.scoreDisplay = new ScoreDisplay(this);
    this.scoreDisplay.reset();
    this.started = false;
    this.isGameOver = false;

    this.physics.add.collider(this.bird.sprite, ground, () => this.gameOver(), null, this);
    this.physics.add.collider(this.bird.sprite, this.pipes.group, () => this.gameOver(), null, this);

    this.startPrompt = this.add.text(240, 170, "Press space or click to fly", {
      fontFamily: "Trebuchet MS",
      fontSize: "24px",
      color: "#16324f",
      backgroundColor: "#f9e6a6",
      padding: { left: 14, right: 14, top: 10, bottom: 10 },
    }).setOrigin(0.5).setDepth(15);

    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.input.on("pointerdown", this.handleFlap, this);
    this.spaceKey.on("down", this.handleFlap, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.handleShutdown, this);
  }

  update() {
    if (this.isGameOver) {
      return;
    }

    this.bird.update();
    this.pipes.update(this.bird.sprite.x, () => this.scoreDisplay.increment());

    if (this.bird.hasHitCeiling() || this.bird.hasHitGround(GAME_HEIGHT - GROUND_HEIGHT)) {
      this.gameOver();
    }
  }

  handleFlap() {
    if (this.isGameOver) {
      return;
    }

    if (!this.started) {
      this.started = true;
      this.startPrompt.setVisible(false);
      this.bird.start();
      this.pipes.start();
    }

    this.bird.flap();
  }

  gameOver() {
    if (this.isGameOver) {
      return;
    }

    this.isGameOver = true;
    this.pipes.stop();
    this.bird.sprite.setVelocityX(0);
    this.detachControls();

    this.time.delayedCall(500, () => {
      this.scene.start(SCENE_KEYS.gameOver, { score: this.scoreDisplay.value });
    });
  }

  detachControls() {
    this.input.off("pointerdown", this.handleFlap, this);
    this.spaceKey?.off("down", this.handleFlap, this);
  }

  handleShutdown() {
    this.detachControls();
  }
}
