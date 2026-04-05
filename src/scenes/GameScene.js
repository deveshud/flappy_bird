import Phaser from "phaser";
import { getDifficultySettings } from "../features/difficulty/getDifficultySettings.js";
import { Bird } from "../features/bird/Bird.js";
import { PipeManager } from "../features/pipes/PipeManager.js";
import { ScoreDisplay } from "../features/scoring/ScoreDisplay.js";
import { PauseControl } from "../features/ui/PauseControl.js";
import { getAudioManager } from "../services/audio.js";
import { createWorld } from "../features/world/createWorld.js";
import { GAME_HEIGHT, GROUND_HEIGHT, SCENE_KEYS } from "../shared/constants/game.js";

export class GameScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.game);
    this.started = false;
    this.isGameOver = false;
    this.isPaused = false;
  }

  create() {
    this.audioManager = getAudioManager();
    this.world = createWorld(this, { groundScrollSpeed: 0 });
    const { ground } = this.world;
    this.bird = new Bird(this);
    this.pipes = new PipeManager(this);
    this.scoreDisplay = new ScoreDisplay(this);
    this.scoreDisplay.reset();
    this.started = false;
    this.isGameOver = false;
    this.isPaused = false;
    this.currentDifficulty = getDifficultySettings(0);
    this.pipes.setDifficulty(this.currentDifficulty);

    this.physics.add.collider(this.bird.sprite, ground, () => this.gameOver(), null, this);
    this.physics.add.collider(this.bird.sprite, this.pipes.group, () => this.gameOver(), null, this);

    this.startPromptShadow = this.add.rectangle(240, 176, 294, 76, 0x0e3049, 0.15);
    this.startPromptShadow.setDepth(14);
    this.startPromptCard = this.add.rectangle(240, 170, 294, 76, 0xf8f3df, 0.95);
    this.startPromptCard.setStrokeStyle(3, 0xffffff, 0.6);
    this.startPromptCard.setDepth(15);

    this.startPrompt = this.add.text(240, 158, "Ready?", {
      fontFamily: "Trebuchet MS",
      fontSize: "26px",
      fontStyle: "bold",
      color: "#173850",
    }).setOrigin(0.5).setDepth(16);

    this.startHint = this.add.text(240, 184, "Press space or click to fly", {
      fontFamily: "Trebuchet MS",
      fontSize: "18px",
      color: "#486173",
    }).setOrigin(0.5).setDepth(16);

    this.pauseControl = new PauseControl(this, {
      onToggle: () => this.togglePause(),
    });
    this.pauseControl.setDifficultyLevel(this.currentDifficulty.tier + 1);

    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    this.input.on("pointerdown", this.handlePointerDown, this);
    this.spaceKey.on("down", this.handleFlap, this);
    this.pauseKey.on("down", this.togglePause, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.handleShutdown, this);
  }

  update(_, delta) {
    if (this.isGameOver || this.isPaused) {
      return;
    }

    this.world?.update(delta);
    this.bird.update();
    this.pipes.update(this.bird.sprite.x, () => {
      const nextScore = this.scoreDisplay.increment();
      this.audioManager.playScore();
      this.applyDifficulty(nextScore);
    });

    const topPipeContactBounds = this.bird.getTopPipeContactBounds();

    if (
      this.pipes.isTouchingTopPipe(topPipeContactBounds) ||
      this.bird.hasHitCeiling() ||
      this.bird.hasHitGround(GAME_HEIGHT - GROUND_HEIGHT)
    ) {
      this.gameOver();
    }
  }

  handlePointerDown(pointer) {
    if (this.pauseControl?.containsPoint(pointer.x, pointer.y)) {
      return;
    }

    this.handleFlap();
  }

  handleFlap() {
    if (this.isGameOver || this.isPaused) {
      return;
    }

    this.audioManager.unlock();

    if (!this.started) {
      this.started = true;
      this.startPrompt.setVisible(false);
      this.startHint.setVisible(false);
      this.startPromptCard.setVisible(false);
      this.startPromptShadow.setVisible(false);
      this.bird.start();
      this.pipes.start();
      this.pauseControl.setEnabled(true);
      this.world?.setGroundSpeed(this.currentDifficulty.speed);
    }

    this.bird.flap();
    this.audioManager.playFlap();
  }

  applyDifficulty(score) {
    const nextDifficulty = getDifficultySettings(score);
    this.currentDifficulty = nextDifficulty;
    this.pipes.setDifficulty(nextDifficulty);
    this.pauseControl?.setDifficultyLevel(nextDifficulty.tier + 1);

    if (this.started && !this.isPaused && !this.isGameOver) {
      this.world?.setGroundSpeed(nextDifficulty.speed);
    }
  }

  togglePause() {
    if (!this.started || this.isGameOver) {
      return;
    }

    this.audioManager.unlock();

    if (this.isPaused) {
      this.resumeGame();
      return;
    }

    this.pauseGame();
  }

  pauseGame() {
    if (this.isPaused) {
      return;
    }

    this.isPaused = true;
    this.physics.world.pause();
    this.pipes.pause();
    this.world?.setGroundSpeed(0);
    this.pauseControl?.setPaused(true);
  }

  resumeGame() {
    if (!this.isPaused) {
      return;
    }

    this.isPaused = false;
    this.physics.world.resume();
    this.pipes.resume();
    this.world?.setGroundSpeed(this.currentDifficulty.speed);
    this.pauseControl?.setPaused(false);
  }

  gameOver() {
    if (this.isGameOver) {
      return;
    }

    this.isGameOver = true;
    if (this.isPaused) {
      this.resumeGame();
    }

    this.isPaused = false;
    this.pauseControl?.setPaused(false);
    this.pauseControl?.setEnabled(false);
    this.pipes.stop();
    this.bird.sprite.setVelocityX(0);
    this.world?.setGroundSpeed(0);
    this.audioManager.playHit();
    this.detachControls();

    this.time.delayedCall(500, () => {
      this.scene.start(SCENE_KEYS.gameOver, { score: this.scoreDisplay.value });
    });
  }

  detachControls() {
    this.input.off("pointerdown", this.handlePointerDown, this);
    this.spaceKey?.off("down", this.handleFlap, this);
    this.pauseKey?.off("down", this.togglePause, this);
  }

  handleShutdown() {
    this.detachControls();
    this.pauseControl = null;
  }
}
