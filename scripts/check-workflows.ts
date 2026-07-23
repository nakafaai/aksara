import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { isRecord } from "effect/Predicate";

const bootstrapPath = ".github/workflows/bootstrap.yml";
const packageProof = readFileSync(
  ".github/workflows/package-proof.yml",
  "utf8"
);
const publish = readFileSync(".github/workflows/publish.yml", "utf8");
const release = readFileSync(".github/workflows/release.yml", "utf8");
const version = readFileSync(".github/workflows/version.yml", "utf8");
const state: unknown = JSON.parse(
  readFileSync(".changeset/bootstrap.json", "utf8")
);
assert.ok(isRecord(state), "Bootstrap state must be an object");
assert.equal(
  typeof state.contracts,
  "boolean",
  "Contracts bootstrap state must be boolean"
);
assert.match(
  publish,
  /aksara-contracts\/0\.1\.0[\s\S]*bootstrap_status" != "200"/u,
  "Steady-state publishing must prove the initial package exists"
);
assert.match(
  publish,
  /aksara-contracts\/\$package_version[\s\S]*candidate_status" != "404"/u,
  "Steady-state publishing must require a new candidate version"
);
assert.ok(
  version.indexOf("- name: Check package bootstrap") <
    version.indexOf("- name: Setup pnpm"),
  "Version automation must stop before toolchain setup while bootstrap is incomplete"
);
assert.match(
  version,
  /- name: Setup pnpm\n\s+if: steps\.bootstrap\.outputs\.ready == 'true'/u,
  "Version toolchain setup must run only after bootstrap"
);
assert.match(
  packageProof,
  /workflow_call:[\s\S]*proof_mode:[\s\S]*uses: slsa-framework\/slsa-verifier\/actions\/installer@ea584f4502babc6f60d9bc799dbbb13c1caa9ee6/u,
  "Reusable package proof must install the pinned SLSA verifier"
);
assert.match(
  packageProof,
  /Build current package[\s\S]*pnpm install --frozen-lockfile[\s\S]*verify:package[\s\S]*aksara-contracts\.local\.tgz/u,
  "Current package proof must build an isolated tarball from the exact checkout"
);
assert.match(
  packageProof,
  /EXPECTED_INTEGRITY="sha512-\$\(openssl dgst -sha512 -binary "\$local_tarball"[\s\S]*actual_integrity[\s\S]*downloaded_integrity[\s\S]*provenance_source_sha=[\s\S]*git merge-base --is-ancestor/u,
  "Current package proof must bind exact tarball bytes and signed provenance"
);
assert.match(
  release,
  /package:[\s\S]*inputs\.operation == 'release' \|\| inputs\.operation == 'rollback'[\s\S]*uses: \.\/\.github\/workflows\/package-proof\.yml[\s\S]*proof_mode: current/u,
  "Content release and rollback must call current cryptographic package proof"
);
assert.match(
  release,
  /needs: package[\s\S]*always\(\)[\s\S]*needs\.package\.result == 'success'[\s\S]*inputs\.operation == 'abort' \|\| inputs\.operation == 'cleanup'[\s\S]*needs\.package\.result == 'skipped'/u,
  "Recovery must remain available only when package proof is intentionally skipped"
);

if (state.contracts) {
  assert.equal(
    existsSync(bootstrapPath),
    false,
    "Completed bootstrap must delete its privileged workflow"
  );
} else {
  assert.equal(
    existsSync(bootstrapPath),
    true,
    "Incomplete bootstrap must retain its privileged workflow"
  );
  const bootstrap = readFileSync(bootstrapPath, "utf8");
  const privileged = bootstrap.slice(bootstrap.indexOf("\n  publish:\n"));
  const publishCalls = bootstrap.match(/pnpm publish "\$TARBALL"/gu) ?? [];
  const tokenBindings =
    privileged.match(/secrets\.NPM_BOOTSTRAP_TOKEN/gu) ?? [];
  const lostVisibility =
    /if \[\[ "\$ready" != "true" \]\]; then(?<body>[\s\S]*?)\n\s+fi/u.exec(
      bootstrap
    )?.groups?.body;

  assert.equal(
    publishCalls.length,
    1,
    "Bootstrap must attempt package publication exactly once"
  );
  assert.equal(
    tokenBindings.length,
    1,
    "The bootstrap token must be visible only to the single publish step"
  );
  assert.doesNotMatch(
    privileged,
    /actions\/checkout|pnpm install/u,
    "The privileged bootstrap job must not execute repository or package code"
  );
  assert.match(
    bootstrap,
    /pnpm publish "\$TARBALL"[\s\S]*--provenance[\s\S]*--ignore-scripts[\s\S]*\|\| publish_status=\$\?/u,
    "Bootstrap must publish the exact tarball once with provenance and no lifecycle scripts"
  );
  assert.match(
    bootstrap,
    /if \[\[ "\$status" == "200" \]\]; then[\s\S]*needs_publish=false[\s\S]*if: steps\.state\.outputs\.needs_publish == 'true'/u,
    "An existing bootstrap version must pass exact registry proof without republishing"
  );
  assert.ok(
    lostVisibility,
    "Bootstrap must handle a publish result that is not visible in the registry"
  );
  assert.match(
    lostVisibility,
    /exit 1/u,
    "Lost registry visibility must fail regardless of the publish exit status"
  );
  assert.doesNotMatch(
    lostVisibility,
    /exit "?\$\{?publish_status/u,
    "Lost registry visibility must never inherit a successful publish exit status"
  );
}

process.stdout.write("Verified package workflow recovery policy.\n");
