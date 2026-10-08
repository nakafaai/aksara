import { Array as Arr } from "effect";

const DOLLAR = "$";

/** The step that runs one test group's matrix command in the checked-in CI workflow. */
export const MATRIX_COMMAND_STEP = `run: ${DOLLAR}{{ matrix.command }}`;

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
