import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { verifyCliWorkflow } from "#scripts/workflow/cli";

const source = readFileSync(".github/workflows/cli.yml", "utf8");
const DOLLAR = "$";
const publishContractError =
  "The privileged CLI publish job must match the exact reviewed contract";

/** Expects one workflow mutation to violate the complete publish contract. */
function expectPublishContractViolation(candidate: string) {
  expect(() => verifyCliWorkflow(candidate)).toThrow(publishContractError);
}

describe("CLI workflow policy", () => {
  it("accepts isolated exact-byte npm publication", () => {
    expect(() => verifyCliWorkflow(source)).not.toThrow();
  });

  it("isolates verification from npm publishing identity", () => {
    expect(() =>
      verifyCliWorkflow(
        source.replace(
          "      contents: read",
          "      contents: read\n      id-token: write"
        )
      )
    ).toThrow("CLI verification must not receive npm publishing identity");
    expectPublishContractViolation(
      `${source}\n      - run: node scripts/publish.ts`
    );
  });

  it("requires exact transport and trusted publication", () => {
    expect(() =>
      verifyCliWorkflow(
        source.replaceAll(
          "EXPECTED_PACKAGE_SHA256",
          "UNVERIFIED_PACKAGE_SHA256"
        )
      )
    ).toThrow(
      "CLI publication must transport and reverify the exact built archive"
    );
    expectPublishContractViolation(
      source.replace("environment: npm-production", "environment: staging")
    );
    expectPublishContractViolation(
      source.replace(
        "    environment: npm-production",
        "    # environment: npm-production"
      )
    );
    expectPublishContractViolation(
      source.replace(
        'npx --yes "$NPM_CLI" publish "$TARBALL"',
        'NODE_AUTH_TOKEN=credential npx --yes "$NPM_CLI" publish "$TARBALL"'
      )
    );
    expectPublishContractViolation(
      source.replace(
        'npx --yes "$NPM_CLI" publish "$TARBALL" --access public --provenance',
        'npm pack "$TARBALL"'
      )
    );
    expectPublishContractViolation(
      source.replace(
        'npx --yes "$NPM_CLI" publish "$TARBALL" --access public --provenance',
        'npm publish "$TARBALL" --access public --provenance\n          npx --yes "$NPM_CLI" publish "$TARBALL" --access public --provenance'
      )
    );
    expectPublishContractViolation(source.replace("npm@12.0.2", "npm@11.4.2"));
    expectPublishContractViolation(
      source.replace(
        'echo "The trusted publisher requires the pinned npm CLI." >&2\n            exit 1',
        'echo "The npm CLI differs; continuing." >&2\n            :'
      )
    );
    expectPublishContractViolation(
      source.replace("ACTIONS_ID_TOKEN_REQUEST_URL", "MISSING_OIDC_URL")
    );
    expectPublishContractViolation(
      source.replace(
        'echo "The trusted publisher requires GitHub OIDC identity." >&2\n            exit 1',
        'echo "OIDC is unavailable; continuing." >&2\n            :'
      )
    );
    const oidcCheck = `          if [[ -z "${DOLLAR}{ACTIONS_ID_TOKEN_REQUEST_URL:-}" \\`;
    expectPublishContractViolation(
      source.replace(oidcCheck, `          NPM_CLI=npm@11.5.1\n${oidcCheck}`)
    );
    const publishCommand =
      'npx --yes "$NPM_CLI" publish "$TARBALL" --access public --provenance';
    expectPublishContractViolation(
      source
        .replace(`          ${publishCommand}`, "          :")
        .replace(
          "      - name: Verify transported archive",
          `      - name: Publish before verification\n        run: |\n          ${publishCommand}\n\n      - name: Verify transported archive`
        )
    );
    expect(() =>
      verifyCliWorkflow(
        source.replace(
          "      - name: Verify stable package version",
          "      - name: Accept any package version"
        )
      )
    ).toThrow("CLI production publication must reject prerelease versions");
    expect(() =>
      verifyCliWorkflow(
        source.replace(
          "      - name: Verify stable package version\n        run: |",
          "      - name: Verify stable package version\n        if: false\n        run: |"
        )
      )
    ).toThrow("CLI production publication must reject prerelease versions");
  });
});
