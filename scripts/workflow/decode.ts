import assert from "node:assert/strict";
import { Option, Schema } from "effect";
import { parseDocument } from "yaml";

const StepSchema = Schema.Struct({
  env: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  run: Schema.optional(Schema.String),
  uses: Schema.optional(Schema.String),
  with: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
});

const JobSchema = Schema.Struct({
  environment: Schema.optional(Schema.String),
  if: Schema.optional(Schema.String),
  needs: Schema.optional(
    Schema.Union([Schema.String, Schema.Array(Schema.String)])
  ),
  outputs: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  permissions: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  steps: Schema.Array(StepSchema),
});

const WorkflowSchema = Schema.Struct({
  defaults: Schema.optional(Schema.Unknown),
  env: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  jobs: Schema.Record(Schema.String, JobSchema),
  permissions: Schema.Record(Schema.String, Schema.String),
});

export type WorkflowJob = Schema.Schema.Type<typeof JobSchema>;

const SHELL_COMMENT = /(^|[ \t])#.*$/u;

/** Removes disabled shell comments from one decoded program. */
export function executableSource(run: string | undefined) {
  return (run ?? "")
    .split("\n")
    .map((line) => line.replace(SHELL_COMMENT, "$1").trimEnd())
    .filter((line) => line.trim().length > 0)
    .join("\n");
}

/** Collects executable and declarative fields from one step. */
function stepSource(step: WorkflowJob["steps"][number]) {
  return [
    executableSource(step.run),
    step.uses,
    ...Object.entries(step.env ?? {}).flat(),
    ...Object.entries(step.with ?? {}).flat(),
  ]
    .filter((value) => value !== undefined)
    .join("\n");
}

/** Collects bounded source from one decoded workflow job. */
export function jobSource(job: WorkflowJob) {
  return job.steps.map(stepSource).join("\n");
}

/** Decodes one exact workflow while preserving security-relevant properties. */
export function decodeWorkflow(source: string) {
  const document = parseDocument(source);
  assert.equal(
    document.errors.length,
    0,
    document.errors[0]?.message ?? "npm workflow YAML must parse"
  );
  const decoded = Schema.decodeUnknownOption(WorkflowSchema, {
    onExcessProperty: "preserve",
  })(document.toJS());
  assert.ok(Option.isSome(decoded), "npm workflow must contain decodable jobs");
  return decoded.value;
}

/** Reports whether one job owns exactly the expected dependencies. */
export function exactNeeds(job: WorkflowJob, expected: readonly string[]) {
  const needs = Array.isArray(job.needs)
    ? job.needs
    : [job.needs].filter((need) => need !== undefined);
  return (
    needs.length === expected.length &&
    expected.every((need) => needs.includes(need))
  );
}
