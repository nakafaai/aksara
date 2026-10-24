import { Array as Arr, Effect, Option, Record as Rec, Schema } from "effect";
import { type Document, parseDocument } from "yaml";
import {
  ACCEPTED_DISPATCHES,
  intendedPlan,
  mainRun,
  samePlan,
  workflowPlan,
} from "#scripts/workflow/plan";
import { ensure, requireSeq, yamlData } from "#scripts/workflow/requirement";

const CONSUMER_PATTERN = /pnpm verify:consumer/u;
const OPERATION_PATTERN = /pnpm (?:release|accept|recover|abort|cleanup) --/u;
const SHARED_VALIDATION_PATTERN =
  /verify:[\s\S]*needs: contracts[\s\S]*Verify full publication revision[\s\S]*pnpm typecheck[\s\S]*pnpm test[\s\S]*pnpm build[\s\S]*operate:[\s\S]*needs\.verify\.result == 'success'/u;
const PARITY_PREFLIGHT_PATTERN =
  /Verify paired acceptance[\s\S]*pnpm parity --[\s\S]*Accept active release/u;
const PARITY_RESULT_PATTERN =
  /parity:\n[\s\S]*needs: operate[\s\S]*environment: content-production[\s\S]*Verify paired result[\s\S]*pnpm parity --/u;
const PRODUCTION_ENV_PATTERN = /environment: content-production/u;
const ISOLATED_OPERATION_PATTERN =
  /git worktree add --detach "\$OPERATION_ROOT" "\$GITHUB_SHA"[\s\S]*pnpm --dir "\$OPERATION_ROOT" install --frozen-lockfile[\s\S]*rev-parse --verify HEAD[\s\S]*status --porcelain=v1 --untracked-files=normal[\s\S]*working-directory: \$\{\{ runner\.temp \}\}\/aksara-operation/u;
const TERMINAL_GATE_PATTERN =
  /Verify terminal operation revision[\s\S]*pnpm exec turbo run typecheck test build[\s\S]*--filter=@nakafa\/aksara-contracts[\s\S]*--filter=@nakafa\/aksara-publisher[\s\S]*--filter=@nakafa\/aksara-cli[\s\S]*pnpm deprecations:audit/u;
const PUBLICATION_SCOPE_PATTERN =
  /scope:[\s\S]*PUBLICATION_SCOPE: \$\{\{ inputs\.scope \}\}[\s\S]*jq -e 'type == "array" and length > 0[\s\S]*mapfile -t SCOPE_SELECTORS[\s\S]*scope_args\+=\(--scope "\$selector"\)[\s\S]*"\$\{scope_args\[@\]\}"/u;
const CONTENT_CONTRACT_PATTERN =
  /contracts:[\s\S]*attestations: read[\s\S]*contents: read[\s\S]*fetch-depth: 0[\s\S]*pnpm --filter @nakafa\/aksara-contracts verify:consumer --output "\$TARBALL"[\s\S]*release\/command\.ts prove[\s\S]*--archive "\$CURRENT_ARCHIVE"[\s\S]*--repository "\$GITHUB_REPOSITORY"[\s\S]*--source-sha "\$GITHUB_SHA"[\s\S]*operate:[\s\S]*needs: \[contracts, verify\][\s\S]*needs\.contracts\.result == 'success'/u;
const OPERATION_HISTORY_PATTERN =
  /^ {2}operate:\n[\s\S]*?^ {6}- name: Checkout\n^ {8}uses: actions\/checkout@[^\n]+\n^ {8}with:\n(?:^ {10}[^\n]+\n)*^ {10}fetch-depth: 0\n(?:^ {10}[^\n]+\n)*(?:\n)?^ {6}- name: Setup toolchain$/mu;

/** The dispatch whose final parity job the blockers below must stop. */
const PAIRED_RELEASE = { operation: "release", target: "both" };

/** What must keep the final parity job from running, with the run facts that cause it. */
const PARITY_BLOCKERS = [
  ["after a failed publication", { operateResult: "failure" }],
  ["off main", { ref: "refs/heads/topic" }],
  ["outside the Aksara repository", { repository: "someone/aksara" }],
] as const;

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
  ["Validate operation", {}],
];

/** Verifies that a dispatch selects production, development, or both. */
const verifyTargetChoice = Effect.fn("AksaraScripts.verifyTargetChoice")(
  function* (document: Document) {
    const value = yield* yamlData(document);
    yield* ensure(
      Option.isSome(Schema.decodeUnknownOption(TargetDispatchSchema)(value)),
      "The target input must offer exactly production, development, and both in that order, with production as the default"
    );
  }
);

/**
 * Verifies, by evaluating the workflow expressions, that every dispatch starts
 * the legs, the paired acceptance, and the final parity its target calls for.
 */
const verifyPlans = Effect.fn("AksaraScripts.verifyPublicationPlans")(
  function* (release: string) {
    for (const dispatch of ACCEPTED_DISPATCHES) {
      const plan = yield* workflowPlan(release, mainRun(dispatch));
      yield* ensure(
        samePlan(plan, intendedPlan(dispatch)),
        `The ${dispatch.operation} on ${dispatch.target} must start only the legs, the paired acceptance, and the final parity that its target calls for`
      );
    }
    for (const [reason, change] of PARITY_BLOCKERS) {
      const plan = yield* workflowPlan(release, {
        ...mainRun(PAIRED_RELEASE),
        ...change,
      });
      yield* ensure(
        plan.parity === false,
        `The final parity must not run ${reason}`
      );
    }
  }
);

/**
 * Verifies that the guards are the first steps of the contracts job, which every
 * other job needs, and that they run unconditionally and stop the job when they
 * fail. A bad dispatch then fails in seconds, before any checkout, verification
 * or credential.
 */
const verifyDispatchGuards = Effect.fn("AksaraScripts.verifyDispatchGuards")(
  function* (document: Document) {
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
  }
);

/** Reports whether the contract proof step exists and finishes before production approval. */
function proofPrecedesProduction(release: string): boolean {
  const proofIndex = release.indexOf(
    "- name: Prove immutable contract release"
  );
  return (
    proofIndex >= 0 &&
    proofIndex < release.indexOf("environment: content-production")
  );
}

/** Verifies the target choice, isolated credentials, and recovery controls. */
export const verifyPublicationWorkflow = Effect.fn(
  "AksaraScripts.verifyPublicationWorkflow"
)(function* (release: string, all: readonly string[]) {
  yield* ensure(
    PRODUCTION_ENV_PATTERN.test(release),
    "Content operations must require production environment approval"
  );
  yield* ensure(
    CONSUMER_PATTERN.test(release),
    "Full content operations must prove the contracts release archive"
  );
  yield* ensure(
    CONTENT_CONTRACT_PATTERN.test(release),
    "Every content operation must depend on the exact immutable contract proof"
  );
  yield* ensure(
    OPERATION_HISTORY_PATTERN.test(release),
    "Production content operations must preserve complete Git history"
  );
  yield* ensure(
    proofPrecedesProduction(release),
    "Contract proof must finish before production credentials are approved"
  );
  yield* ensure(
    ISOLATED_OPERATION_PATTERN.test(release),
    "Content operations must run from one clean exact-revision checkout"
  );
  yield* ensure(
    TERMINAL_GATE_PATTERN.test(release),
    "Terminal content operations must retain scoped recovery gates"
  );
  yield* ensure(
    PUBLICATION_SCOPE_PATTERN.test(release),
    "Content releases must validate and pass one explicit scalable scope"
  );
  yield* ensure(
    Arr.filter(all, (source) => OPERATION_PATTERN.test(source)).length === 1,
    "Only one workflow may own content publication"
  );
  const document = parseDocument(release);
  yield* ensure(document.errors.length === 0, "Publication YAML must parse");
  yield* ensure(
    document.getIn(["concurrency", "group"]) === "content-publication",
    "Paired operations must serialize without cancellation"
  );
  yield* ensure(
    document.getIn(["concurrency", "cancel-in-progress"]) === false,
    "Paired operations must serialize without cancellation"
  );
  yield* ensure(
    document.getIn(["jobs", "operate", "strategy", "fail-fast"]) === false,
    "One target failure must not interrupt its peer"
  );
  yield* verifyTargetChoice(document);
  yield* verifyDispatchGuards(document);
  yield* ensure(
    SHARED_VALIDATION_PATTERN.test(release),
    "Shared validation must finish before either target operates"
  );
  yield* ensure(
    PARITY_PREFLIGHT_PATTERN.test(release),
    "Acceptance must prove authenticated complete-result parity before mutation"
  );
  yield* ensure(
    PARITY_RESULT_PATTERN.test(release),
    "Paired release and acceptance must finish with an authenticated parity gate"
  );
  yield* verifyPlans(release);
  const steps = yield* requireSeq(
    document.getIn(["jobs", "operate", "steps"]),
    "Publication must declare operation steps"
  );
  for (let index = 0; index < steps.items.length; index += 1) {
    const base = ["jobs", "operate", "steps", index];
    const workingDirectory = document.getIn([...base, "working-directory"]);
    if (workingDirectory === undefined) {
      continue;
    }
    const stepName = document.getIn([...base, "name"]);
    if (stepName === "Verify paired acceptance") {
      for (const [key, namespace] of [
        ["ENDPOINT", "vars"],
        ["TOKEN", "secrets"],
      ]) {
        for (const prefix of ["AKSARA_DEV", "AKSARA"]) {
          yield* ensure(
            document.getIn([...base, "env", `${prefix}_PUBLICATION_${key}`]) ===
              `\${{ ${namespace}.${prefix}_PUBLICATION_${key} }}`,
            "Parity must authenticate both exact target credentials"
          );
        }
      }
      continue;
    }
    for (const [key, namespace] of [
      ["ENDPOINT", "vars"],
      ["TOKEN", "secrets"],
    ]) {
      yield* ensure(
        document.getIn([...base, "env", `AKSARA_PUBLICATION_${key}`]) ===
          `\${{ ${namespace}[matrix.target == 'development' && 'AKSARA_DEV_PUBLICATION_${key}' || 'AKSARA_PUBLICATION_${key}'] }}`,
        "Each operation must select credential keys without production value fallbacks"
      );
    }
    const condition = document.getIn([...base, "if"]);
    if (
      condition === "inputs.operation == 'release'" ||
      condition === "inputs.operation == 'recover'"
    ) {
      yield* ensure(
        document.getIn([...base, "env", "AKSARA_CACHE_SURFACE"]) ===
          `\${{ matrix.target == 'development' && 'none' || 'deployed' }}`,
        "Release and recovery must invalidate only their deployed cache surface"
      );
    }
  }

  for (const [key, namespace] of [
    ["ENDPOINT", "vars"],
    ["TOKEN", "secrets"],
  ]) {
    for (const prefix of ["AKSARA_DEV", "AKSARA"]) {
      yield* ensure(
        document.getIn([
          "jobs",
          "parity",
          "steps",
          3,
          "env",
          `${prefix}_PUBLICATION_${key}`,
        ]) === `\${{ ${namespace}.${prefix}_PUBLICATION_${key} }}`,
        "Final parity must authenticate both exact target credentials"
      );
    }
  }
});
