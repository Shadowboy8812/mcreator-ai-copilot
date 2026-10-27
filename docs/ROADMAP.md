# Roadmap

## Local companion MVP
- [x] Responsive generation workspace
- [x] Deterministic starter artifact generation
- [x] Optional server-side OpenAI-compatible provider
- [x] Common Gradle/Java error diagnosis
- [x] ZIP export with per-file contents
- [x] Shared artifact path safety checks
- [x] CI build and automated tests for the web/API workspace
- [x] Bind the local API to loopback rather than all network interfaces
- [x] Static validation of native plugin metadata and entry-point wiring
- [ ] Provider configuration UI without exposing secrets
- [ ] Persistent project history
- [ ] Artifact schema and prompt evaluation
- [ ] Rate limiting, request IDs, structured logging

## Native MCreator integration
- [x] Add Java plugin entry point using the official DemoJavaPlugin pattern
- [x] Add MCreator menu and toolbar shortcut
- [x] Check companion API health and provide a useful not-running message
- [x] Add local build configuration and build/install instructions
- [ ] Compile plugin against the user's exact MCreator 2026.x source project
- [ ] Run the plugin in a clean MCreator installation
- [ ] Expand supported MCreator release list only after compatibility checks
- [ ] Add in-workspace generation/editing rather than opening the companion in a browser
- [ ] Publish an installable plugin ZIP release

## Mod generation quality
- [ ] Version-aware prompts and artifact schemas
- [ ] Better support for MCreator, Forge, NeoForge, and Fabric workflows
- [ ] Target-specific build validation where a suitable toolchain is available
- [ ] Integration tests for generated artifacts in clean example workspaces

Generated output is not production-ready until tested against each declared target version. Static plugin checks do not replace a Java build or an in-app smoke test.
