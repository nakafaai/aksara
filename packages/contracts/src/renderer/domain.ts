import { Schema } from "effect";

/** Renderer domains backed by real route-owned Nakafa registries. */
export const RENDERER_DOMAINS = [
  "ai-ds",
  "biology",
  "chemistry",
  "mathematics",
  "physics",
  "politics",
  "snbt-general",
  "snbt-math",
  "snbt-plain",
  "snbt-quant",
  "tka-math",
] as const;

/** Exact route-domain identity carried by authored and compiled content. */
export const RendererDomainSchema = Schema.Literal(...RENDERER_DOMAINS);
export type RendererDomain = typeof RendererDomainSchema.Type;
