import { NodeServices } from "@effect/platform-node";
import { afterEach, expect, layer } from "@effect/vitest";
import {
  TypeScriptParser,
  TypeScriptSourceError,
} from "@nakafa/aksara-utilities/typescript/parse";
import {
  Array as Arr,
  Effect,
  FileSystem,
  Layer,
  Option,
  Order,
  Path,
} from "effect";
import {
  documentationReport,
  documentationViolations,
  missingDocumentation,
} from "#scripts/check/docs";

const originalExitCode = process.exitCode;

afterEach(() => {
  process.exitCode = originalExitCode;
  vi.restoreAllMocks();
});

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

layer(Layer.merge(TypeScriptParser.layer, NodeServices.layer))(
  "JSDoc policy",
  (it) => {
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

        const names = Arr.map(
          yield* missingDocumentation("missing.ts", source),
          (diagnostic) => Option.getOrThrow(Arr.last(diagnostic.split(" ")))
        );
        expect(Arr.sort(names, Order.String)).toEqual([
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
            Effect.succeed(
              file === "one.ts"
                ? "export function missing() {}"
                : documentedSource
            )
          )
        ).toEqual(["one.ts:1 missing"]);
      })
    );

    it.effect(
      "reports undocumented callables through the documentation report",
      () =>
        Effect.gen(function* () {
          const fileSystem = yield* FileSystem.FileSystem;
          const path = yield* Path.Path;
          const root = yield* fileSystem.makeTempDirectoryScoped({
            prefix: "aksara-docs-",
          });
          const undocumented = path.join(root, "undocumented.ts");
          yield* fileSystem.writeFileString(
            undocumented,
            "export function missing() {}"
          );
          const write = vi
            .spyOn(process.stderr, "write")
            .mockImplementation(() => true);

          yield* documentationReport([undocumented]);

          expect(write).toHaveBeenCalledWith(
            `Named callables require useful JSDoc:\n${undocumented}:1 missing\n`
          );
          expect(process.exitCode).toBe(1);
        })
    );

    it.effect("preserves source-reader failures", () =>
      Effect.gen(function* () {
        const cause = new Error("test source is unreadable");
        const failure = yield* documentationViolations(["unreadable.ts"], () =>
          Effect.fail(cause)
        ).pipe(Effect.flip);
        expect(failure).toEqual(
          new TypeScriptSourceError({ cause, fileName: "unreadable.ts" })
        );
      })
    );
  }
);
