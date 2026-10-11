import assert from "node:assert/strict";
import { data, Evaluator, Lexer, Parser } from "@actions/expressions";
import { truthy } from "@actions/expressions/result";
import { Array as Arr, Option, Order, Record as Rec, Schema } from "effect";
import { parseDocument } from "yaml";

const EXPRESSION_PATTERN = /^\$\{\{\s*([\s\S]*?)\s*\}\}$/u;
const PLAN_CONTEXTS = ["github", "inputs", "needs"];
const PAIRED_ACCEPTANCE_STEP = "Verify paired acceptance";
const PAIRED_OPERATIONS = ["release", "accept"];
const TERMINAL_OPERATIONS = ["recover", "abort", "cleanup"];
const SINGLE_TARGETS = ["production", "development"];

/** The operation and the target that an operator picks for one dispatch. */
const DispatchSchema = Schema.Struct({
  operation: Schema.String,
  target: Schema.String,
});
type Dispatch = typeof DispatchSchema.Type;

/** What a dispatch starts: the target legs, the paired acceptance, and the final parity job. */
const PlanSchema = Schema.Struct({
  legs: Schema.Array(Schema.String),
  pairedAcceptance: Schema.Boolean,
  parity: Schema.Boolean,
});
type Plan = typeof PlanSchema.Type;

/** The facts of one run that the plan expressions of the release workflow read. */
const RunSchema = Schema.Struct({
  ...DispatchSchema.fields,
  operateResult: Schema.String,
  ref: Schema.String,
  repository: Schema.String,
});
type Run = typeof RunSchema.Type;

/** The parts of the release workflow that decide what a dispatch starts. */
const PlannedWorkflowSchema = Schema.Struct({
  jobs: Schema.Struct({
    operate: Schema.Struct({
      steps: Schema.Array(
        Schema.Struct({
          if: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
        })
      ),
      strategy: Schema.Struct({
        matrix: Schema.Struct({ target: Schema.String }),
      }),
    }),
    parity: Schema.Struct({ if: Schema.String }),
  }),
});

/** Every dispatch that the target guard lets through. */
export const ACCEPTED_DISPATCHES: readonly Dispatch[] = [
  ...Arr.flatMap(PAIRED_OPERATIONS, (operation) =>
    Arr.map([...SINGLE_TARGETS, "both"], (target) => ({ operation, target }))
  ),
  ...Arr.flatMap(TERMINAL_OPERATIONS, (operation) =>
    Arr.map(SINGLE_TARGETS, (target) => ({ operation, target }))
  ),
];

/**
 * Describes what the release decision says one dispatch starts: development and
 * production side by side, and their comparison, only when both are chosen.
 */
export function intendedPlan({ operation, target }: Dispatch): Plan {
  const both = target === "both";
  return {
    legs: both ? ["development", "production"] : [target],
    pairedAcceptance: both && operation === "accept",
    parity: both && Arr.contains(PAIRED_OPERATIONS, operation),
  };
}

/** Describes a dispatch that runs on main of the Aksara repository after a successful publication. */
export function mainRun(dispatch: Dispatch): Run {
  return {
    ...dispatch,
    operateResult: "success",
    ref: "refs/heads/main",
    repository: "nakafaai/aksara",
  };
}

/** Wraps one text value as the expression data GitHub Actions reads. */
function text(value: string) {
  return new data.StringData(value);
}

/** Wraps named values as one expression context. */
function context(fields: Readonly<Record<string, data.ExpressionData>>) {
  return new data.Dictionary(
    ...Arr.map(Rec.toEntries(fields), ([key, value]) => ({ key, value }))
  );
}

/** Evaluates one workflow expression with the evaluator that GitHub publishes. */
function evaluate(value: string, run: Run) {
  const expression = EXPRESSION_PATTERN.exec(value)?.[1] ?? value;
  const { tokens } = new Lexer(expression).lex();
  const parsed = new Parser(tokens, PLAN_CONTEXTS, []).parse();
  const contexts = context({
    github: context({ ref: text(run.ref), repository: text(run.repository) }),
    inputs: context({
      operation: text(run.operation),
      target: text(run.target),
    }),
    needs: context({ operate: context({ result: text(run.operateResult) }) }),
  });
  return new Evaluator(parsed, contexts).evaluate();
}

/** Lists the targets that a matrix expression evaluated to, in a fixed order. */
function legsOf(result: data.ExpressionData) {
  assert.ok(
    result.kind === data.Kind.Array,
    "The matrix must evaluate to a list of targets"
  );
  return Arr.sort(
    Arr.map(result.values(), (leg) => leg.coerceString()),
    Order.String
  );
}

/**
 * Evaluates the expressions that the release workflow declares for the matrix,
 * the paired acceptance, and the final parity job, as GitHub Actions would.
 */
export function workflowPlan(release: string, run: Run): Plan {
  const decoded = Schema.decodeUnknownOption(PlannedWorkflowSchema)(
    parseDocument(release).toJS()
  );
  assert.ok(
    Option.isSome(decoded),
    "The release workflow must declare the matrix, the paired acceptance, and the parity job"
  );
  const { operate, parity } = decoded.value.jobs;
  const pairedAcceptance = Arr.findFirst(
    operate.steps,
    (step) => step.name === PAIRED_ACCEPTANCE_STEP
  );
  assert.ok(
    Option.isSome(pairedAcceptance) && pairedAcceptance.value.if !== undefined,
    `${PAIRED_ACCEPTANCE_STEP} must declare when it runs`
  );
  return {
    legs: legsOf(evaluate(operate.strategy.matrix.target, run)),
    pairedAcceptance: truthy(evaluate(pairedAcceptance.value.if, run)),
    parity: truthy(evaluate(parity.if, run)),
  };
}
