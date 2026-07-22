import type { StaticValue } from "#compiler/normalize/value";

const COLOR_VALUES = new Map<string, string>([
  ["AMBER", "#d97706"],
  ["BLACK", "#000000"],
  ["BLUE", "#2563eb"],
  ["CYAN", "#0891b2"],
  ["EMERALD", "#059669"],
  ["FUCHSIA", "#c026d3"],
  ["GRAY", "#6b7280"],
  ["GREEN", "#16a34a"],
  ["INDIGO", "#4f46e5"],
  ["LIME", "#65a30d"],
  ["NEUTRAL", "#737373"],
  ["ORANGE", "#ea580c"],
  ["PINK", "#db2777"],
  ["PURPLE", "#9333ea"],
  ["RED", "#dc2626"],
  ["ROSE", "#e11d48"],
  ["SKY", "#0284c7"],
  ["SLATE", "#64748b"],
  ["STONE", "#78716c"],
  ["TEAL", "#0d9488"],
  ["VIOLET", "#7c3aed"],
  ["WHITE", "#ffffff"],
  ["YELLOW", "#ca8a04"],
  ["ZINC", "#71717a"],
]);

/**
 * Resolves the one-argument palette calls measured in the Nakafa corpus.
 * This migration snapshot mirrors `packages/design-system/lib/color.ts` at
 * Nakafa `7bbf91eb2898c610c5280e114641d5444c48c65b`.
 */
export function resolveColor(arguments_: readonly StaticValue[]) {
  const [color] = arguments_;
  if (arguments_.length !== 1 || typeof color !== "string") {
    return;
  }
  return COLOR_VALUES.get(color);
}
