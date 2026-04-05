import Phaser from "phaser";
import {
  GAME_HEIGHT,
  GROUND_HEIGHT,
  PIPE_BODY_OUTER_INSET_Y,
  PIPE_BODY_WIDTH,
  PIPE_DISTANCE,
  PIPE_GAP,
  PIPE_MIN_HEIGHT,
  PIPE_SPEED,
  PIPE_WIDTH,
  GAME_WIDTH,
} from "../../shared/constants/game.js";

export class PipeManager {
  constructor(scene) {
    this.scene = scene;
    this.group = scene.physics.add.group({ allowGravity: false, immovable: true });
    this.spawnTimer = null;
    this.scoredPipeIds = new Set();
    this.currentGap = PIPE_GAP;
    this.currentDistance = PIPE_DISTANCE;
    this.currentSpeed = PIPE_SPEED;
    this.isPaused = false;
  }

  start() {
    this.stop();
    this.spawnPipePair();
    this.scheduleSpawnTimer();
  }

  stop() {
    this.spawnTimer?.remove(false);
    this.spawnTimer = null;
    this.group.setVelocityX(0);
    this.isPaused = false;
  }

  reset() {
    this.stop();
    this.scoredPipeIds.clear();
    this.group.clear(true, true);
    this.currentGap = PIPE_GAP;
    this.currentDistance = PIPE_DISTANCE;
    this.currentSpeed = PIPE_SPEED;
  }

  pause() {
    this.isPaused = true;
    if (this.spawnTimer) {
      this.spawnTimer.paused = true;
    }
    this.group.setVelocityX(0);
  }

  resume() {
    this.isPaused = false;
    if (this.spawnTimer) {
      this.spawnTimer.paused = false;
    }
    this.group.setVelocityX(-this.currentSpeed);
  }

  setDifficulty({ gap, distance, speed }) {
    const hasChanged =
      gap !== this.currentGap ||
      distance !== this.currentDistance ||
      speed !== this.currentSpeed;

    if (!hasChanged) {
      return;
    }

    this.currentGap = gap;
    this.currentDistance = distance;
    this.currentSpeed = speed;

    if (!this.spawnTimer) {
      return;
    }

    this.group.setVelocityX(this.isPaused ? 0 : -this.currentSpeed);
    this.scheduleSpawnTimer();
  }

  update(birdX, onScore) {
    this.group.children.iterate((pipe) => {
      if (!pipe) {
        return;
      }

      if (pipe.x < -pipe.displayWidth) {
        pipe.destroy();
        return;
      }

      if (!pipe.getData("isTop") && !this.scoredPipeIds.has(pipe.name) && pipe.x + pipe.displayWidth / 2 < birdX) {
        this.scoredPipeIds.add(pipe.name);
        onScore();
      }
    });
  }

  isTouchingTopPipe(birdBounds) {
    let hasCollision = false;

    this.group.children.iterate((pipe) => {
      if (!pipe || hasCollision || !pipe.getData("isTop")) {
        return;
      }

      if (Phaser.Geom.Intersects.RectangleToRectangle(birdBounds, pipe.getBounds())) {
        hasCollision = true;
      }
    });

    return hasCollision;
  }

  spawnPipePair() {
    const minGapCenter = PIPE_MIN_HEIGHT + this.currentGap / 2;
    const maxGapCenter = GAME_HEIGHT - GROUND_HEIGHT - PIPE_MIN_HEIGHT - this.currentGap / 2;
    const gapCenter = Phaser.Math.Between(minGapCenter, maxGapCenter);
    const pipeX = GAME_WIDTH + 60;
    const pairId = `pipe-${Date.now()}-${Math.random()}`;

    const topPipeHeight = gapCenter - this.currentGap / 2;
    const bottomPipeY = gapCenter + this.currentGap / 2;
    const bottomPipeHeight = GAME_HEIGHT - GROUND_HEIGHT - bottomPipeY;

    this.createPipe(pipeX, topPipeHeight / 2, topPipeHeight, true, pairId);
    this.createPipe(pipeX, bottomPipeY + bottomPipeHeight / 2, bottomPipeHeight, false, pairId);
  }

  scheduleSpawnTimer() {
    const wasPaused = this.isPaused;
    this.spawnTimer?.remove(false);
    this.spawnTimer = this.scene.time.addEvent({
      delay: this.currentDistance / this.currentSpeed * 1000,
      loop: true,
      callback: () => this.spawnPipePair(),
    });
    this.spawnTimer.paused = wasPaused;
  }

  createPipe(x, y, displayHeight, flipY, pairId) {
    const pipe = this.group.create(x, y, "pipe");
    pipe.setDisplaySize(PIPE_WIDTH, displayHeight);
    pipe.setFlipY(flipY);
    pipe.setImmovable(true);
    pipe.body.allowGravity = false;
    if (flipY) {
      // Top pipes should be lethal on any visible contact.
      pipe.body.setSize(PIPE_WIDTH, displayHeight);
      pipe.body.setOffset(0, 0);
    } else {
      pipe.body.setSize(PIPE_BODY_WIDTH, Math.max(24, displayHeight - PIPE_BODY_OUTER_INSET_Y));
      pipe.body.setOffset(
        (PIPE_WIDTH - PIPE_BODY_WIDTH) / 2,
        PIPE_BODY_OUTER_INSET_Y,
      );
    }
    pipe.setVelocityX(-this.currentSpeed);
    pipe.setData("isTop", flipY);
    pipe.name = pairId;
  }
}
