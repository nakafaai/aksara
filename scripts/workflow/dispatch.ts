import assert from "node:assert/strict";
import { Array as Arr, Option, Record as Rec, Schema } from "effect";
import type { Document } from "yaml";

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

/** The commit a run publishes: optional, and required by the guard for a development release. */
const RevisionInputSchema = Schema.Struct({
  required: Schema.Literal(false),
  type: Schema.Literal("string"),
});

/** The part of a workflow that declares the target and revision choices. */
const DispatchInputsSchema = Schema.Struct({
  on: Schema.Struct({
    workflow_dispatch: Schema.Struct({
      inputs: Schema.Struct({
        revision: RevisionInputSchema,
        target: TargetInputSchema,
      }),
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
    "Validate revision",
    { OPERATION: "operation", REVISION: "revision", TARGET: "target" },
  ],
  ["Validate operation", {}],
];

/** Verifies that a dispatch selects production, development, or both, and may name its commit. */
function verifyDispatchInputs(document: Document): void {
  assert.ok(
    Option.isSome(
      Schema.decodeUnknownOption(DispatchInputsSchema)(document.toJS())
    ),
    "The target input must offer exactly production, development, and both in that order, with production as the default, and the revision input must be an optional string"
  );
}

/**
 * Verifies that the guards come first, run unconditionally, and stop the job
 * when they fail, so no dispatch reaches a checkout or a credential unchecked.
 */
function verifyDispatchGuards(document: Document): void {
  Arr.forEach(DISPATCH_GUARDS, ([name, env], index) => {
    const step = ["jobs", "operate", "steps", index];
    assert.equal(
      document.getIn([...step, "name"]),
      name,
      `${name} must be step ${index + 1} of the publication job, before any checkout or credential use`
    );
    assert.equal(
      document.getIn([...step, "if"]),
      undefined,
      `${name} must run unconditionally`
    );
    assert.equal(
      document.getIn([...step, "continue-on-error"]),
      undefined,
      `${name} must stop the job when it fails`
    );
    for (const [variable, input] of Rec.toEntries(env)) {
      assert.equal(
        document.getIn([...step, "env", variable]),
        `\${{ inputs.${input} }}`,
        `${name} must read the dispatched ${input}`
      );
    }
  });
}

/** Verifies what a dispatch may choose and the guards that refuse a bad choice. */
export function verifyDispatch(document: Document): void {
  verifyDispatchInputs(document);
  verifyDispatchGuards(document);
}
