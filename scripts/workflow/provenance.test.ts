import { readFileSync } from "node:fs";
import { describe, expect, it } from "@effect/vitest";
import { verifyProvenanceWorkflow } from "#scripts/workflow/provenance";

/** Reads the exact contract publication workflow under test. */
function workflowSource() {
  return readFileSync(".github/workflows/contracts.yml", "utf8");
}

/** Replaces one fragment only within the decoded publish-job source. */
function mutatePublish(source: string, from: string, to: string) {
  const publishIndex = source.indexOf("\n  publish:");
  return `${source.slice(0, publishIndex)}${source.slice(publishIndex).replace(from, to)}`;
}

describe("contract provenance policy", () => {
  it("accepts the certificate-bound transported verifier", () => {
    expect(() => verifyProvenanceWorkflow(workflowSource())).not.toThrow();
    expect(() =>
      verifyProvenanceWorkflow(
        workflowSource().replace("    needs: build", "    needs: [build]")
      )
    ).not.toThrow();
  });

  it("requires exact verifier construction, transport, and execution", () => {
    const source = workflowSource();
    for (const changed of [
      source.replace("scripts/provenance/main.ts", "scripts/other/main.ts"),
      source.replaceAll("EXPECTED_VERIFIER_SHA256", "UNVERIFIED_SHA256"),
      source.replaceAll('node "$VERIFIER"', 'node "$TARBALL"'),
      source.replaceAll('"refs/heads/main"', '"refs/heads/other"'),
      source.replaceAll('"npm-production"', '"npm-staging"'),
    ]) {
      expect(() => verifyProvenanceWorkflow(changed)).toThrow(
        "npm provenance must include exact source fragment"
      );
    }
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

  it("binds release identity to the decoded publish job", () => {
    const source = workflowSource();
    const cases = [
      [
        mutatePublish(
          source,
          "    environment: npm-production",
          "    environment: test"
        ).concat("\n# environment: npm-production\n"),
        "The publish job must own the protected npm-production environment",
      ],
      [
        mutatePublish(source, "      id-token: write", "      id-token: read"),
        "The publish job must own npm OIDC identity",
      ],
      [
        source.replace("    needs: build", "    needs: [other]"),
        "Contract publication must consume the verified build job",
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
          "          node-version: 24.19.0",
          "          node-version: 22.0.0"
        ),
        "The provenance verifier must use the repository Node runtime",
      ],
      [
        source.replace(
          "          package-manager-cache: false",
          "          package-manager-cache: true"
        ),
        "The privileged job must disable package-manager caching",
      ],
    ] as const;
    for (const [changed, message] of cases) {
      expect(() => verifyProvenanceWorkflow(changed)).toThrow(message);
    }
  });

  it("rejects malformed or incomplete workflow jobs", () => {
    expect(() => verifyProvenanceWorkflow("jobs: [")).toThrow();
    expect(() => verifyProvenanceWorkflow("jobs:\n  build: {}\n")).toThrow(
      "Contract workflow must contain decodable jobs"
    );
    expect(() =>
      verifyProvenanceWorkflow(
        workflowSource().replace("\n  publish:", "\n  other:")
      )
    ).toThrow("Contract publication requires build and publish jobs");
  });

  it("rejects any other repository code in the privileged job", () => {
    expect(() =>
      verifyProvenanceWorkflow(
        `${workflowSource()}\n      - run: node scripts/other.ts`
      )
    ).toThrow(
      "The privileged contract job must not execute other repository code"
    );
    expect(() =>
      verifyProvenanceWorkflow(
        `${workflowSource()}\n      - run: node "$VERIFIER"`
      )
    ).toThrow("The privileged job must execute only one transported verifier");
    expect(() =>
      verifyProvenanceWorkflow(
        `${workflowSource()}\n      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1`
      )
    ).toThrow("The privileged contract job must not checkout repository code");
  });
});
