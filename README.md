# MCreator AI Copilot

An AI-assisted workspace for designing Minecraft mods and generating starter assets for MCreator and related Java modding workflows.

> Early MVP: generation is scaffolding, not a guarantee of a compiling mod. Review generated code and test it in your target MCreator/Minecraft version.

## Features

- Describe a mod idea and generate a structured artifact bundle.
- Choose a Minecraft version and mod loader.
- Inspect generated files and export them as a ZIP.
- Diagnose common Java/Gradle build errors.
- Optional server-side OpenAI-compatible model integration.
- Separate Java plugin scaffold for future MCreator integration.

## Requirements

- Node.js 20+
- npm 10+

## Quick start

```bash
npm install
cp .env.example .env
npm run dev
```

The API runs on `http://localhost:8787` and the Vite web app on `http://localhost:5173`.

For AI generation, set `AI_BASE_URL`, `AI_API_KEY`, and `AI_MODEL` in `.env`. The key must remain server-side; never put it in frontend variables.

## Project layout

- `apps/web` — React + Vite frontend
- `apps/api` — Node API, generator, diagnostics, AI adapter
- `packages/core` — shared validation and artifact helpers
- `plugin` — MCreator Java plugin scaffold (not yet installable)
- `docs` — architecture and roadmap

## Current limitations

- Generated artifacts are starter templates and must be reviewed and tested.
- MCreator plugin APIs vary by release; the plugin is not yet connected to MCreator's extension points.
- Full end-to-end build verification is pending.

See [the roadmap](docs/ROADMAP.md) and [architecture](docs/ARCHITECTURE.md).
