import { Effect, Option, Record as Rec, Schema } from "effect";
import type { Document } from "yaml";
import { ensure, yamlData } from "#scripts/workflow/requirement";

/** The target choice of a dispatch: production by default, or either one, or both. */
const TargetInputSchema = Schema.Struct({
  default: Schema.Literal("production"),
  options: Schema.Tuple([
    Schema.Literal("production"),
    Schema.Literal("development"),
    Schema.Literal("both"),
  ]),
  required: Schema.Literal(true),
  type: Schema.Literal("choice"),
});

/** The part of a workflow that declares the target choice. */
const TargetDispatchSchema = Schema.Struct({
  on: Schema.Struct({
    workflow_dispatch: Schema.Struct({
      inputs: Schema.Struct({ target: TargetInputSchema }),
    }),
  }),
});

/**
 * The steps that refuse a bad dispatch, in the order they run, each with the
 * dispatch input that every environment variable of the step must read.
 */
const DISPATCH_GUARDS: ReadonlyArray<
  readonly [string, Readonly<Record<string, string>>]
> = [
  ["Validate target", { OPERATION: "operation", TARGET: "target" }],
  [
    "Validate operation",
    {
      OPERATION: "operation",
      RECOVERY_ID: "recovery_id",
      RELEASE_ID: "release_id",
      TARGET: "target",
    },
  ],
];

/** Verifies that a dispatch selects production, development, or both. */
export const verifyTargetChoice = Effect.fn("AksaraScripts.verifyTargetChoice")(
  function* (document: Document) {
    const value = yield* yamlData(document);
    yield* ensure(
      Option.isSome(Schema.decodeUnknownOption(TargetDispatchSchema)(value)),
      "The target input must offer exactly production, development, and both in that order, with production as the default"
    );
  }
);

/**
 * Verifies that the guards are the first steps of the contracts job, which every
 * other job needs, and that they run unconditionally and stop the job when they
 * fail. A bad dispatch then fails in seconds, before any checkout, verification
 * or credential.
 */
export const verifyDispatchGuards = Effect.fn(
  "AksaraScripts.verifyDispatchGuards"
)(function* (document: Document) {
  yield* Effect.forEach(
    DISPATCH_GUARDS,
    ([name, env], index) =>
      Effect.gen(function* () {
        const step = ["jobs", "contracts", "steps", index];
        yield* ensure(
          document.getIn([...step, "name"]) === name,
          `${name} must be step ${index + 1} of the contracts job, before any checkout or credential use`
        );
        yield* ensure(
          document.getIn([...step, "if"]) === undefined,
          `${name} must run unconditionally`
        );
        yield* ensure(
          document.getIn([...step, "continue-on-error"]) === undefined,
          `${name} must stop the job when it fails`
        );
        yield* Effect.forEach(
          Rec.toEntries(env),
          ([variable, input]) =>
            ensure(
              document.getIn([...step, "env", variable]) ===
                `\${{ inputs.${input} }}`,
              `${name} must read the dispatched ${input}`
            ),
          { discard: true }
        );
      }),
    { discard: true }
  );
});
