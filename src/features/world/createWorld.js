import Phaser from "phaser";
import { GAME_HEIGHT, GAME_WIDTH, GROUND_HEIGHT } from "../../shared/constants/game.js";

function createCloud(scene, x, y, scale, alpha, depth, speed) {
  const cloud = scene.add.container(x, y);
  const puffA = scene.add.ellipse(-28 * scale, 4 * scale, 58 * scale, 34 * scale, 0xffffff, alpha);
  const puffB = scene.add.ellipse(0, -8 * scale, 72 * scale, 42 * scale, 0xffffff, alpha);
  const puffC = scene.add.ellipse(32 * scale, 4 * scale, 56 * scale, 30 * scale, 0xf8fdff, alpha * 0.96);
  const base = scene.add.ellipse(0, 10 * scale, 112 * scale, 30 * scale, 0xdcefff, alpha * 0.35);
  cloud.add([base, puffA, puffB, puffC]);
  cloud.setDepth(depth);
  cloud.speed = speed;
  cloud.baseY = y;
  return cloud;
}

export function createWorld(scene, options = {}) {
  const {
    groundScrollSpeed = 0,
    cloudDrift = true,
    ambientMotion = true,
  } = options;

  const background = scene.add.graphics();
  background.fillStyle(0x89d7ff, 1);
  background.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  background.fillStyle(0x68c6fb, 1);
  background.fillRect(0, 130, GAME_WIDTH, GAME_HEIGHT - 130);
  background.fillStyle(0x9fe6ff, 0.65);
  background.fillCircle(GAME_WIDTH - 96, 108, 54);
  background.fillStyle(0xffffff, 0.18);
  background.fillCircle(GAME_WIDTH - 96, 108, 88);
  background.setDepth(0);

  const haze = scene.add.graphics();
  haze.fillStyle(0xffffff, 0.08);
  haze.fillEllipse(GAME_WIDTH / 2, 230, GAME_WIDTH + 120, 220);
  haze.setDepth(1);

  const clouds = [
    createCloud(scene, 88, 128, 0.9, 0.85, 2, 8),
    createCloud(scene, 340, 104, 0.72, 0.75, 2, 11),
    createCloud(scene, 258, 176, 0.56, 0.55, 2, 16),
  ];

  const farHills = scene.add.graphics();
  farHills.fillStyle(0x7dcf8d, 1);
  farHills.fillEllipse(40, GAME_HEIGHT - GROUND_HEIGHT - 92, 180, 96);
  farHills.fillEllipse(200, GAME_HEIGHT - GROUND_HEIGHT - 110, 210, 120);
  farHills.fillEllipse(398, GAME_HEIGHT - GROUND_HEIGHT - 98, 190, 104);
  farHills.fillRect(0, GAME_HEIGHT - GROUND_HEIGHT - 82, GAME_WIDTH, 82);
  farHills.setDepth(3);

  const midHills = scene.add.graphics();
  midHills.fillStyle(0x5db869, 1);
  midHills.fillEllipse(86, GAME_HEIGHT - GROUND_HEIGHT - 58, 170, 88);
  midHills.fillEllipse(250, GAME_HEIGHT - GROUND_HEIGHT - 74, 220, 104);
  midHills.fillEllipse(420, GAME_HEIGHT - GROUND_HEIGHT - 52, 180, 82);
  midHills.fillRect(0, GAME_HEIGHT - GROUND_HEIGHT - 46, GAME_WIDTH, 46);
  midHills.setDepth(4);

  const foreground = scene.add.graphics();
  foreground.fillStyle(0x4a9948, 1);
  foreground.fillRect(0, GAME_HEIGHT - GROUND_HEIGHT - 18, GAME_WIDTH, 18);
  foreground.fillStyle(0x8ae35b, 0.9);
  foreground.fillRect(0, GAME_HEIGHT - GROUND_HEIGHT - 18, GAME_WIDTH, 6);
  foreground.setDepth(5);

  const grassBand = scene.add.tileSprite(
    GAME_WIDTH / 2,
    GAME_HEIGHT - GROUND_HEIGHT - 14,
    GAME_WIDTH,
    28,
    "grass-strip",
  );
  grassBand.setDepth(6);

  const dirtBand = scene.add.tileSprite(
    GAME_WIDTH / 2,
    GAME_HEIGHT - GROUND_HEIGHT / 2 + 14,
    GAME_WIDTH,
    GROUND_HEIGHT - 18,
    "ground-strip",
  );
  dirtBand.setDepth(6);

  const groundShadow = scene.add.rectangle(
    GAME_WIDTH / 2,
    GAME_HEIGHT - GROUND_HEIGHT + 10,
    GAME_WIDTH,
    18,
    0x6f4423,
    0.24,
  );
  groundShadow.setDepth(7);

  const ground = scene.physics.add.staticGroup();
  const groundSprite = ground.create(GAME_WIDTH / 2, GAME_HEIGHT - GROUND_HEIGHT / 2, "ground");
  groundSprite.setVisible(false);
  groundSprite.refreshBody();

  let currentGroundSpeed = groundScrollSpeed;
  let elapsed = 0;

  return {
    ground,
    setGroundSpeed(nextSpeed) {
      currentGroundSpeed = nextSpeed;
    },
    update(delta = 16) {
      const dt = delta / 1000;
      elapsed += dt;

      grassBand.tilePositionX += currentGroundSpeed * 1.55 * dt;
      dirtBand.tilePositionX += currentGroundSpeed * dt;

      if (cloudDrift) {
        for (const cloud of clouds) {
          cloud.x -= cloud.speed * dt;
          if (cloud.x < -90) {
            cloud.x = GAME_WIDTH + Phaser.Math.Between(70, 160);
            cloud.y = cloud.baseY + Phaser.Math.Between(-12, 12);
          }
        }
      }

      if (ambientMotion) {
        for (const [index, cloud] of clouds.entries()) {
          cloud.y = cloud.baseY + Math.sin(elapsed * (0.3 + index * 0.08)) * (2 + index);
        }
      }
    },
  };
}
