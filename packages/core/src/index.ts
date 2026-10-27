export type ArtifactInput = { path: string; content: string; language?: string; description?: string };
export function validateRelativeArtifactPath(input: string): string {
  if (typeof input !== "string" || !input.trim()) throw new Error("Artifact path is required");
  const normalized = input.replace(/\\/g, "/");
  if (normalized.startsWith("/") || /^[A-Za-z]:/.test(normalized)) throw new Error("Absolute artifact paths are not allowed");
  const segments = normalized.split("/");
  if (segments.some(segment => !segment || segment === "." || segment === "..")) throw new Error("Unsafe artifact path segment");
  if (normalized.length > 180) throw new Error("Artifact path is too long");
  return normalized;
}
export function validateArtifact(input: ArtifactInput): ArtifactInput {
  const path = validateRelativeArtifactPath(input.path);
  if (typeof input.content !== "string" || input.content.length > 50000) throw new Error("Artifact content must be a string up to 50 KB");
  return { ...input, path };
}
