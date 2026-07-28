import assert from "node:assert/strict";

const SOURCE_IDENTITY_PATTERN =
  /MIGRATION_REF: contracts-v0\.3\.1[\s\S]*MIGRATION_SHA: f46e7ee9eff87ebb0a0a5857a03598d8670dace4[\s\S]*git rev-parse "\$MIGRATION_REF\^\{commit\}"[\s\S]*"\$resolved" != "\$MIGRATION_SHA"/u;
const SOURCE_PROOF_PATTERN =
  /source:[\s\S]*attestations: read[\s\S]*contents: read[\s\S]*Verify migration source[\s\S]*pnpm --dir "\$MIGRATION_ROOT" lint[\s\S]*pnpm --dir "\$MIGRATION_ROOT" build[\s\S]*Prove immutable migration contract[\s\S]*release-command\.ts" prove[\s\S]*--package "\$MIGRATION_ROOT\/packages\/contracts\/package\.json"[\s\S]*--source-sha "\$MIGRATION_SHA"/u;
const OPERATION_PATTERN =
  /needs: source[\s\S]*environment: content-production[\s\S]*permissions:\n {6}contents: read/u;
const MAIN_GUARD_PATTERN =
  /if: >-\n {6}github\.ref == 'refs\/heads\/main'\n {6}&& github\.repository == 'nakafaai\/aksara'/u;
const CHECKOUT_INTEGRITY_PATTERN =
  /git worktree add --detach "\$MIGRATION_ROOT" "\$MIGRATION_SHA"[\s\S]*pnpm --dir "\$MIGRATION_ROOT" install --frozen-lockfile[\s\S]*git -C "\$MIGRATION_ROOT" rev-parse --verify HEAD\)" != "\$MIGRATION_SHA"[\s\S]*git -C "\$MIGRATION_ROOT" status --porcelain=v1 --untracked-files=normal/u;
const DELETION_GATE_PATTERN =
  /Deletion gate: remove this workflow after the accepted material release and[\s\S]*retained recovery both use the canonical projection contract/u;
const PINNED_ACTION_PATTERN = /^[a-z0-9-]+\/[a-z0-9-]+@[0-9a-f]{40}$/u;
const PRODUCTION_LOCK_PATTERN =
  /concurrency:\n {2}group: content-production\n {2}cancel-in-progress: false/u;
const SCOPE_INPUT_PATTERN = /\bscope:/u;
const RELEASE_ID_PATTERN =
  /\[\[ ! "\$(?:RECOVERY_ID|RELEASE_ID)" =~ \^\[a-z0-9\]\[a-z0-9\._-\]\{0,127\}\$ \]\]/gu;
const MATERIAL_SCOPES = [
  "content:material:en:material/lesson/mathematics/function-composition-inverse-function/function-concept",
  "content:material:id:material/lesson/mathematics/function-composition-inverse-function/function-concept",
] as const;

/** Verifies the bounded one-time material wire migration operator. */
export function verifyMaterialMigrationWorkflow(source: string): void {
  const sourceJobStart = source.indexOf("\n  source:");
  const migrationJobStart = source.indexOf("\n  migrate:");
  const sourceJob = source.slice(sourceJobStart, migrationJobStart);
  const migrationJob = source.slice(migrationJobStart);

  assert.match(
    source,
    PRODUCTION_LOCK_PATTERN,
    "Material migration must share the production content lock"
  );
  assert.match(
    source,
    SOURCE_IDENTITY_PATTERN,
    "Material migration must execute the immutable reviewed 0.3.1 source"
  );
  assert.match(
    source,
    SOURCE_PROOF_PATTERN,
    "Material migration must verify and prove its source before approval"
  );
  assert.match(
    migrationJob,
    OPERATION_PATTERN,
    "Material migration must use one protected production operation"
  );
  assert.match(
    sourceJob,
    MAIN_GUARD_PATTERN,
    "Material migration source proof must run only from main"
  );
  assert.match(
    migrationJob,
    MAIN_GUARD_PATTERN,
    "Material migration operation must run only from main"
  );
  assert.match(
    sourceJob,
    CHECKOUT_INTEGRITY_PATTERN,
    "Material migration source proof must preserve post-install checkout integrity"
  );
  assert.match(
    migrationJob,
    CHECKOUT_INTEGRITY_PATTERN,
    "Material migration operation must preserve post-install checkout integrity"
  );
  assert.match(
    source,
    DELETION_GATE_PATTERN,
    "Material migration must declare its exact deletion gate"
  );
  assert.doesNotMatch(
    source.slice(0, source.indexOf("permissions: {}")),
    SCOPE_INPUT_PATTERN,
    "Material migration must not accept an operator-selected content scope"
  );
  assert.deepEqual(
    [...source.matchAll(/(?<=--scope )[^\s]+/gu)].map((match) => match[0]),
    MATERIAL_SCOPES,
    "Material migration must publish only the two real Function Concept documents"
  );
  assert.equal(
    [...source.matchAll(RELEASE_ID_PATTERN)].length,
    2,
    "Material migration identities must match the pinned ReleaseIdSchema"
  );

  const actions = [...source.matchAll(/(?<=uses: )[^ #\n]+/gu)].map(
    (match) => match[0]
  );
  assert.ok(actions.length > 0, "Material migration must use pinned actions");
  for (const action of actions) {
    assert.match(
      action,
      PINNED_ACTION_PATTERN,
      `Material migration action ${action} must use an exact commit`
    );
  }
}
