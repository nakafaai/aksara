import assert from "node:assert/strict";
import { Array as Arr, Option, Record as Rec, Schema } from "effect";
import { type Document, isSeq, parseDocument } from "yaml";

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

/** Acceptance compares the two deployments only when both hold the release. */
const PAIRED_ACCEPTANCE_CONDITION =
  "inputs.operation == 'accept' && inputs.target == 'both'";

/** The final parity job follows a release or acceptance of both targets only. */
const PARITY_CONDITION = [
  "github.ref == 'refs/heads/main'",
  "github.repository == 'nakafaai/aksara'",
  "needs.operate.result == 'success'",
  "inputs.target == 'both'",
  "(inputs.operation == 'release' || inputs.operation == 'accept')",
].join(" && ");

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

/**
 * Verifies that a dispatch selects production, development, or both, and that
 * the matrix plans one leg or two to match.
 */
function verifyTargetChoice(document: Document): void {
  assert.ok(
    Option.isSome(
      Schema.decodeUnknownOption(TargetDispatchSchema)(document.toJS())
    ),
    "The target input must offer exactly production, development, and both in that order, with production as the default"
  );
  assert.equal(
    document.getIn(["jobs", "operate", "strategy", "matrix", "target"]),
    `\${{ fromJSON(inputs.target == 'both' && '["development","production"]' || format('["{0}"]', inputs.target)) }}`,
    "Publication matrix must plan both legs for both targets and one leg for each single target"
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

/** Verifies the target choice, isolated credentials, and recovery controls. */
export function verifyPublicationWorkflow(
  release: string,
  all: readonly string[]
): void {
  assert.match(
    release,
    PRODUCTION_ENV_PATTERN,
    "Content operations must require production environment approval"
  );
  assert.match(
    release,
    CONSUMER_PATTERN,
    "Full content operations must prove the contracts release archive"
  );
  assert.match(
    release,
    CONTENT_CONTRACT_PATTERN,
    "Every content operation must depend on the exact immutable contract proof"
  );
  assert.match(
    release,
    OPERATION_HISTORY_PATTERN,
    "Production content operations must preserve complete Git history"
  );
  assert.ok(
    release.indexOf("- name: Prove immutable contract release") <
      release.indexOf("environment: content-production"),
    "Contract proof must finish before production credentials are approved"
  );
  assert.match(
    release,
    ISOLATED_OPERATION_PATTERN,
    "Content operations must run from one clean exact-revision checkout"
  );
  assert.match(
    release,
    TERMINAL_GATE_PATTERN,
    "Terminal content operations must retain scoped recovery gates"
  );
  assert.match(
    release,
    PUBLICATION_SCOPE_PATTERN,
    "Content releases must validate and pass one explicit scalable scope"
  );
  assert.equal(
    Arr.filter(all, (source) => OPERATION_PATTERN.test(source)).length,
    1,
    "Only one workflow may own content publication"
  );
  const document = parseDocument(release);
  assert.equal(document.errors.length, 0, "Publication YAML must parse");
  assert.equal(
    document.getIn(["concurrency", "group"]),
    "content-publication",
    "Paired operations must serialize without cancellation"
  );
  assert.equal(
    document.getIn(["concurrency", "cancel-in-progress"]),
    false,
    "Paired operations must serialize without cancellation"
  );
  assert.equal(
    document.getIn(["jobs", "operate", "strategy", "fail-fast"]),
    false,
    "One target failure must not interrupt its peer"
  );
  verifyTargetChoice(document);
  verifyDispatchGuards(document);
  assert.match(
    release,
    SHARED_VALIDATION_PATTERN,
    "Shared validation must finish before either target operates"
  );
  assert.match(
    release,
    PARITY_PREFLIGHT_PATTERN,
    "Acceptance must prove authenticated complete-result parity before mutation"
  );
  assert.match(
    release,
    PARITY_RESULT_PATTERN,
    "Paired release and acceptance must finish with an authenticated parity gate"
  );
  assert.equal(
    document.getIn(["jobs", "parity", "if"]),
    PARITY_CONDITION,
    "Final parity must run only when both targets are published"
  );
  const steps = document.getIn(["jobs", "operate", "steps"]);
  assert.ok(isSeq(steps), "Publication must declare operation steps");
  for (let index = 0; index < steps.items.length; index += 1) {
    const base = ["jobs", "operate", "steps", index];
    const workingDirectory = document.getIn([...base, "working-directory"]);
    if (workingDirectory === undefined) {
      continue;
    }
    const stepName = document.getIn([...base, "name"]);
    if (stepName === "Verify paired acceptance") {
      assert.equal(
        document.getIn([...base, "if"]),
        PAIRED_ACCEPTANCE_CONDITION,
        "Paired acceptance must run only when both targets are published"
      );
      for (const [key, namespace] of [
        ["ENDPOINT", "vars"],
        ["TOKEN", "secrets"],
      ]) {
        for (const prefix of ["AKSARA_DEV", "AKSARA"]) {
          assert.equal(
            document.getIn([...base, "env", `${prefix}_PUBLICATION_${key}`]),
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
      assert.equal(
        document.getIn([...base, "env", `AKSARA_PUBLICATION_${key}`]),
        `\${{ ${namespace}[matrix.target == 'development' && 'AKSARA_DEV_PUBLICATION_${key}' || 'AKSARA_PUBLICATION_${key}'] }}`,
        "Each operation must select credential keys without production value fallbacks"
      );
    }
    const condition = document.getIn([...base, "if"]);
    if (
      condition === "inputs.operation == 'release'" ||
      condition === "inputs.operation == 'recover'"
    ) {
      assert.equal(
        document.getIn([...base, "env", "AKSARA_CACHE_SURFACE"]),
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
      assert.equal(
        document.getIn([
          "jobs",
          "parity",
          "steps",
          3,
          "env",
          `${prefix}_PUBLICATION_${key}`,
        ]),
        `\${{ ${namespace}.${prefix}_PUBLICATION_${key} }}`,
        "Final parity must authenticate both exact target credentials"
      );
    }
  }
}
