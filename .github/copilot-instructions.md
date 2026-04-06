# Copilot Instructions — Labbkarta

## Commands

```bash
npm run dev      # Start dev server (http://localhost:5173/labbkarta/)
npm run build    # TypeScript check + Vite production build
npm run lint     # ESLint
npm run preview  # Serve the production build locally
```

No test framework is configured. Verify changes with `npm run build`.

## Architecture

Single-page React app (Vite + TypeScript) showing an interactive Leaflet map of 340 European anatomical pathology laboratories. All lab data lives in a static JSON file — there is no backend.

**Data flow:** `public/data/labs.json` → `useLabData` hook (fetch) → `useFilters` hook (filter/search state) → components render filtered results. Filter state is synced to URL search params via `useUrlState` so views are shareable.

**Key state:** `App.tsx` owns three pieces of shared state — `filters` (from `useFilters`), `selectedLab`, and `sidebarOpen` — and passes them down to `Sidebar`, `LabMap`, and `LabDetailPanel`.

**Component areas:**
- `components/Map/` — Leaflet map, markers (color-coded by digitization level), clustering, tile switcher, legend
- `components/Sidebar/` — Search, filter checkboxes, stats dashboard, virtualized lab list, export buttons
- `components/LabDetail/` — Slide-in detail panel with lab info + nearby labs (Haversine distance)

## Key Conventions

### Lab Data (`public/data/labs.json`)
- The `Lab` interface in `src/types/lab.ts` is the single source of truth for the data schema. Every entry in `labs.json` must conform to it.
- `digitizationLevel` must be one of: `fully_digital`, `partial`, `pilot`, `planned`, `traditional`, `unknown`. The sub-agents that generated data previously introduced invalid values — always validate against the TypeScript union type.
- `type` must be one of: `academic`, `private_network`, `private_standalone`, `public_hospital`.
- `id` is kebab-case and must be unique across all entries.
- Labels and color mappings for enums are co-located in `src/types/lab.ts` (`DIGITIZATION_LABELS`, `DIGITIZATION_COLORS`, `LAB_TYPE_LABELS`). If you add a new enum value, update all three maps.

### Styling
- Tailwind CSS v4 via the Vite plugin (`@tailwindcss/vite`). No `tailwind.config.js` — configuration is in `src/index.css` using `@import "tailwindcss"`.
- All styling is utility classes in JSX. No CSS modules or styled-components.

### Map
- Leaflet + react-leaflet + react-leaflet-cluster. Markers use `L.divIcon` (colored circles), not image icons.
- The tile layer is swappable (OSM / CartoDB Positron / Dark Matter) via `TileSelector` and persisted in `localStorage`.
- `base` in `vite.config.ts` is set to `/labbkarta/` for GitHub Pages deployment.

### Hooks Pattern
- `useLabData` — async fetch of the JSON file, returns `{ labs, loading, error }`
- `useFilters` — all filter logic, accepts optional `initialOverrides` from URL params
- `useUrlState` — syncs filter state + selected lab to URL search params via `replaceState`

### Adding New Labs
Edit `public/data/labs.json` directly. Use accurate city-level coordinates. Ensure `id` is unique and all enum fields use valid values.

### GitHub Pages
Deployed automatically on push to `main` via `.github/workflows/deploy.yml`. The `base: '/labbkarta/'` in Vite config is required for correct asset paths.
