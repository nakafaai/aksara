import { describe, expect, it } from "vitest";
import {
  documentationViolations,
  missingDocumentation,
} from "#scripts/check-docs";

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

describe("JSDoc policy", () => {
  it("accepts every supported documented callable shape", () => {
    expect(missingDocumentation("documented.ts", documentedSource)).toEqual([]);
  });

  it("reports named callables without meaningful prose", () => {
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
      missingDocumentation("missing.ts", source)
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
  });

  it("aggregates diagnostics across source readers", () => {
    expect(
      documentationViolations(["one.ts", "two.ts"], (file) =>
        file === "one.ts" ? "export function missing() {}" : documentedSource
      )
    ).toEqual(["one.ts:1 missing"]);
  });
});
