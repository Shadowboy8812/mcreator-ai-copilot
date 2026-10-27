import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const manifestPath = resolve(root, "plugin/src/main/resources/plugin.json");
const sourcePath = resolve(root, "plugin/src/main/java/dev/mcreator/aicopilot/MCreatorAICopilotPlugin.java");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

if (!manifest.id || !Array.isArray(manifest.supportedversions) || manifest.supportedversions.length === 0) {
  throw new Error("Plugin manifest must define an id and explicit supportedversions.");
}
if (manifest.javaplugin !== "dev.mcreator.aicopilot.MCreatorAICopilotPlugin") {
  throw new Error("Plugin manifest entry point does not match the Java source.");
}
if (!existsSync(sourcePath)) throw new Error("Native plugin entry-point source is missing.");
const source = readFileSync(sourcePath, "utf8");
for (const required of [
  "extends JavaPlugin",
  "MCreatorLoadedEvent.class",
  "getMainMenuBar()",
  "getToolBar()",
  "http://127.0.0.1:8787/api/health",
  "http://localhost:5173/"
]) {
  if (!source.includes(required)) throw new Error(`Native plugin source is missing expected integration: ${required}`);
}
if (manifest.info?.name !== "MCreator AI Copilot") throw new Error("Unexpected plugin display name.");
console.log(`Plugin metadata/source validation passed (declared MCreator versions: ${manifest.supportedversions.join(", ")}). This is a static check, not a Java compilation.`);
