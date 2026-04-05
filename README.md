# Flappy Bird

A modular Flappy Bird clone built with `Phaser 3` and `Vite`.

The project focuses on a clean gameplay loop, lightweight procedural visuals, modular scene/features separation, and simple browser-first development with no external art or audio asset pipeline required.

## Tech Stack

- `Node.js`
- `Vite`
- `Phaser 3`
- Browser `Web Audio API`
- Browser `localStorage`

## Current Features

- Boot, menu, gameplay, and game-over scene flow
- Procedural bird, pipes, ground, and layered background art
- Score tracking and best-score persistence
- Pause button and `P` key pause toggle
- Incremental difficulty based on score
- Lightweight procedural sound effects
- Responsive canvas mounting for desktop and mobile browsers

## Project Structure

```text
src/
├─ app/
│  ├─ game.js
│  └─ gameConfig.js
├─ features/
│  ├─ bird/
│  │  └─ Bird.js
│  ├─ difficulty/
│  │  └─ getDifficultySettings.js
│  ├─ pipes/
│  │  └─ PipeManager.js
│  ├─ scoring/
│  │  └─ ScoreDisplay.js
│  ├─ ui/
│  │  └─ PauseControl.js
│  └─ world/
│     └─ createWorld.js
├─ scenes/
│  ├─ BootScene.js
│  ├─ MenuScene.js
│  ├─ GameScene.js
│  └─ GameOverScene.js
├─ services/
│  ├─ audio.js
│  └─ storage.js
├─ shared/
│  └─ constants/
│     └─ game.js
├─ main.js
└─ styles.css
```

## Getting Started

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Controls

- `Click` or `Space`: start / flap / restart
- `P`: pause or resume during gameplay
- Pause button: pause or resume during gameplay

## Architecture Summary

- `src/main.js` mounts a single Phaser game instance into `index.html`.
- `src/app/gameConfig.js` defines renderer, scale, physics, and scene registration.
- `src/scenes/*` handle screen flow and user-facing lifecycle transitions.
- `src/features/*` contains gameplay modules such as bird movement, pipes, score HUD, pause UI, difficulty scaling, and world rendering.
- `src/services/*` wraps browser APIs like audio and storage.
- `src/shared/constants/game.js` centralizes gameplay and tuning constants.

The detailed architecture diagram lives in [docs/architecture.md](docs/architecture.md).

## Documentation

- [docs/README.md](docs/README.md)
- [docs/architecture.md](docs/architecture.md)
- [docs/development.md](docs/development.md)
- [docs/gameplay-systems.md](docs/gameplay-systems.md)
- [docs/module-reference.md](docs/module-reference.md)
- [docs/troubleshooting.md](docs/troubleshooting.md)

## Scene Flow

1. `BootScene` creates procedural textures and advances to the menu.
2. `MenuScene` shows the start screen and routes the player into gameplay.
3. `GameScene` runs the main loop, collisions, scoring, pause, and difficulty progression.
4. `GameOverScene` displays score summary and routes the player back into a new run.

## Notes

- Best score is stored in browser `localStorage`.
- Audio is procedural, so no external sound files are required.
- Difficulty is score-driven and applied through a dedicated feature module instead of being hard-coded into the main scene.
