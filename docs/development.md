# Development Guide

## Stack

- Runtime: `Node.js`
- Bundler / dev server: `Vite`
- Game framework: `Phaser 3`
- Audio: browser `Web Audio API`
- Persistence: browser `localStorage`

## Local Setup

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build production assets:

```bash
npm run build
```

Preview the production bundle:

```bash
npm run preview
```

## Entry Points

- `index.html`
  Browser shell and mount point.

- `src/main.js`
  Frontend entry that mounts the Phaser game.

- `src/app/game.js`
  Creates a single Phaser game instance.

- `src/app/gameConfig.js`
  Centralizes renderer, scaling, physics, and scene registration.

## Development Workflow

1. Adjust constants in `src/shared/constants/game.js` for tuning changes.
2. Keep scene responsibilities thin and put reusable logic in `src/features/`.
3. Keep browser integration in `src/services/`.
4. Prefer procedural assets or generated visuals unless an external asset pipeline is introduced later.

## Code Organization Rules

- `scenes/` own screen flow and player-facing transitions.
- `features/` own reusable gameplay or UI behavior.
- `services/` wrap browser APIs or environment-dependent behavior.
- `shared/constants/` stores scene keys, dimensions, and tuning values.

## Notes For Future Contributors

- Difficulty scaling is score-driven, not time-driven.
- Pause and gameplay logic are coordinated inside `GameScene`.
- Audio is synthesized at runtime, so audio bugs may be browser-permission related rather than asset-loading related.
- Best score persistence depends on browser storage availability.

