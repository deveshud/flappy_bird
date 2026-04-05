import { GAME_WIDTH } from "../../shared/constants/game.js";

export class PauseControl {
  constructor(scene, { onToggle }) {
    this.scene = scene;
    this.onToggle = onToggle;
    this.enabled = false;
    this.isPaused = false;

    this.buttonShadow = scene.add.circle(GAME_WIDTH - 40, 53, 24, 0x0d2b44, 0.18);
    this.buttonShadow.setDepth(23);

    this.buttonBg = scene.add.circle(GAME_WIDTH - 40, 48, 24, 0xf9f6ea, 0.94);
    this.buttonBg.setStrokeStyle(3, 0xffffff, 0.6);
    this.buttonBg.setDepth(24);
    this.buttonBg.setInteractive({ useHandCursor: true });

    this.buttonIcon = scene.add.text(GAME_WIDTH - 40, 48, "II", {
      fontFamily: "Trebuchet MS",
      fontSize: "20px",
      fontStyle: "bold",
      color: "#15324c",
    }).setOrigin(0.5).setDepth(25);

    this.buttonLabel = scene.add.text(GAME_WIDTH - 40, 78, "PAUSE", {
      fontFamily: "Trebuchet MS",
      fontSize: "11px",
      fontStyle: "bold",
      color: "#ffffff",
      stroke: "#15324c",
      strokeThickness: 4,
      letterSpacing: 2,
    }).setOrigin(0.5).setDepth(25);

    this.overlay = scene.add.container(0, 0);
    this.overlay.setDepth(40);
    this.overlay.setVisible(false);

    const scrim = scene.add.rectangle(240, 360, 480, 720, 0x10304a, 0.36);
    const panelShadow = scene.add.rectangle(240, 314, 278, 176, 0x0d2234, 0.18);
    const panel = scene.add.rectangle(240, 304, 278, 176, 0xf8f3df, 0.96);
    panel.setStrokeStyle(3, 0xffffff, 0.65);

    const title = scene.add.text(240, 266, "Paused", {
      fontFamily: "Trebuchet MS",
      fontSize: "36px",
      fontStyle: "bold",
      color: "#173850",
    }).setOrigin(0.5);

    const hint = scene.add.text(240, 320, "Tap the button or press P to resume", {
      fontFamily: "Trebuchet MS",
      fontSize: "18px",
      color: "#486173",
      align: "center",
      wordWrap: { width: 220 },
    }).setOrigin(0.5);

    this.difficultyLabel = scene.add.text(240, 366, "Difficulty: 1", {
      fontFamily: "Trebuchet MS",
      fontSize: "18px",
      fontStyle: "bold",
      color: "#2e5f86",
      backgroundColor: "#deedf8",
      padding: { left: 14, right: 14, top: 8, bottom: 8 },
    }).setOrigin(0.5);

    this.overlay.add([scrim, panelShadow, panel, title, hint, this.difficultyLabel]);

    this.buttonBg.on("pointerdown", (pointer) => {
      pointer.event?.stopPropagation?.();
      if (!this.enabled) {
        return;
      }

      this.onToggle();
    });

    this.setEnabled(false);
  }

  containsPoint(x, y) {
    return this.buttonBg.getBounds().contains(x, y);
  }

  setEnabled(enabled) {
    this.enabled = enabled;
    const alpha = enabled ? 1 : 0.5;
    this.buttonBg.setAlpha(alpha);
    this.buttonIcon.setAlpha(alpha);
    this.buttonLabel.setAlpha(alpha);
  }

  setPaused(isPaused) {
    this.isPaused = isPaused;
    this.buttonIcon.setText(isPaused ? ">" : "II");
    this.overlay.setVisible(isPaused);
  }

  setDifficultyLevel(level) {
    this.difficultyLabel.setText(`Difficulty: ${level}`);
  }

  destroy() {
    this.buttonBg.destroy();
    this.buttonShadow.destroy();
    this.buttonIcon.destroy();
    this.buttonLabel.destroy();
    this.overlay.destroy(true);
  }
}
