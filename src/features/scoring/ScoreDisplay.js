import { GAME_WIDTH } from "../../shared/constants/game.js";

export class ScoreDisplay {
  constructor(scene) {
    this.scene = scene;
    this.value = 0;
    this.shadow = scene.add.rectangle(GAME_WIDTH / 2, 58, 150, 74, 0x0f2b45, 0.18);
    this.shadow.setDepth(19);

    this.panel = scene.add.rectangle(GAME_WIDTH / 2, 54, 150, 74, 0xf9f6ea, 0.92);
    this.panel.setStrokeStyle(3, 0xffffff, 0.55);
    this.panel.setDepth(20);

    this.caption = scene.add.text(GAME_WIDTH / 2, 34, "SCORE", {
      fontFamily: "Trebuchet MS",
      fontSize: "14px",
      color: "#6c7a86",
      fontStyle: "bold",
      letterSpacing: 4,
    }).setOrigin(0.5).setDepth(21);

    this.label = scene.add.text(GAME_WIDTH / 2, 60, "0", {
      fontFamily: "Trebuchet MS",
      fontSize: "34px",
      color: "#15324c",
      fontStyle: "bold",
      stroke: "#ffffff",
      strokeThickness: 4,
    }).setOrigin(0.5).setDepth(21);
  }

  reset() {
    this.value = 0;
    this.render();
  }

  increment() {
    this.value += 1;
    this.render();
    this.scene.tweens.killTweensOf(this.label);
    this.scene.tweens.add({
      targets: this.label,
      scale: { from: 1.16, to: 1 },
      duration: 160,
      ease: "Back.Out",
    });
    return this.value;
  }

  render() {
    this.label.setText(String(this.value));
  }
}
