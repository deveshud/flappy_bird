# Module Reference

## App Layer

### `src/main.js`

- Imports global styles
- Mounts the Phaser game into `#game-root`

### `src/app/game.js`

- Ensures only one Phaser game instance is created

### `src/app/gameConfig.js`

- Registers scenes
- Defines canvas size
- Configures scaling and renderer options
- Configures Arcade Physics

## Scene Layer

### `src/scenes/BootScene.js`

- Creates procedural textures for bird, pipes, and ground
- Shows a short boot screen
- Transitions to the menu

### `src/scenes/MenuScene.js`

- Renders the title screen
- Reads best score for display
- Starts the gameplay scene

### `src/scenes/GameScene.js`

- Owns the main gameplay loop
- Connects bird, pipes, HUD, pause, audio, and world modules
- Applies difficulty as the score increases
- Switches to game-over state on collision

### `src/scenes/GameOverScene.js`

- Displays score and best score
- Handles restart after a short delay

## Feature Layer

### `src/features/bird/Bird.js`

- Bird physics and visual tilt
- Utility collision bounds

### `src/features/pipes/PipeManager.js`

- Pipe pair spawning
- Score crossing detection
- Difficulty-aware speed and spacing
- Pause-safe spawn timer handling

### `src/features/scoring/ScoreDisplay.js`

- HUD card for score display
- Score increment animation

### `src/features/ui/PauseControl.js`

- Pause button UI
- Pause overlay
- Difficulty badge shown during pause

### `src/features/world/createWorld.js`

- Layered sky / hills / clouds
- Ground strip animation
- Shared environment rendering for multiple scenes

### `src/features/difficulty/getDifficultySettings.js`

- Converts score into gameplay tuning values

## Service Layer

### `src/services/audio.js`

- Manages shared `AudioContext`
- Unlocks audio after user interaction
- Synthesizes game sound effects

### `src/services/storage.js`

- Reads and writes best score
- Safely handles browsers where storage is blocked or unavailable

## Shared Layer

### `src/shared/constants/game.js`

- Scene keys
- World dimensions
- Physics tuning
- Pipe tuning
- Difficulty thresholds
- Restart timing

