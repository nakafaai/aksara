import { expect, layer } from "@effect/vitest";
import {
  TypeScriptParser,
  TypeScriptSourceError,
} from "@nakafa/aksara-utilities/typescript/parse";
import { Effect } from "effect";
import { countModuleLines, lineViolations } from "#scripts/check/lines";

layer(TypeScriptParser.layer)("line policy", (it) => {
  it.effect(
    "excludes JSDoc-only lines while retaining mixed source lines",
    () =>
      Effect.gen(function* () {
        const source = `/**
 * Explains one callable clearly.
 */
export function documented() {}
/** Inline prose. */ export const value = 1;
`;

        expect(yield* countModuleLines("source.ts", source)).toBe(2);
      })
  );

  it.effect("handles empty and unterminated source text", () =>
    Effect.gen(function* () {
      expect(yield* countModuleLines("empty.ts", "")).toBe(0);
      expect(yield* countModuleLines("source.ts", "const value = 1;")).toBe(1);
    })
  );

  it.effect("reports only modules above the 300-line limit", () =>
    Effect.gen(function* () {
      const sources = new Map([
        ["allowed.ts", `${"value;\n".repeat(300)}`],
        ["large.ts", `${"value;\n".repeat(301)}`],
      ]);

      expect(
        yield* lineViolations(
          [...sources.keys()],
          (file) => sources.get(file) ?? ""
        )
      ).toEqual(["large.ts: 301 lines"]);
    })
  );
  it.effect("preserves source-reader failures", () =>
    Effect.gen(function* () {
      const cause = new Error("test source is unreadable");
      const failure = yield* lineViolations(["unreadable.ts"], () => {
        throw cause;
      }).pipe(Effect.flip);
      expect(failure).toEqual(
        new TypeScriptSourceError({ cause, fileName: "unreadable.ts" })
      );
    })
  );
});
