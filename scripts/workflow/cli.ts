import assert from "node:assert/strict";

const IDENTITY_PATTERN = /id-token: write/u;
const IDENTITY_GLOBAL_PATTERN = /id-token: write/gu;
const DOLLAR = "$";
const STABLE_VERSION_PATTERN =
  /^ {6}- name: Verify stable package version\n^ {8}run: \|\n[\s\S]*^ {10}version=\$\(jq -er '\.version' apps\/cli\/dist\/package\/package\.json\)$[\s\S]*^ {10}if \[\[ ! "\$version" =~ \^\(0\|\[1-9\]\[0-9\]\*\)\\\.\(0\|\[1-9\]\[0-9\]\*\)\\\.\(0\|\[1-9\]\[0-9\]\*\)\$ \]\]; then$/mu;
const TRANSPORT_PATTERN =
  /package_sha256:[\s\S]*sha256:[\s\S]*size:[\s\S]*Build release archive[\s\S]*sha256sum[\s\S]*Upload verified archive[\s\S]*publish:[\s\S]*needs: build[\s\S]*Download verified archive[\s\S]*Verify transported archive[\s\S]*EXPECTED_PACKAGE_SHA256[\s\S]*EXPECTED_SHA256[\s\S]*EXPECTED_SIZE/u;
const TRUSTED_PUBLISH_JOB = [
  "publish:",
  "    needs: build",
  "    environment: npm-production",
  "    runs-on: ubuntu-latest",
  "    timeout-minutes: 10",
  "    permissions:",
  "      id-token: write",
  "    steps:",
  "      - name: Download verified archive",
  "        uses: actions/download-artifact@3e5f45b2cfb9172054b4087a40e8e0b5a5461e7c # v8.0.1",
  "        with:",
  "          name: cli-package",
  "          path: .",
  "",
  "      - name: Verify transported archive",
  "        env:",
  `          EXPECTED_PACKAGE_SHA256: ${DOLLAR}{{ needs.build.outputs.package_sha256 }}`,
  `          EXPECTED_SHA256: ${DOLLAR}{{ needs.build.outputs.sha256 }}`,
  `          EXPECTED_SIZE: ${DOLLAR}{{ needs.build.outputs.size }}`,
  `          TARBALL: ${DOLLAR}{{ needs.build.outputs.archive }}`,
  "        run: |",
  "          actual_package_sha256=$(sha256sum package.json | cut -d ' ' -f 1)",
  "          actual_sha256=$(sha256sum \"$TARBALL\" | cut -d ' ' -f 1)",
  "          actual_size=$(stat --format='%s' \"$TARBALL\")",
  '          if [[ "$actual_package_sha256" != "$EXPECTED_PACKAGE_SHA256" \\',
  '            || "$actual_sha256" != "$EXPECTED_SHA256" \\',
  '            || "$actual_size" != "$EXPECTED_SIZE" ]]; then',
  '            echo "The transported CLI package differs from the verified build output." >&2',
  "            exit 1",
  "          fi",
  "",
  "      - name: Setup toolchain",
  "        uses: pnpm/setup@84cb39b217b10273981911c288cd62326dc7c6d2 # v2.0.2",
  "        with:",
  "          cache: false",
  "          install: false",
  "",
  "      - name: Publish public package",
  "        env:",
  "          NPM_CLI: npm@12.0.2",
  `          TARBALL: ${DOLLAR}{{ needs.build.outputs.archive }}`,
  "        run: |",
  '          version=$(npx --yes "$NPM_CLI" --version)',
  `          if [[ "$version" != "${DOLLAR}{NPM_CLI#npm@}" ]]; then`,
  '            echo "The trusted publisher requires the pinned npm CLI." >&2',
  "            exit 1",
  "          fi",
  `          if [[ -z "${DOLLAR}{ACTIONS_ID_TOKEN_REQUEST_URL:-}" \\`,
  `            || -z "${DOLLAR}{ACTIONS_ID_TOKEN_REQUEST_TOKEN:-}" ]]; then`,
  '            echo "The trusted publisher requires GitHub OIDC identity." >&2',
  "            exit 1",
  "          fi",
  '          npx --yes "$NPM_CLI" publish "$TARBALL" --access public --provenance',
].join("\n");

/** Verifies isolated exact-byte npm publication for the public CLI. */
export function verifyCliWorkflow(source: string): void {
  const buildIndex = source.indexOf("\n  build:");
  const publishIndex = source.indexOf("\n  publish:");
  assert.ok(
    buildIndex >= 0 && publishIndex > buildIndex,
    "CLI verification and publication must use separate jobs"
  );
  const buildJob = source.slice(buildIndex, publishIndex);
  const publishJob = source.slice(publishIndex);
  assert.doesNotMatch(
    buildJob,
    IDENTITY_PATTERN,
    "CLI verification must not receive npm publishing identity"
  );
  assert.equal(
    source.match(IDENTITY_GLOBAL_PATTERN)?.length,
    1,
    "Only the minimal CLI publish job may own npm publishing identity"
  );
  assert.match(
    source,
    TRANSPORT_PATTERN,
    "CLI publication must transport and reverify the exact built archive"
  );
  assert.match(
    buildJob,
    STABLE_VERSION_PATTERN,
    "CLI production publication must reject prerelease versions"
  );
  assert.equal(
    publishJob.trim(),
    TRUSTED_PUBLISH_JOB,
    "The privileged CLI publish job must match the exact reviewed contract"
  );
}
