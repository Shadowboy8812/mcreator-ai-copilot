import type { Artifact } from "./generator.js";
type Input = { idea: string; modName: string; minecraftVersion: string; loader: string; detail: string };
type Result = { title: string; mode: "template" | "ai"; summary: string; artifacts: Artifact[]; warnings: string[] };
export async function generateWithAI(input: Input, fallback: Result): Promise<Result> {
 const key = process.env.AI_API_KEY;
 if (!key) return fallback;
 const base = (process.env.AI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
 const model = process.env.AI_MODEL || "gpt-4.1-mini";
 const controller = new AbortController();
 const timeout = setTimeout(() => controller.abort(), 45000);
 try {
  const response = await fetch(`${base}/chat/completions`, {
   method: "POST", signal: controller.signal,
   headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/json" },
   body: JSON.stringify({ model, temperature: 0.2, response_format: { type: "json_object" }, messages: [
    { role: "system", content: "You are a careful Minecraft modding assistant. Return only JSON with keys title, summary, artifacts, warnings. artifacts must be an array of objects with path, language, content, description. Generate planning/specification assets and conservative code examples only; never claim code was compiled or tested. Do not create paths outside the project bundle. Keep paths relative and use safe filenames. Make Minecraft and loader version compatibility caveats explicit." },
    { role: "user", content: JSON.stringify(input) }
   ] })
  });
  if (!response.ok) throw new Error(`AI provider returned HTTP ${response.status}`);
  const data = await response.json() as any;
  const raw = data?.choices?.[0]?.message?.content;
  if (typeof raw !== "string") throw new Error("AI provider returned an empty response");
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed.artifacts) || parsed.artifacts.length > 30) throw new Error("AI response had an invalid artifact list");
  const safe = parsed.artifacts.map((a: any) => {
   if (!a || typeof a.path !== "string" || typeof a.content !== "string" || a.content.length > 50000) throw new Error("AI returned an invalid artifact");
   const path = a.path.replace(/\\/g, "/");
   if (path.startsWith("/") || path.split("/").some((part: string) => part === ".." || part === "." || !part)) throw new Error("AI returned an unsafe artifact path");
   return { path, content: a.content, language: String(a.language || "text").slice(0, 30), description: String(a.description || "").slice(0, 240) };
  });
  return { title: String(parsed.title || input.modName).slice(0, 100), summary: String(parsed.summary || "AI-generated starter bundle; review before use.").slice(0, 1000), artifacts: safe, warnings: [...new Set([...(Array.isArray(parsed.warnings) ? parsed.warnings.map(String) : []), "AI-generated output has not been compiled or tested."])].slice(0, 12), mode: "ai" };
 } finally { clearTimeout(timeout); }
}
