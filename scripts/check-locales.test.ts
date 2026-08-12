import { describe, expect, it } from "vitest";

import {
  isLocalePolicySource,
  localePolicyViolations,
} from "#scripts/check-locales";

describe("locale source policy", () => {
  it("allows the canonical locale contract and derived consumers", () => {
    expect(
      localePolicyViolations(
        "packages/contracts/src/locale.ts",
        'const Current = Schema.Literal("en", "id", "de");\nconst Historical = Schema.Literal("en", "id");'
      )
    ).toEqual([]);
    expect(
      localePolicyViolations(
        "packages/contracts/src/content.ts",
        'import { HistoricalAppLocaleSchema } from "#contracts/locale";\nconst ContentLocaleSchema = HistoricalAppLocaleSchema;'
      )
    ).toEqual([]);
  });

  it("rejects duplicated schema and TypeScript locale unions", () => {
    const file = "packages/example/src/locale.ts";
    const source = [
      'const Locale = Schema.Literal("en", "id", "de");',
      'const Union = Schema.Union(Schema.Literal("en"), Schema.Literal("id"));',
      'type LocaleCode = "en" | "id";',
    ].join("\n");

    expect(localePolicyViolations(file, source)).toEqual([
      `${file}:1: locale vocabulary must derive from the locale contract`,
      `${file}:2: locale vocabulary must derive from the locale contract`,
      `${file}:3: locale vocabulary must derive from the locale contract`,
    ]);
  });

  it("rejects hardcoded historical locale arrays and tuples", () => {
    const file = "packages/example/src/config.ts";
    const source = [
      'const locales = ["en", "id"] as const;',
      'type Locales = readonly ["en", "id"];',
    ].join("\n");

    expect(localePolicyViolations(file, source)).toEqual([
      `${file}:1: historical locale lists must derive from the named decoder`,
      `${file}:2: historical locale lists must derive from the named decoder`,
    ]);
  });

  it("excludes concrete test fixtures from repository enforcement", () => {
    expect(isLocalePolicySource("packages/example/src/source.ts")).toBe(true);
    expect(isLocalePolicySource("packages/example/src/source.test.ts")).toBe(
      false
    );
    expect(isLocalePolicySource("packages/example/test/fixture.ts")).toBe(
      false
    );
  });
});
