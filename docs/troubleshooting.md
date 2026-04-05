# Troubleshooting

## Game Does Not Render Correctly

Check:

- `src/styles.css` for mount sizing and canvas layout
- `src/app/gameConfig.js` for scale and renderer options
- Browser zoom level
- Browser extensions that may interfere with canvas rendering

## Audio Does Not Play

Likely causes:

- Browser blocked audio until a user gesture occurred
- Audio context is suspended
- Browser has aggressive privacy / autoplay restrictions

Check:

- Start the game with a click or key press before expecting sound
- `src/services/audio.js`

## Best Score Does Not Persist

Likely causes:

- Browser storage disabled
- Private browsing mode restrictions

Check:

- `src/services/storage.js`
- Browser `localStorage` permissions

## Pipe Collision Feels Wrong

Relevant files:

- `src/features/bird/Bird.js`
- `src/features/pipes/PipeManager.js`
- `src/shared/constants/game.js`

Common causes:

- Bird contact bounds too large or too small
- Top-pipe special collision logic too strict
- Pipe body width or vertical inset too forgiving

## Game Over Transition Crashes

Relevant files:

- `src/scenes/GameScene.js`
- `src/scenes/GameOverScene.js`
- `src/features/ui/PauseControl.js`

Common causes:

- Pause state not reset before scene transition
- Input handlers still attached during shutdown
- Delayed scene transition firing after invalid state changes

## Pause / Resume Issues

Relevant files:

- `src/scenes/GameScene.js`
- `src/features/ui/PauseControl.js`
- `src/features/pipes/PipeManager.js`

Check:

- Physics world pause / resume state
- Pipe spawn timer pause state
- Ground scroll speed reset after resume

## Difficulty Feels Too Harsh or Too Easy

Adjust:

- `PIPE_GAP`
- `PIPE_DISTANCE`
- `PIPE_SPEED`
- `PIPE_MIN_GAP`
- `PIPE_MIN_DISTANCE`
- `PIPE_MAX_SPEED`
- `DIFFICULTY_SCORE_STEP`
- `PIPE_GAP_STEP`
- `PIPE_DISTANCE_STEP`
- `PIPE_SPEED_STEP`

All of these live in `src/shared/constants/game.js`.

