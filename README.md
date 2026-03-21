# Figure Skating Skills Tracker

A Progressive Web App (PWA) for tracking figure skating skill progression, built with Vue 3, PrimeVue, and Pinia.

## Features

- **Skill Selection**: Hierarchical selection of skills, variants, types, and options
- **Progress Tracking**: 6-level rating system (0-5 stars)
  - 0: Never attempted
  - 1: Attempted
  - 2: Can do consistently
  - 3: Clean
  - 4: Can do within a sequence
  - 5: Mastered
- **Offline Support**: Full offline functionality via service worker
- **Local Storage**: Progress automatically saved to browser's local storage
- **Dark Mode**: Auto-detects system preference with manual toggle
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **PrimeVue** - UI component library with Aura theme
- **Pinia** - State management with localStorage persistence
- **Vite** - Fast build tool and dev server
- **vite-plugin-pwa** - PWA functionality with offline support

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── Header.vue          # App header with dark mode toggle
│   │   ├── Footer.vue          # App footer
│   │   ├── SkillSelector.vue   # Skill selection dropdowns
│   │   ├── StarRating.vue      # Vertical star rating component
│   │   └── ProgressDisplay.vue # Progress display panel
│   ├── stores/
│   │   └── skills.js           # Pinia store for skill data
│   ├── App.vue                 # Main app component
│   ├── main.js                 # App entry point
│   └── style.css               # Global styles
├── public/
│   ├── manifest.json           # PWA manifest
│   └── favicon.svg             # App icon
├── skills.json                 # Figure skating skills data
├── vite.config.js              # Vite configuration
└── package.json                # Dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

1. **Select a Skill**: Choose from available skills (one-foot turns, two-feet turns, jumps, spins)
2. **Choose Variants**: Select direction, edge, and other variant options
3. **Pick a Type**: Choose the specific type of skill (e.g., twizzle, three, bracket)
4. **Set Options**: Select specific options like rotation count (for twizzles)
5. **Rate Progress**: Click on the appropriate star level to record your progress
6. **View Overview**: Check your progress summary at the bottom of the page

## PWA Installation

The app can be installed as a standalone application:

- **Desktop**: Click the install icon in the browser address bar
- **Mobile**: Use the browser's "Add to Home Screen" option

Once installed, the app works completely offline.

## Data Persistence

All progress is automatically saved to the browser's local storage. Your data will persist between sessions but is stored locally on your device only.

## Skills Data

The skills are defined in `skills.json` with the following structure:

```json
{
  "skill-name": {
    "variants": [["option1", "option2"], ...],
    "types": ["type1", "type2", {"name": "type3", "variants": [...]}]
  }
}
```

## License

MIT
