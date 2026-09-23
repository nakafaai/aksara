import assert from "node:assert/strict";
import { verifyNpmWorkflow } from "#scripts/workflow/npm";

const DOLLAR = "$";
const CLI_WORKFLOW = {
  packageArtifact: "cli-package",
  publishSha256:
    "5209d8ab9e2fa3a1d24f8eccae20d5c695e4576147e4fcbefd1e1725ffa9b0d9",
  repository: "nakafaai/aksara",
  verifierArtifact: "cli-verifier",
  workflowPath: ".github/workflows/cli.yml",
} as const;
const CLI_GATE_PATTERN =
  /pnpm exec turbo run test typecheck build --filter=@nakafa\/aksara-cli/u;
const STABLE_VERSION_PATTERN =
  /^ {6}- name: Verify stable package version\n^ {8}run: \|\n[\s\S]*^ {10}version=\$\(jq -er '\.version' apps\/cli\/dist\/package\/package\.json\)$[\s\S]*^ {10}if \[\[ ! "\$version" =~ \^\(0\|\[1-9\]\[0-9\]\*\)\\\.\(0\|\[1-9\]\[0-9\]\*\)\\\.\(0\|\[1-9\]\[0-9\]\*\)\$ \]\]; then$/mu;

/** Verifies the public CLI build identity and shared npm trust boundary. */
export function verifyCliWorkflow(source: string): void {
  const { build, buildSource, publishSource, verifySource } = verifyNpmWorkflow(
    source,
    CLI_WORKFLOW
  );
  assert.match(
    buildSource,
    CLI_GATE_PATTERN,
    "CLI builds must run every package gate"
  );
  assert.equal(
    build.permissions?.["id-token"],
    undefined,
    "CLI builds must not receive npm OIDC identity"
  );
  assert.match(
    source,
    STABLE_VERSION_PATTERN,
    "CLI production publication must reject prerelease versions"
  );
  assert.equal(
    build.outputs?.archive,
    `${DOLLAR}{{ steps.archive.outputs.archive }}`,
    "CLI builds must export the exact archive name"
  );
  assert.equal(
    build.outputs?.sha256,
    `${DOLLAR}{{ steps.archive.outputs.sha256 }}`,
    "CLI builds must export the exact archive digest"
  );
  assert.equal(
    build.outputs?.size,
    `${DOLLAR}{{ steps.archive.outputs.size }}`,
    "CLI builds must export the exact archive size"
  );
  assert.ok(
    publishSource.includes("@nakafa/aksara-cli") &&
      verifySource.includes("@nakafa/aksara-cli"),
    "CLI publication must bind the official package identity"
  );
}
