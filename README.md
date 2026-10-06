# Shitty App

Mobile-first React + Vite bowel movement journal. The entire interface is in English.

## Run

```sh
npm install
npm run dev
```

```sh
npm test
npm run build
```

Deploy the generated `dist/` directory to a static host. No backend or database is required.

## Architecture

- `src/App.jsx`: view navigation, application state, shared flows.
- `src/pages/`: calendar/day, grouped history, real-data statistics.
- `src/components/`: accessible native dialog, reusable entry cards, visual entry form.
- `src/services/stoolEntryStorage.js`: versioned storage, validation, CRUD, browser preferences.
- `src/utils/data.js`: stable option IDs, local date helpers, calendar and statistics.
- `src/styles.css`: responsive design, touch controls, safe-area handling, reduced motion.
- `tests/core.test.js`: calendar edge cases, storage CRUD, corruption, statistics and write errors.

Records use UUID identity, local `YYYY-MM-DD` dates, `HH:mm` time, stable selector IDs, optional notes and experience, and creation/update timestamps. Stored under `shitty-app:v1` as `{version:1, entries:[]}`. Preferences are separate. Invalid records are filtered and malformed payloads do not crash or get overwritten merely by reading.

The app includes create/edit/delete, multiple daily entries, calendar indicators, month persistence, today highlight, history detail views, live statistics, onboarding dismissal, privacy information and confirmed deletion of all entries. Data is private to each browser/origin. A manifest and SVG icon prepare installable layouts; offline caching/service worker and cross-device sync are not included. Fonts use Google Fonts with local system fallbacks; no entries are sent externally.

Stats count current-month entries through today, weeks start on Sunday, and average divides by elapsed days this month. A streak may end today or yesterday. Future entries can be logged and are omitted from current stats. Optional browser WebMCP exposes a read-only entry tool when supported.

## Restricted Windows build

If Vite reports spawn EPERM in a restricted environment, run .\build.ps1 to compile production assets directly. Then run node preview.mjs to serve http://127.0.0.1:5173. See VERIFICATION.md for completed checks and limitations.
