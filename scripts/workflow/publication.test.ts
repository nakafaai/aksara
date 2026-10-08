import { expect, layer } from "@effect/vitest";
import { verifyPublicationWorkflow } from "#scripts/workflow/publication";
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
    "default: both",
    "default: production",
    "Publication must default to both targets",
  ],
  [
    "fail-fast: false",
    "fail-fast: true",
    "One target failure must not interrupt its peer",
  ],
  [
    '["development","production"]',
    '["production"]',
    "Publication matrix must cover both targets",
  ],
  ["needs.verify.result == 'success'", "true", "Shared validation must finish"],
  [
    "both|development|production) ;;",
    "*) ;;",
    "Publication must reject unknown target identities",
  ],
  [
    'if [[ "$TARGET" != "both" ]]; then',
    "if false; then",
    "Release and acceptance must require both targets",
  ],
  [
    'elif [[ "$TARGET" == "both" ]]; then',
    "elif false; then",
    "Recovery, abort, and cleanup must require one explicit target",
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

layer(workflowSourcesLayer)("paired publication policy", (layered) => {
  const it = sourceTestsOf(layered);

  it("accepts the protected paired release and target-specific recovery path", ({
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
    it(`rejects unsafe publication change to ${before}`, ({ release }) => {
      const source = release.replaceAll(before, after);
      expect(source).not.toEqual(release);
      expect(() => verifyPublicationWorkflow(source, [source])).toThrow(error);
    });
  }
});
