import { readFileSync } from "node:fs";
import { describe, expect, it } from "@effect/vitest";
import { verifyPublicationWorkflow } from "#scripts/workflow/publication";

const release = readFileSync(".github/workflows/release.yml", "utf8");

describe("paired publication policy", () => {
  it("accepts the protected paired release and target-specific recovery path", () => {
    expect(() => verifyPublicationWorkflow(release, [release])).not.toThrow();
  });

  it("rejects a second workflow that can independently publish content", () => {
    expect(() =>
      verifyPublicationWorkflow(release, [
        release,
        "run: pnpm release -- --release-id drift",
      ])
    ).toThrow("Only one workflow may own content publication");
  });

  it.each([
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
    [
      "needs.verify.result == 'success'",
      "true",
      "Shared validation must finish",
    ],
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
  ])("rejects unsafe publication change to %s", (before, after, error) => {
    const source = release.replaceAll(before, after);
    expect(source).not.toEqual(release);
    expect(() => verifyPublicationWorkflow(source, [source])).toThrow(error);
  });
});
