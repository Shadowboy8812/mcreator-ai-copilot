# Architecture

- apps/web: React/Vite UI. API calls use same-origin /api paths.
- apps/api: Express service with Zod validation, deterministic generator, optional server-side model provider, and build-log diagnostic rules.
- plugin: Java scaffold reserved for a version-pinned MCreator integration.

## Generation path
1. Validate the request and enforce payload limits.
2. Create deterministic baseline files so the app works without a provider key.
3. If AI_API_KEY exists, request structured artifacts from the configured provider.
4. Validate artifact count, content size, and relative paths before returning output.
5. Label model output as uncompiled and untested.

## Security notes
- Provider credentials are read only by the API process.
- JSON request size is capped at 128 KB; build logs are capped at 50 KB.
- Artifact paths reject absolute paths and dot/dot-dot segments.
- This is an early local-first MVP. Add authentication and rate limiting before public deployment.
