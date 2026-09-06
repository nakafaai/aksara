import { expect, layer } from "@effect/vitest";
import {
  TypeScriptParser,
  TypeScriptSourceError,
} from "@nakafa/aksara-utilities/typescript/parse";
import { Effect } from "effect";
import {
  documentationViolations,
  missingDocumentation,
} from "#scripts/check/docs";

const documentedSource = `
/** Explains this named function. */
export function documented() {}

/** Defines one named arrow. */
export const arrow = () => 1;

/** Builds one named function. */
export const expression = function () {};

/** Traces one named effect. */
export const program = Effect.fn("program")(() => Effect.void);

class Service {
  /** Creates one service instance. */
  constructor() {}

  /** Reads one service value. */
  method() {}

  /** Reads one computed value. */
  get value() { return 1; }

  /** Writes one computed value. */
  set value(next: number) {}

  /** Runs one property callback. */
  callback = () => 1;
}

interface Port {
  /** Loads one port value. */
  load(): void;

  /** Runs one port callback. */
  readonly run: () => void;
}

const object = {
  /** Runs one object effect. */
  task: Effect.fn("task")(() => Effect.void),
  value: 1,
};
`;

layer(TypeScriptParser.layer)("JSDoc policy", (it) => {
  it.effect("accepts every supported documented callable shape", () =>
    Effect.gen(function* () {
      expect(
        yield* missingDocumentation("documented.ts", documentedSource)
      ).toEqual([]);
    })
  );

  it.effect("reports named callables without meaningful prose", () =>
    Effect.gen(function* () {
      const source = `
/**
 * Two words.
 * @returns ignored
 */
export function shallow() {}
export const arrow = () => 1;
export const expression = function () {};
export const program = Effect.fn("program")(() => Effect.void);
class Service {
  constructor() {}
  method() {}
  get value() { return 1; }
  set value(next: number) {}
  callback = () => 1;
}
interface Port {
  load(): void;
  readonly run: () => void;
}
const object = { task: Effect.fn("task")(() => Effect.void) };
`;

      expect(
        (yield* missingDocumentation("missing.ts", source))
          .map((diagnostic) => diagnostic.split(" ").at(-1))
          .sort()
      ).toEqual([
        "arrow",
        "callback",
        "constructor",
        "expression",
        "load",
        "method",
        "program",
        "run",
        "shallow",
        "task",
        "value",
        "value",
      ]);
    })
  );

  it.effect("aggregates diagnostics across source readers", () =>
    Effect.gen(function* () {
      expect(
        yield* documentationViolations(["one.ts", "two.ts"], (file) =>
          file === "one.ts" ? "export function missing() {}" : documentedSource
        )
      ).toEqual(["one.ts:1 missing"]);
    })
  );
  it.effect("preserves source-reader failures", () =>
    Effect.gen(function* () {
      const cause = new Error("test source is unreadable");
      const failure = yield* documentationViolations(["unreadable.ts"], () => {
        throw cause;
      }).pipe(Effect.flip);
      expect(failure).toEqual(
        new TypeScriptSourceError({ cause, fileName: "unreadable.ts" })
      );
    })
  );
});
