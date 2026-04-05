import Phaser from "phaser";
import {
  GAME_HEIGHT,
  GROUND_HEIGHT,
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
  }

  start() {
    this.stop();
    this.spawnPipePair();
    this.spawnTimer = this.scene.time.addEvent({
      delay: PIPE_DISTANCE / PIPE_SPEED * 1000,
      loop: true,
      callback: () => this.spawnPipePair(),
    });
  }

  stop() {
    this.spawnTimer?.remove(false);
    this.spawnTimer = null;
    this.group.setVelocityX(0);
  }

  reset() {
    this.stop();
    this.scoredPipeIds.clear();
    this.group.clear(true, true);
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

  spawnPipePair() {
    const minGapCenter = PIPE_MIN_HEIGHT + PIPE_GAP / 2;
    const maxGapCenter = GAME_HEIGHT - GROUND_HEIGHT - PIPE_MIN_HEIGHT - PIPE_GAP / 2;
    const gapCenter = Phaser.Math.Between(minGapCenter, maxGapCenter);
    const pipeX = GAME_WIDTH + 60;
    const pairId = `pipe-${Date.now()}-${Math.random()}`;

    const topPipeHeight = gapCenter - PIPE_GAP / 2;
    const bottomPipeY = gapCenter + PIPE_GAP / 2;
    const bottomPipeHeight = GAME_HEIGHT - GROUND_HEIGHT - bottomPipeY;

    this.createPipe(pipeX, topPipeHeight / 2, topPipeHeight, true, pairId);
    this.createPipe(pipeX, bottomPipeY + bottomPipeHeight / 2, bottomPipeHeight, false, pairId);
  }

  createPipe(x, y, displayHeight, flipY, pairId) {
    const pipe = this.group.create(x, y, "pipe");
    pipe.setDisplaySize(PIPE_WIDTH, displayHeight);
    pipe.setFlipY(flipY);
    pipe.setImmovable(true);
    pipe.body.allowGravity = false;
    pipe.body.setSize(PIPE_BODY_WIDTH, displayHeight);
    pipe.body.setOffset((PIPE_WIDTH - PIPE_BODY_WIDTH) / 2, 0);
    pipe.setVelocityX(-PIPE_SPEED);
    pipe.setData("isTop", flipY);
    pipe.name = pairId;
  }
}
