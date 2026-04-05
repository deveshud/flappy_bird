import Phaser from "phaser";
import {
  BIRD_BODY_OFFSET_X,
  BIRD_BODY_OFFSET_Y,
  BIRD_BODY_RADIUS,
  BIRD_START_X,
  BIRD_START_Y,
  CEILING_HIT_Y,
  FLAP_VELOCITY,
  GRAVITY_Y,
  MAX_FALL_SPEED,
} from "../../shared/constants/game.js";

export class Bird {
  constructor(scene) {
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(BIRD_START_X, BIRD_START_Y, "bird");
    this.sprite.setCircle(BIRD_BODY_RADIUS, BIRD_BODY_OFFSET_X, BIRD_BODY_OFFSET_Y);
    this.sprite.setCollideWorldBounds(false);
    this.sprite.body.setAllowGravity(false);
    this.sprite.body.setMaxVelocity(1000, MAX_FALL_SPEED);
    this.sprite.setDepth(10);
  }

  start() {
    this.sprite.body.setAllowGravity(true);
    this.sprite.body.setGravityY(GRAVITY_Y);
  }

  flap() {
    this.sprite.setVelocityY(FLAP_VELOCITY);
  }

  update() {
    const targetAngle = Phaser.Math.Clamp(this.sprite.body.velocity.y * 0.11, -22, 72);
    this.sprite.angle = Phaser.Math.Linear(this.sprite.angle, targetAngle, 0.18);
  }

  reset() {
    this.sprite.setPosition(BIRD_START_X, BIRD_START_Y);
    this.sprite.setVelocity(0, 0);
    this.sprite.setAngle(0);
    this.sprite.body.setAllowGravity(false);
  }

  hasHitCeiling() {
    return this.sprite.getTopCenter().y <= CEILING_HIT_Y;
  }

  hasHitGround(groundY) {
    return this.sprite.getBottomCenter().y >= groundY;
  }
}
