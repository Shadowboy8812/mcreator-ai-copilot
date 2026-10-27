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
- [x] Add GitHub Actions workflow to compile against the MCreator source project and upload a plugin ZIP
- [ ] Confirm native build workflow passes and inspect the generated ZIP artifact
- [ ] Run the plugin in a clean MCreator 2026.3 installation
- [ ] Expand supported MCreator release list only after compatibility checks
- [ ] Integrate with MCreator 2026.3's local MCP interface for workspace-aware operations
- [ ] Add in-workspace generation/editing rather than opening the companion in a browser
- [ ] Publish a versioned installable plugin ZIP release

## Mod generation quality
- [ ] Version-aware prompts and artifact schemas
- [ ] Better support for MCreator, Forge, NeoForge, and Fabric workflows
- [ ] Target-specific build validation where a suitable toolchain is available
- [ ] Integration tests for generated artifacts in clean example workspaces

MCreator 2026.3 release notes describe an optional local MCP server and tools for mod-element creation/editing, workspace queries, templates, and troubleshooting. Prefer integrating with those supported local capabilities over brittle UI automation where practical.

Generated output is not production-ready until tested against each declared target version. Static plugin checks do not replace a Java build or an in-app smoke test.
