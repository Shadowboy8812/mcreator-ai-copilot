# MCreator AI Copilot

A local-first AI-assisted workspace for planning Minecraft mods and generating starter artifacts, with a native MCreator menu/toolbar bridge in development.

> Status: early MVP. The web/API build and automated tests pass in GitHub Actions. The native plugin source and metadata are now present, but a plugin ZIP has not yet been built against your exact local MCreator installation or tested inside MCreator.

## Current features
- Local React + Vite workspace for mod ideas and target versions.
- Deterministic starter generation without an AI key.
- Optional OpenAI-compatible AI generation using server-side environment variables.
- Java/Gradle build-log diagnosis for common errors.
- ZIP export of generated artifacts.
- Relative-path and request validation.
- Native MCreator Java plugin source with an AI Copilot menu/toolbar shortcut that checks the local companion API before opening the UI.
- CI checks for the web/API build, tests, and plugin metadata/source consistency.

## Requirements
- Node.js 20+
- npm 10+
- For native plugin development: the matching MCreator source Gradle project and a JDK compatible with that MCreator release.

## Run locally
```bash
npm install
cp .env.example .env
npm run dev
```

The API listens on http://127.0.0.1:8787 and the Vite app runs at http://localhost:5173. The API is intentionally not exposed to your LAN.

For AI generation, set `AI_BASE_URL`, `AI_API_KEY`, and `AI_MODEL` in the server-side `.env`. Never place provider secrets in frontend variables. The API key is for the configured provider and is separate from a ChatGPT subscription.

## Native MCreator plugin
See [plugin/README.md](plugin/README.md). The initial native bridge adds an **AI Copilot → Open AI Copilot** menu and toolbar action. It opens the local web workspace only after the companion API health endpoint responds. It does not yet inject code into an MCreator workspace or create mod elements automatically.

The plugin manifest currently declares MCreator 2026.3. MCreator plugin compatibility is release-specific, so support for other 2026.x releases must be verified against the exact installed release before changing the manifest.

## Layout
- `apps/web` — React + Vite frontend
- `apps/api` — Express API, generator, diagnostics, optional AI provider
- `packages/core` — shared artifact validation helpers
- `plugin` — native Java plugin bridge and build setup
- `docs` — architecture, roadmap, and test plan
- `scripts/validate-plugin.mjs` — static plugin metadata/source checks

## Known limitations
- The plugin has not yet been compiled against your local MCreator source tree or loaded in the MCreator UI.
- The companion currently opens in your browser; deeper MCreator workspace integration is future work.
- Generated mod artifacts are not automatically compiled or guaranteed to work.
- “All practical targets” means the generator can describe Forge, NeoForge, Fabric, and MCreator workflows; compatibility must still be checked per Minecraft and generator version.

See [docs/ROADMAP.md](docs/ROADMAP.md) and [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).
