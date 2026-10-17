import { Effect } from "effect";
import { verifyNpmWorkflow } from "#scripts/workflow/npm";
import { ensure } from "#scripts/workflow/requirement";

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
export const verifyCliWorkflow = Effect.fn("AksaraScripts.verifyCliWorkflow")(
  function* (source: string) {
    const { build, buildSource, publishSource, verifySource } =
      yield* verifyNpmWorkflow(source, CLI_WORKFLOW);
    yield* ensure(
      CLI_GATE_PATTERN.test(buildSource),
      "CLI builds must run every package gate"
    );
    yield* ensure(
      build.permissions?.["id-token"] === undefined,
      "CLI builds must not receive npm OIDC identity"
    );
    yield* ensure(
      STABLE_VERSION_PATTERN.test(source),
      "CLI production publication must reject prerelease versions"
    );
    yield* ensure(
      build.outputs?.archive === `${DOLLAR}{{ steps.archive.outputs.archive }}`,
      "CLI builds must export the exact archive name"
    );
    yield* ensure(
      build.outputs?.sha256 === `${DOLLAR}{{ steps.archive.outputs.sha256 }}`,
      "CLI builds must export the exact archive digest"
    );
    yield* ensure(
      build.outputs?.size === `${DOLLAR}{{ steps.archive.outputs.size }}`,
      "CLI builds must export the exact archive size"
    );
    yield* ensure(
      publishSource.includes("@nakafa/aksara-cli") &&
        verifySource.includes("@nakafa/aksara-cli"),
      "CLI publication must bind the official package identity"
    );
  }
);
