import {
  Array as Arr,
  Effect,
  Option,
  Predicate,
  Record,
  Schema,
} from "effect";
import { parse } from "yaml";
import { ensure, WorkflowError } from "#scripts/workflow/requirement";

/** The environment one turbo task lets through: hashed names and passed-through names. */
const TurboTaskSchema = Schema.Struct({
  env: Schema.optionalKey(Schema.Array(Schema.String)),
  passThroughEnv: Schema.optionalKey(Schema.Array(Schema.String)),
});

/** The part of turbo.json this check reads: every task with its environment. */
const TurboConfigSchema = Schema.fromJsonString(
  Schema.Struct({ tasks: Schema.Record(Schema.String, TurboTaskSchema) })
);

/** The part of the publication workflow this check reads: each operate step's script and environment. */
const OperateStepsSchema = Schema.Struct({
  jobs: Schema.Struct({
    operate: Schema.Struct({
      steps: Schema.Array(
        Schema.Struct({
          env: Schema.optionalKey(Schema.Record(Schema.String, Schema.Unknown)),
          run: Schema.optionalKey(Schema.String),
        })
      ),
    }),
  }),
});

/** The variables the content operations own; turbo's strict mode drops any its task does not name. */
const OPERATION_VARIABLE = /^(?:AKSARA|NAKAFA)_[A-Z0-9_]+$/u;
const EXPORTED_VARIABLE = /^export ([A-Z][A-Z0-9_]*)=/gmu;
const TURBO_TASK = /\bbun run ([a-z][a-z-]*)\b/u;

/** The operation variables one step gives its command: its env keys and the names its script exports. */
function stepVariables(
  environment: Readonly<Record<string, unknown>>,
  run: string
) {
  const exported = Arr.filter(
    Arr.map([...run.matchAll(EXPORTED_VARIABLE)], (match) => match[1]),
    Predicate.isNotUndefined
  );
  return Arr.dedupe(
    Arr.filter([...Record.keys(environment), ...exported], (name) =>
      OPERATION_VARIABLE.test(name)
    )
  );
}

/**
 * Holds turbo.json to the publication workflow: turbo runs each content
 * operation in strict environment mode, so a variable that a step sets or
 * exports reaches the command only when that step's turbo task names it. A
 * missing name fails here instead of in production, where release h stopped at
 * the CLI's environment stage because `NAKAFA_DEPLOY_OUTPUT` never arrived.
 */
export const verifyTurboEnvironment = Effect.fn(
  "AksaraScripts.verifyTurboEnvironment"
)(function* (release: string, turbo: string) {
  const config = yield* Schema.decodeEffect(TurboConfigSchema)(turbo).pipe(
    Effect.mapError(
      () => new WorkflowError({ message: "turbo.json must declare its tasks" })
    )
  );
  const workflow = yield* Schema.decodeUnknownEffect(OperateStepsSchema)(
    parse(release)
  ).pipe(
    Effect.mapError(
      () =>
        new WorkflowError({
          message: "Publication must declare its operation steps",
        })
    )
  );
  for (const step of workflow.jobs.operate.steps) {
    const run = step.run ?? "";
    const task = Option.flatMap(
      Option.fromNullishOr(TURBO_TASK.exec(run)),
      (match) => Option.fromNullishOr(match[1])
    );
    const declared = Option.flatMap(task, (name) =>
      Record.get(config.tasks, name)
    );
    if (Option.isNone(task) || Option.isNone(declared)) {
      continue;
    }
    const allowed = [
      ...(declared.value.env ?? []),
      ...(declared.value.passThroughEnv ?? []),
    ];
    for (const name of stepVariables(step.env ?? {}, run)) {
      yield* ensure(
        Arr.contains(allowed, name),
        `The turbo task "${task.value}" must declare ${name}, which its workflow step passes`
      );
    }
  }
});
