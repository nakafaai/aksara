import assert from "node:assert/strict";
import { Array as Arr, Option, pipe, Record as Rec, Schema } from "effect";
import { parseDocument } from "yaml";

const StepSchema = Schema.StructWithRest(
  Schema.Struct({
    env: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    run: Schema.optional(Schema.String),
    uses: Schema.optional(Schema.String),
    with: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)]
);

const JobSchema = Schema.StructWithRest(
  Schema.Struct({
    environment: Schema.optional(Schema.String),
    if: Schema.optional(Schema.String),
    needs: Schema.optional(
      Schema.Union([Schema.String, Schema.Array(Schema.String)])
    ),
    outputs: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    permissions: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    steps: Schema.Array(StepSchema),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)]
);

const WorkflowSchema = Schema.StructWithRest(
  Schema.Struct({
    defaults: Schema.optional(Schema.Unknown),
    env: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    jobs: Schema.Record(Schema.String, JobSchema),
    permissions: Schema.Record(Schema.String, Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)]
);

export type WorkflowJob = typeof JobSchema.Type;

const SHELL_COMMENT = /(^|[ \t])#.*$/u;

/** Removes disabled shell comments from one decoded program. */
export function executableSource(run: string | undefined) {
  return pipe(
    (run ?? "").split("\n"),
    Arr.map((line) => line.replace(SHELL_COMMENT, "$1").trimEnd()),
    Arr.filter((line) => line.trim().length > 0),
    Arr.join("\n")
  );
}

/** Renders one declared step value as the workflow text it carries. */
function declaredText(value: unknown): string {
  return `${value ?? ""}`;
}

/** Collects executable and declarative fields from one step. */
function stepSource(step: WorkflowJob["steps"][number]) {
  const values = [
    executableSource(step.run),
    step.uses,
    ...Arr.flatten(Rec.toEntries(step.env ?? {})),
    ...Arr.flatten(Rec.toEntries(step.with ?? {})),
  ];
  return pipe(
    values,
    Arr.filter((value) => value !== undefined),
    Arr.map(declaredText),
    Arr.join("\n")
  );
}

/** Collects bounded source from one decoded workflow job. */
export function jobSource(job: WorkflowJob) {
  return Arr.join(Arr.map(job.steps, stepSource), "\n");
}

/** Decodes one exact workflow while preserving security-relevant properties. */
export function decodeWorkflow(source: string) {
  const document = parseDocument(source);
  assert.equal(
    document.errors.length,
    0,
    document.errors[0]?.message ?? "Workflow YAML must parse"
  );
  const decoded = Schema.decodeUnknownOption(WorkflowSchema)(document.toJS());
  assert.ok(Option.isSome(decoded), "Workflow must contain decodable jobs");
  return decoded.value;
}

/** Reports whether one job owns exactly the expected dependencies. */
export function exactNeeds(job: WorkflowJob, expected: readonly string[]) {
  const needs = Arr.isArray(job.needs)
    ? job.needs
    : Arr.filter([job.needs], (need) => need !== undefined);
  return (
    needs.length === expected.length &&
    Arr.every(expected, (need) => needs.includes(need))
  );
}
