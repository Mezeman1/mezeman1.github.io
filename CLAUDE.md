# mezeman1.github.io

Portfolio site for Mees Buschman — indie game developer.

## Stack

- Vue 3 + TypeScript
- Vite 6
- Tailwind CSS 3
- Vue Router 4 (hash history)

## Node

**Node 22 required.** Always run `nvm use 22` before any npm commands.

```bash
nvm use 22 && npm run dev
nvm use 22 && npm run build
```

## Pages

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | `src/pages/HomePage.vue` | Animated terminal intro |
| `/games` | `src/pages/GamesPage.vue` | Game listing |
| `/privacy` | `src/pages/PrivacyPage.vue` | Privacy policy |

## Theme

Console / terminal aesthetic. Colors defined in `tailwind.config.js` under `terminal.*`:

- `terminal-bg` — `#0a0a0a`
- `terminal-green` — `#00ff41`
- `terminal-dimgreen` — `#00b32c`
- `terminal-surface` — `#111111`
- `terminal-muted` — `#4a6a4a`

Font: `Share Tech Mono` (Google Fonts).
