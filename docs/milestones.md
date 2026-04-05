# Milestones

This document tracks project phases, current status, and likely next steps.

## Status Overview

| Phase | Title | Status |
| --- | --- | --- |
| Phase 1 | Playable Core Game | Completed |
| Phase 2 | Gameplay Feel Refinement | Planned |
| Phase 3 | Art And Visual Upgrade | Planned |
| Phase 4 | Audio Polish | Planned |
| Phase 5 | UI And UX Improvements | Planned |
| Phase 6 | Game Modes And Progression | Planned |
| Phase 7 | Persistence And Profile Features | Planned |
| Phase 8 | Technical Quality | Planned |
| Phase 9 | Deployment And Distribution | Planned |

## Phase 1: Playable Core Game

Status:
`Completed`

Delivered:

- Phaser + Vite project setup
- Boot, menu, gameplay, and game-over scene flow
- Bird movement and flap controls
- Pipe spawning and scoring
- Collision and restart loop
- Procedural visuals and environment layers
- Procedural sound effects
- Pause button and pause overlay
- Incremental difficulty scaling
- Project documentation set

## Phase 2: Gameplay Feel Refinement

Goal:
Make the core run feel tighter, fairer, and more replayable.

Candidate features:

- Fine-tune gravity, flap strength, and fall-speed curve
- Rebalance pipe gap and spacing progression
- Smooth bird rotation and recovery motion
- Review collision fairness for bird and pipes
- Improve pause/resume feel during active runs

## Phase 3: Art And Visual Upgrade

Goal:
Move from polished procedural placeholders toward a stronger final visual identity.

Candidate features:

- Replace procedural bird, pipes, and ground with custom art assets
- Add sprite animation for bird flapping
- Add pipe caps and richer obstacle detailing
- Add better parallax layers in the background
- Improve scene transitions with subtle animation and fades

## Phase 4: Audio Polish

Goal:
Make the audio feel more game-like and satisfying.

Candidate features:

- Replace procedural tones with curated sound assets
- Add background music for menu and gameplay
- Add separate hit, score, swoosh, and pause sounds
- Add mute/unmute control
- Add audio volume settings

## Phase 5: UI And UX Improvements

Goal:
Improve usability, readability, and presentation quality.

Candidate features:

- Add settings panel
- Add restart button on game-over screen
- Add high-score highlight animation
- Improve mobile touch affordances
- Add keyboard shortcut hints to menu and pause overlay

## Phase 6: Game Modes And Progression

Goal:
Introduce replay variety beyond the current endless mode.

Candidate features:

- Add easy / normal / hard difficulty presets
- Add challenge mode with tighter gaps
- Add timed survival mode
- Add medal or rank system based on score
- Add daily challenge seed

## Phase 7: Persistence And Profile Features

Goal:
Retain more player progress and session context.

Candidate features:

- Save last run summary
- Save settings and mute preference
- Save selected difficulty or mode
- Add stats such as total runs, best streak, and average score
- Add reset profile option

## Phase 8: Technical Quality

Goal:
Make the project easier to maintain and safer to extend.

Candidate features:

- Add test coverage for difficulty and scoring logic
- Add linting and formatting setup
- Extract more reusable UI helpers
- Add stronger runtime guards around browser APIs
- Improve documentation with screenshots and gameplay diagrams

## Phase 9: Deployment And Distribution

Goal:
Prepare the game for sharing publicly.

Candidate features:

- Add production deployment guide
- Add GitHub Pages or static hosting config
- Add web app metadata and icons
- Add social preview image
- Add versioned release notes

## Prioritized Next Suggestions

If the project continues from here, a practical order would be:

1. Finalize gameplay feel
2. Add custom art assets
3. Improve audio quality
4. Add settings and persistence
5. Prepare deployment
