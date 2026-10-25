import { expect, layer } from "@effect/vitest";
import { Effect } from "effect";
import { verifyPublicationWorkflow } from "#scripts/workflow/publication";
import { expectRefusal } from "#scripts/workflow/test/failure";
import { mutateJob } from "#scripts/workflow/test/mutation";
import {
  sourceEffectTestsOf,
  workflowSourcesLayer,
} from "#scripts/workflow/test/sources";

/** Writes one dispatched workflow input as the expression text that the workflow reads. */
const inputExpression = (input: string) => `\${{ inputs.${input} }}`;

const UNSAFE_PUBLICATION_CHANGES: ReadonlyArray<
  readonly [string, string, string]
> = [
  [
    "- name: Prove immutable contract release",
    "- name: Prove contract release",
    "Contract proof must finish before production credentials are approved",
  ],
  [
    "Verify paired acceptance",
    "Skip paired acceptance",
    "Acceptance must prove authenticated complete-result parity",
  ],
  [
    "Verify paired result",
    "Skip paired result",
    "Paired release and acceptance must finish",
  ],
  [
    "vars.AKSARA_DEV_PUBLICATION_ENDPOINT",
    "vars.AKSARA_PUBLICATION_ENDPOINT",
    "Parity must authenticate both exact target credentials",
  ],

  [
    "group: content-publication",
    "group: isolated-target",
    "Paired operations must serialize",
  ],
  [
    "cancel-in-progress: false",
    "cancel-in-progress: true",
    "Paired operations must serialize",
  ],
  [
    "default: production",
    "default: both",
    "The target input must offer exactly production, development, and both",
  ],
  [
    "- both",
    "- staging",
    "The target input must offer exactly production, development, and both",
  ],
  [
    "- development",
    "- development\n          - staging",
    "The target input must offer exactly production, development, and both",
  ],
  [
    "fail-fast: false",
    "fail-fast: true",
    "One target failure must not interrupt its peer",
  ],
  [
    '["development","production"]',
    '["production"]',
    "The release on both must start only the legs",
  ],
  [
    "format('[\"{0}\"]', inputs.target)",
    "'[\"production\"]'",
    "The release on development must start only the legs",
  ],
  ["needs.verify.result == 'success'", "true", "Shared validation must finish"],
  [
    "- name: Validate target",
    "- name: Check target",
    "Validate target must be step 1 of the contracts job",
  ],
  [
    "- name: Validate operation",
    "- name: Check operation",
    "Validate operation must be step 2 of the contracts job",
  ],
  [
    "TARGET:",
    "FIXED_TARGET:",
    "Validate target must read the dispatched target",
  ],
  [
    "if: inputs.operation == 'accept' && inputs.target == 'both'",
    "if: inputs.operation == 'accept'",
    "The accept on production must start only the legs",
  ],
  [
    "      && inputs.target == 'both'\n",
    "",
    "The release on production must start only the legs",
  ],
  [
    "vars[matrix.target == 'development' && 'AKSARA_DEV_PUBLICATION_ENDPOINT' || 'AKSARA_PUBLICATION_ENDPOINT']",
    "vars.AKSARA_DEV_PUBLICATION_ENDPOINT || vars.AKSARA_PUBLICATION_ENDPOINT",
    "Each operation must select credential keys",
  ],
  [
    "secrets[matrix.target == 'development' && 'AKSARA_DEV_PUBLICATION_TOKEN' || 'AKSARA_PUBLICATION_TOKEN']",
    "secrets.AKSARA_PUBLICATION_TOKEN",
    "Each operation must select credential keys",
  ],
  [
    `\${{ matrix.target == 'development' && 'none' || 'deployed' }}`,
    "deployed",
    "Release and recovery must invalidate only their deployed cache surface",
  ],
  [
    `BOOTSTRAP_OVER: ${inputExpression("bootstrap_over")}\n          OPERATION`,
    `BOOTSTRAP_OVER: ${inputExpression("recovery_id")}\n          OPERATION`,
    "Validate operation must read the dispatched bootstrap_over",
  ],
  [
    `BOOTSTRAP_OVER: ${inputExpression("bootstrap_over")}\n          RECOVERY_ID`,
    `BOOTSTRAP_OVER: ${inputExpression("recovery_id")}\n          RECOVERY_ID`,
    "Release must read the dispatched bootstrap base",
  ],
  [
    'retention_args=(--bootstrap-over "$BOOTSTRAP_OVER")',
    'retention_args=(--recovery-id "$BOOTSTRAP_OVER")',
    "Content releases must pass exactly one retained decision",
  ],
];

/** Conditions of the final parity job whose removal would let it run when it must not, with the refusal each must meet. */
const PARITY_GUARDS: ReadonlyArray<readonly [string, string]> = [
  [
    "needs.operate.result == 'success'",
    "The final parity must not run after a failed publication",
  ],
  ["github.ref == 'refs/heads/main'", "The final parity must not run off main"],
  [
    "github.repository == 'nakafaai/aksara'",
    "The final parity must not run outside the Aksara repository",
  ],
];

layer(workflowSourcesLayer)("publication target policy", (layered) => {
  const it = sourceEffectTestsOf(layered);

  it("accepts the protected release with production by default and target-specific parity", ({
    release,
  }) => verifyPublicationWorkflow(release, [release]));

  it("rejects a second workflow that can independently publish content", ({
    release,
  }) =>
    expectRefusal(
      verifyPublicationWorkflow(release, [
        release,
        "run: bun run release -- --release-id drift",
      ]),
      "Only one workflow may own content publication"
    ));

  for (const [before, after, error] of UNSAFE_PUBLICATION_CHANGES) {
    it(`rejects unsafe publication change to ${before.trim()}`, ({ release }) =>
      Effect.gen(function* () {
        const source = release.replaceAll(before, after);
        expect(source).not.toEqual(release);
        yield* expectRefusal(
          verifyPublicationWorkflow(source, [source]),
          error
        );
      }));
  }

  for (const [condition, error] of PARITY_GUARDS) {
    it(`rejects a final parity job without '${condition}'`, ({ release }) =>
      Effect.gen(function* () {
        const source = mutateJob(release, "parity", condition, "true");
        expect(source).not.toEqual(release);
        yield* expectRefusal(
          verifyPublicationWorkflow(source, [source]),
          error
        );
      }));
  }
});
