import express from "express";
import cors from "cors";
import { z } from "zod";
import { generateArtifacts } from "./generator.js";
import { diagnoseBuildLog } from "./diagnostics.js";
import { generateWithAI } from "./ai.js";

const app = express();
const port = Number(process.env.PORT || 8787);
app.use(cors({ origin: process.env.WEB_ORIGIN || "http://localhost:5173" }));
app.use(express.json({ limit: "128kb" }));

const requestSchema = z.object({
  idea: z.string().trim().min(8).max(6000),
  modName: z.string().trim().min(2).max(48).regex(/^[A-Za-z][A-Za-z0-9 _-]*$/),
  minecraftVersion: z.string().trim().min(3).max(24),
  loader: z.enum(["Forge", "NeoForge", "Fabric", "MCreator"]),
  detail: z.enum(["starter", "standard", "detailed"]).default("standard")
});

app.get("/api/health", (_req, res) => res.json({ ok: true, service: "mcreator-ai-copilot-api", aiConfigured: Boolean(process.env.AI_API_KEY) }));

app.post("/api/generate", async (req, res) => {
  const parsed = requestSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid generation request", details: parsed.error.flatten() });
  try {
    const fallback = generateArtifacts(parsed.data);
    const ai = await generateWithAI(parsed.data, fallback);
    res.json({ ...ai, generatedAt: new Date().toISOString() });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Generation failed";
    res.status(502).json({ error: message });
  }
});

app.post("/api/diagnose", (req, res) => {
  const schema = z.object({ log: z.string().min(1).max(50000) });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Provide a build log (up to 50 KB)." });
  res.json({ diagnoses: diagnoseBuildLog(parsed.data.log) });
});

app.listen(port, () => console.log(`MCreator AI Copilot API listening on http://localhost:${port}`));
