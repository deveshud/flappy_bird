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
      bird.fillStyle(0xffdf5d, 1);
      bird.fillEllipse(24, 24, 42, 34);
      bird.fillStyle(0xf39c12, 1);
      bird.fillTriangle(42, 24, 62, 18, 62, 30);
      bird.fillStyle(0xffffff, 1);
      bird.fillCircle(30, 18, 7);
      bird.fillStyle(0x202124, 1);
      bird.fillCircle(32, 18, 3);
      bird.generateTexture("bird", 64, 48);
      bird.destroy();
    }

    if (!this.textures.exists("pipe")) {
      const pipe = this.make.graphics({ x: 0, y: 0, add: false });
      pipe.fillStyle(0x54b948, 1);
      pipe.fillRoundedRect(0, 0, 78, 320, 10);
      pipe.fillStyle(0x3d8b37, 1);
      pipe.fillRect(8, 0, 10, 320);
      pipe.fillStyle(0x6ed35f, 1);
      pipe.fillRect(0, 0, 78, 22);
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
  }
}
