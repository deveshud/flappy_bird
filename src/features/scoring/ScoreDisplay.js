export class ScoreDisplay {
  constructor(scene) {
    this.scene = scene;
    this.value = 0;
    this.label = scene.add.text(24, 24, "Score: 0", {
      fontFamily: "Trebuchet MS",
      fontSize: "28px",
      color: "#ffffff",
      stroke: "#18415d",
      strokeThickness: 6,
    });
    this.label.setDepth(20);
  }

  reset() {
    this.value = 0;
    this.render();
  }

  increment() {
    this.value += 1;
    this.render();
    return this.value;
  }

  render() {
    this.label.setText(`Score: ${this.value}`);
  }
}

