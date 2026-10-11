import { expect, layer } from "@effect/vitest";
import { verifyPublicationWorkflow } from "#scripts/workflow/publication";
import { mutateJob } from "#scripts/workflow/test/mutation";
import {
  sourceTestsOf,
  workflowSourcesLayer,
} from "#scripts/workflow/test/sources";

const UNSAFE_PUBLICATION_CHANGES: ReadonlyArray<
  readonly [string, string, string]
> = [
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

layer(workflowSourcesLayer)("publication policy", (layered) => {
  const it = sourceTestsOf(layered);

  it("accepts the protected release with production by default and target-specific parity", ({
    release,
  }) => {
    expect(() => verifyPublicationWorkflow(release, [release])).not.toThrow();
  });

  it("rejects a second workflow that can independently publish content", ({
    release,
  }) => {
    expect(() =>
      verifyPublicationWorkflow(release, [
        release,
        "run: pnpm release -- --release-id drift",
      ])
    ).toThrow("Only one workflow may own content publication");
  });

  for (const [before, after, error] of UNSAFE_PUBLICATION_CHANGES) {
    it(`rejects unsafe publication change to ${before.trim()}`, ({
      release,
    }) => {
      const source = release.replaceAll(before, after);
      expect(source).not.toEqual(release);
      expect(() => verifyPublicationWorkflow(source, [source])).toThrow(error);
    });
  }

  for (const [condition, error] of PARITY_GUARDS) {
    it(`rejects a final parity job without '${condition}'`, ({ release }) => {
      const source = mutateJob(release, "parity", condition, "true");
      expect(source).not.toEqual(release);
      expect(() => verifyPublicationWorkflow(source, [source])).toThrow(error);
    });
  }
});
