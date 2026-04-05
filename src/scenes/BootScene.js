import Phaser from "phaser";
import { GAME_HEIGHT, GAME_WIDTH, GROUND_HEIGHT, SCENE_KEYS } from "../shared/constants/game.js";

export class BootScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.boot);
  }

  create() {
    this.createTextures();

    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x6ec6ff);
    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 24, "Booting Flappy Bird", {
      fontFamily: "Trebuchet MS",
      fontSize: "34px",
      color: "#ffffff",
      stroke: "#18415d",
      strokeThickness: 8,
    }).setOrigin(0.5);
    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 28, "Preparing scenes and textures...", {
      fontFamily: "Trebuchet MS",
      fontSize: "18px",
      color: "#16324f",
      backgroundColor: "#f9e6a6",
      padding: { left: 12, right: 12, top: 8, bottom: 8 },
    }).setOrigin(0.5);

    this.time.delayedCall(500, () => {
      this.scene.start(SCENE_KEYS.menu);
    });
  }

  createTextures() {
    if (!this.textures.exists("bird")) {
      const bird = this.make.graphics({ x: 0, y: 0, add: false });
      bird.fillStyle(0xf6b731, 1);
      bird.fillEllipse(24, 24, 42, 34);
      bird.fillStyle(0xffe08a, 1);
      bird.fillEllipse(20, 20, 24, 18);
      bird.fillStyle(0xd97b11, 1);
      bird.fillEllipse(24, 32, 30, 12);
      bird.fillStyle(0xf39c12, 1);
      bird.fillTriangle(44, 24, 62, 18, 62, 30);
      bird.fillStyle(0xffffff, 1);
      bird.fillCircle(30, 18, 7);
      bird.fillStyle(0x202124, 1);
      bird.fillCircle(32, 18, 3);
      bird.lineStyle(2, 0x4d2e11, 0.25);
      bird.strokeEllipse(24, 24, 42, 34);
      bird.generateTexture("bird", 64, 48);
      bird.destroy();
    }

    if (!this.textures.exists("pipe")) {
      const pipe = this.make.graphics({ x: 0, y: 0, add: false });
      pipe.fillStyle(0x44a93a, 1);
      pipe.fillRoundedRect(8, 0, 62, 320, 10);
      pipe.fillStyle(0x2e7d32, 1);
      pipe.fillRect(12, 0, 9, 320);
      pipe.fillStyle(0x7ed957, 1);
      pipe.fillRect(50, 0, 8, 320);
      pipe.fillStyle(0x56c643, 1);
      pipe.fillRoundedRect(0, 0, 78, 28, 8);
      pipe.fillStyle(0x87e36d, 1);
      pipe.fillRect(4, 4, 70, 6);
      pipe.lineStyle(2, 0x215524, 0.28);
      pipe.strokeRoundedRect(8, 0, 62, 320, 10);
      pipe.generateTexture("pipe", 78, 320);
      pipe.destroy();
    }

    if (!this.textures.exists("ground")) {
      const ground = this.make.graphics({ x: 0, y: 0, add: false });
      ground.fillStyle(0xd9a15f, 1);
      ground.fillRect(0, 0, GAME_WIDTH, GROUND_HEIGHT);
      ground.fillStyle(0xb67832, 1);
      ground.fillRect(0, 0, GAME_WIDTH, 18);
      ground.fillStyle(0xe9bd7a, 1);
      for (let x = 0; x < GAME_WIDTH; x += 34) {
        ground.fillRect(x, 28 + (x % 2) * 4, 16, 10);
      }
      ground.generateTexture("ground", GAME_WIDTH, GROUND_HEIGHT);
      ground.destroy();
    }

    if (!this.textures.exists("grass-strip")) {
      const grass = this.make.graphics({ x: 0, y: 0, add: false });
      grass.fillStyle(0x6ad14b, 1);
      grass.fillRect(0, 0, 128, 28);
      grass.fillStyle(0x9cf06f, 1);
      for (let x = 0; x < 128; x += 14) {
        grass.fillTriangle(x, 24, x + 6, 6, x + 12, 24);
      }
      grass.fillStyle(0x4aa73a, 0.85);
      grass.fillRect(0, 22, 128, 6);
      grass.generateTexture("grass-strip", 128, 28);
      grass.destroy();
    }

    if (!this.textures.exists("ground-strip")) {
      const dirt = this.make.graphics({ x: 0, y: 0, add: false });
      dirt.fillStyle(0xc88a4a, 1);
      dirt.fillRect(0, 0, 128, 84);
      dirt.fillStyle(0xa76834, 0.9);
      for (let x = 0; x < 128; x += 20) {
        dirt.fillRoundedRect(x, 12 + (x % 3) * 14, 12, 10, 3);
      }
      dirt.fillStyle(0xe0a96c, 0.75);
      for (let x = 10; x < 128; x += 24) {
        dirt.fillRoundedRect(x, 44 + (x % 2) * 10, 10, 8, 3);
      }
      dirt.generateTexture("ground-strip", 128, 84);
      dirt.destroy();
    }
  }
}
