# Architecture Diagram

This diagram shows how the Phaser app is bootstrapped, how scenes transition, and how gameplay modules collaborate during a run.

```mermaid
flowchart TD
    A[index.html] --> B[src/main.js]
    B --> C[src/app/game.js]
    C --> D[src/app/gameConfig.js]

    D --> E[BootScene]
    D --> F[MenuScene]
    D --> G[GameScene]
    D --> H[GameOverScene]

    E -->|creates textures, then start| F
    F -->|start game| G
    G -->|game over| H
    H -->|restart| G

    subgraph Gameplay["Gameplay Modules"]
        I[Bird]
        J[PipeManager]
        K[ScoreDisplay]
        L[PauseControl]
        M[getDifficultySettings]
        N[createWorld]
    end

    subgraph Services["Browser Services"]
        O[audio.js]
        P[storage.js]
    end

    subgraph Shared["Shared Config"]
        Q[shared/constants/game.js]
    end

    G --> I
    G --> J
    G --> K
    G --> L
    G --> M
    G --> N
    G --> O
    G --> Q

    F --> N
    F --> O
    F --> P
    F --> Q

    E --> Q
    H --> N
    H --> O
    H --> P
    H --> Q

    M --> J
    Q --> I
    Q --> J
    Q --> K
    Q --> L
    Q --> N
    P --> H
```

## Module Roles

### App Bootstrap

- `src/main.js`: browser entry point
- `src/app/game.js`: creates a single Phaser game instance
- `src/app/gameConfig.js`: registers scenes and engine config

### Scenes

- `BootScene`: prepares generated textures and forwards to the menu
- `MenuScene`: start screen and entry into gameplay
- `GameScene`: main loop, input, collisions, scoring, pause, and difficulty
- `GameOverScene`: score summary, best-score display, and restart flow

### Features

- `Bird`: player movement, tilt, and collision helper bounds
- `PipeManager`: pipe spawning, speed updates, collision assistance, and pause support
- `ScoreDisplay`: HUD score card and animation
- `PauseControl`: pause button and paused overlay
- `getDifficultySettings`: score-based tuning progression
- `createWorld`: layered environment art and animated ground/cloud motion

### Services

- `audio.js`: procedural SFX through Web Audio
- `storage.js`: best-score persistence via `localStorage`

### Shared Constants

- `shared/constants/game.js`: scene keys, physics values, dimensions, and difficulty tuning constants

