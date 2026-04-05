import { GAME_HEIGHT, GAME_WIDTH, GROUND_HEIGHT } from "../../shared/constants/game.js";

export function createWorld(scene) {
  scene.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x6ec6ff);
  scene.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT - GROUND_HEIGHT / 2, GAME_WIDTH, GROUND_HEIGHT, 0xd9a15f);

  for (let i = 0; i < 8; i += 1) {
    const x = i * 80;
    scene.add.ellipse(x, 120 + (i % 2) * 18, 110, 42, 0xffffff, 0.8);
  }

  const skyline = scene.add.graphics();
  skyline.fillStyle(0x8fd67a, 1);
  skyline.fillRoundedRect(0, GAME_HEIGHT - GROUND_HEIGHT - 90, GAME_WIDTH, 90, 28);
  skyline.fillStyle(0x74c365, 1);
  skyline.fillRoundedRect(0, GAME_HEIGHT - GROUND_HEIGHT - 48, GAME_WIDTH, 48, 18);

  const ground = scene.physics.add.staticGroup();
  const groundSprite = ground.create(GAME_WIDTH / 2, GAME_HEIGHT - GROUND_HEIGHT / 2, "ground");
  groundSprite.refreshBody();

  return { ground };
}

