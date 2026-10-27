# MCreator AI Copilot

An AI-assisted workspace for planning Minecraft mods and generating starter artifacts for MCreator and Java modding workflows.

> Early MVP. The generator creates planning/specification assets; it does not yet produce a guaranteed compiling mod or an installable MCreator plugin.

## Current features
- Responsive web workspace for mod ideas and target versions.
- Deterministic starter generation that works without an AI key.
- Optional OpenAI-compatible AI generation through server-side configuration.
- Java/Gradle build-log diagnosis for common errors.
- ZIP bundle export with individual generated files and metadata.
- Input validation and relative-path safety checks.

## Requirements
- Node.js 20+
- npm 10+

## Quick start
```bash
npm install
cp .env.example .env
npm run dev
```

The API runs on http://localhost:8787 and the Vite app on http://localhost:5173.

For AI generation, set AI_BASE_URL, AI_API_KEY, and AI_MODEL in the server-side .env. Never place provider secrets in frontend variables.

## Layout
- apps/web — React + Vite frontend
- apps/api — Express API, generator, diagnostics, optional AI provider
- packages/core — shared artifact validation helpers
- plugin — documentation/scaffold for future native integration
- docs — architecture and roadmap

## Known limitations
- The export is JSON today; ZIP export is planned.
- AI artifacts are uncompiled and untested until the user verifies them.
- MCreator APIs vary by release; the native plugin is not implemented yet.
- Full build verification is pending.

See docs/ROADMAP.md and docs/ARCHITECTURE.md.
