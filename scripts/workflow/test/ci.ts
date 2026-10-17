import { Array as Arr, type Effect } from "effect";
import { verifyCiWorkflow } from "#scripts/workflow/ci";
import type { WorkflowError } from "#scripts/workflow/requirement";
import { expectRefusal } from "#scripts/workflow/test/failure";
import { sourceEffectTestsOf } from "#scripts/workflow/test/sources";

const DOLLAR = "$";

/** The step that runs one test group's matrix command in the checked-in CI workflow. */
export const MATRIX_COMMAND_STEP = `run: ${DOLLAR}{{ matrix.command }}`;

/** The step that runs the Effect-native source check, with the blank line that follows it. */
const NATIVE_STEP =
  "      - name: Check Effect-native source\n        run: pnpm native\n\n";

/** The typecheck step of the checked-in CI workflow, with the blank line that follows it. */
const TYPECHECK_STEP =
  "      - name: Typecheck\n        run: pnpm typecheck\n\n";

/** Edits that each remove the Effect-native source check, or move it after the typecheck. */
export const NATIVE_STEP_EDITS = [
  { from: NATIVE_STEP, to: "" },
  {
    from: `${NATIVE_STEP}${TYPECHECK_STEP}`,
    to: `${TYPECHECK_STEP}${NATIVE_STEP}`,
  },
];

/** Matches the strategy block of the test job, which one mutation removes. */
export const STRATEGY_BLOCK_PATTERN = / {4}strategy:[\s\S]*?\n {4}steps:/u;

/** The publisher test group, which the checked-in matrix lists as its last leg. */
export const PUBLISHER_LEG = Arr.join(
  [
    "          - group: publisher",
    "            command: pnpm exec turbo run test --filter=@nakafa/aksara-publisher --filter=@nakafa/aksara-cli --concurrency=1",
  ],
  "\n"
);

/** Edits that each add one key which would let a test group pass or be skipped silently. */
export const SILENT_PASS_EDITS = [
  {
    from: "    timeout-minutes: 20\n    strategy:",
    to: `    timeout-minutes: 20\n    continue-on-error: ${DOLLAR}{{ matrix.group == 'voice' }}\n    strategy:`,
  },
  {
    from: MATRIX_COMMAND_STEP,
    to: `continue-on-error: true\n        ${MATRIX_COMMAND_STEP}`,
  },
  {
    from: MATRIX_COMMAND_STEP,
    to: `if: matrix.group != 'voice'\n        ${MATRIX_COMMAND_STEP}`,
  },
  {
    from: MATRIX_COMMAND_STEP,
    to: `shell: "true {0}"\n        ${MATRIX_COMMAND_STEP}`,
  },
];

/** Declares one CI policy test whose refusals are checked against the given test targets. */
export function ciPolicyTestsOf(
  layered: Parameters<typeof sourceEffectTestsOf>[0]
) {
  const sourceTest = sourceEffectTestsOf(layered);
  return (
    name: string,
    check: (policy: {
      readonly rejects: ReturnType<typeof rejectionFor>;
      readonly source: string;
      readonly targets: readonly string[];
    }) => Effect.Effect<void, WorkflowError>
  ) =>
    sourceTest(name, ({ ci, testTargets }) =>
      check({
        rejects: rejectionFor(testTargets),
        source: ci,
        targets: testTargets,
      })
    );
}

/** Returns the assertion that one CI workflow is refused, by default against the repository test targets. */
function rejectionFor(repositoryTargets: readonly string[]) {
  return (ci: string, message: string, testTargets = repositoryTargets) =>
    expectRefusal(verifyCiWorkflow(ci, testTargets), message);
}

/** Edits that each add one matrix key or leg key beyond the four test groups. */
export const MATRIX_KEY_EDITS = [
  {
    from: "      matrix:\n        include:",
    to: "      matrix:\n        exclude:\n          - group: voice\n        include:",
  },
  {
    from: "      matrix:\n        include:",
    to: "      matrix:\n        shard: [1, 2]\n        include:",
  },
  {
    from: "- group: voice",
    to: "- group: voice\n            os: ubuntu-latest",
  },
];
