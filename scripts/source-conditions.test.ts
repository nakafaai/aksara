import { describe, expect, it } from "@effect/vitest";
import {
  sourceConditionFromConfig,
  sourceConditionViolations,
} from "#scripts/source-conditions";

describe("workspace source conditions", () => {
  it("derives the condition from TypeScript configuration", () => {
    expect(
      sourceConditionFromConfig(
        JSON.stringify({
          compilerOptions: { customConditions: ["aksara-source"] },
        })
      )
    ).toBe("aksara-source");
    expect(() => sourceConditionFromConfig("{}")).toThrow(
      "TypeScript config must own exactly one workspace source condition"
    );
    for (const invalid of [
      "[]",
      '{"compilerOptions":{"customConditions":[]}}',
      '{"compilerOptions":{"customConditions":[1]}}',
    ]) {
      expect(() => sourceConditionFromConfig(invalid)).toThrow(
        "TypeScript config must own exactly one workspace source condition"
      );
    }
  });

  it("requires source resolution before generated output", () => {
    const sourceFirst = JSON.stringify({
      exports: {
        "./content": {
          "aksara-source": "./src/content.ts",
          types: "./dist/content.d.ts",
        },
      },
    });
    const generatedFirst =
      '{"imports":{"#content":{"types":"./dist/content.d.ts","aksara-source":"./src/content.ts"}}}';

    expect(
      sourceConditionViolations(
        "packages/contracts/package.json",
        sourceFirst,
        "aksara-source"
      )
    ).toEqual([]);
    expect(
      sourceConditionViolations(
        "packages/contracts/package.json",
        generatedFirst,
        "aksara-source"
      )
    ).toEqual([
      "packages/contracts/package.json: imports/#content must put aksara-source first",
    ]);
    expect(
      sourceConditionViolations(
        "packages/contracts/package.json",
        "[]",
        "aksara-source"
      )
    ).toEqual([
      "packages/contracts/package.json: package manifest must be an object",
    ]);
    for (const validWithoutSourceCondition of [
      "{}",
      '{"imports":{"#content":"./dist/content.js"}}',
      '{"exports":{"./content":{"types":"./dist/content.d.ts"}}}',
    ]) {
      expect(
        sourceConditionViolations(
          "packages/contracts/package.json",
          validWithoutSourceCondition,
          "aksara-source"
        )
      ).toEqual([]);
    }
  });

  it("checks nested conditions and fallback arrays", () => {
    const nestedGeneratedFirst =
      '{"exports":{".":{"node":{"types":"./dist/index.d.ts","aksara-source":"./src/index.ts"}}}}';
    const fallbackGeneratedFirst =
      '{"imports":{"#content":["./dist/content.js",{"types":"./dist/content.d.ts","aksara-source":"./src/content.ts"}]}}';

    expect(
      sourceConditionViolations(
        "packages/contracts/package.json",
        nestedGeneratedFirst,
        "aksara-source"
      )
    ).toEqual([
      "packages/contracts/package.json: exports/./node must put aksara-source first",
    ]);
    expect(
      sourceConditionViolations(
        "packages/contracts/package.json",
        fallbackGeneratedFirst,
        "aksara-source"
      )
    ).toEqual([
      "packages/contracts/package.json: imports/#content[1] must put aksara-source first",
    ]);
  });
});
