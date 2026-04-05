# Gameplay Systems

## Scene Flow

1. `BootScene`
   Generates procedural textures and forwards into the menu.

2. `MenuScene`
   Shows the title screen, best score, and start affordance.

3. `GameScene`
   Runs active gameplay: flap input, pipe spawning, scoring, collisions, pause, and difficulty progression.

4. `GameOverScene`
   Displays score summary and allows restart after a short lock.

## Player Input

- `Click` or `Space`
  Starts the run and makes the bird flap.

- `P`
  Toggles pause during active gameplay.

- Pause button
  Mouse / touch control for pause and resume.

## Bird System

The bird is managed by `src/features/bird/Bird.js`.

Responsibilities:

- Applies gravity and flap velocity
- Caps downward speed
- Smoothly rotates the sprite based on vertical velocity
- Exposes helper bounds for ceiling, ground, and top-pipe contact checks

## Pipe System

The pipe system is managed by `src/features/pipes/PipeManager.js`.

Responsibilities:

- Spawns pipe pairs
- Tracks active pipe movement
- Removes off-screen pipes
- Detects score events when the bird passes lower pipes
- Supports runtime difficulty changes
- Supports pause and resume without resetting the run

## Scoring

The score HUD lives in `src/features/scoring/ScoreDisplay.js`.

Behavior:

- Starts at `0`
- Increments when the bird fully passes a lower pipe
- Animates slightly on score change
- Best score is persisted separately through `storage.js`

## Pause System

The pause UI lives in `src/features/ui/PauseControl.js` and is orchestrated by `GameScene`.

When paused:

- Physics is paused
- Pipe movement is paused
- Pipe spawn timer is paused
- Ground motion is paused
- A paused overlay is shown

## Difficulty Progression

Difficulty is calculated by `src/features/difficulty/getDifficultySettings.js`.

As score increases:

- Pipe speed increases
- Pipe gap narrows
- Pipe spacing tightens

The progression is limited by min/max constants in `src/shared/constants/game.js`.

## Collision Model

The run ends when:

- The bird hits the ground
- The bird hits the ceiling
- The bird collides with a pipe
- The bird makes contact with the upper pipe through the stricter top-pipe contact logic

## Audio Feedback

Audio is handled by `src/services/audio.js`.

Current sound cues:

- Flap
- Score
- Hit
- Menu / restart swoosh

