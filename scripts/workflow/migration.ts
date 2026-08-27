import assert from "node:assert/strict";

const TRIGGER_PATTERN =
  /workflow_dispatch:[\s\S]*migration_id:[\s\S]*required: true[\s\S]*permissions: \{\}/u;
const CONCURRENCY_PATTERN = /group: content-production/u;
const CHAIN_PATTERN =
  /verify:[\s\S]*seal:[\s\S]*needs: verify[\s\S]*environment: content-production[\s\S]*publish:[\s\S]*needs: seal[\s\S]*cleanup:[\s\S]*needs: \[seal, publish\][\s\S]*environment: content-production/u;
const VERIFY_PATTERN =
  /verify:[\s\S]*attestations: read[\s\S]*contents: read[\s\S]*pnpm install --frozen-lockfile[\s\S]*pnpm security:audit[\s\S]*Verify repository controls[\s\S]*Verify migration revision[\s\S]*verify:consumer --output "\$TARBALL"[\s\S]*release-command\.ts prove[\s\S]*--source-sha "\$GITHUB_SHA"/u;
const SEAL_PATTERN =
  /seal:[\s\S]*attestations: write[\s\S]*contents: read[\s\S]*id-token: write[\s\S]*git worktree add --detach "\$OPERATION_ROOT" "\$GITHUB_SHA"[\s\S]*AKSARA_SIGNING_PRIVATE_KEY[\s\S]*pnpm --filter @nakafa\/aksara-cli migrate --[\s\S]*Resolve receipt identity[\s\S]*asset_hash=sha256:\$digest[\s\S]*release_tag=migration-\$receipt_migration_id[\s\S]*Attest signed receipt[\s\S]*Upload signed receipt/u;
const PUBLISH_PATTERN =
  /publish:[\s\S]*attestations: read[\s\S]*contents: write[\s\S]*Download signed receipt[\s\S]*Verify transported receipt[\s\S]*Resolve release state[\s\S]*isImmutable,isPrerelease,targetCommitish[\s\S]*mode=reuse[\s\S]*Create draft release[\s\S]*Attach signed receipt[\s\S]*Publish immutable release[\s\S]*Verify public receipt[\s\S]*\.immutable == true[\s\S]*\.assets\[0\]\.digest == \$digest[\s\S]*\.object\.type == "commit" and \.object\.sha == \$sha[\s\S]*gh release verify-asset[\s\S]*gh attestation verify/u;
const CLEANUP_PATTERN =
  /cleanup:[\s\S]*gh release download "\$RELEASE_TAG"[\s\S]*Verify public release[\s\S]*\.immutable == true[\s\S]*\.assets\[0\]\.digest == \$digest[\s\S]*\.object\.type == "commit" and \.object\.sha == \$sha[\s\S]*gh release verify-asset[\s\S]*gh attestation verify[\s\S]*git worktree add --detach "\$OPERATION_ROOT" "\$GITHUB_SHA"[\s\S]*pnpm --filter @nakafa\/aksara-cli migrate:cleanup --[\s\S]*--asset-hash "\$ASSET_HASH" --source-sha "\$SOURCE_SHA"/u;
const PRIVILEGED_CODE_PATTERN =
  /actions\/checkout|\bpnpm\b|\bnode\b|packages\/|scripts\//u;
const SIGNING_SECRET_PATTERN =
  /AKSARA_SIGNING_KEY_ID|AKSARA_SIGNING_PRIVATE_KEY/u;
const FIXED_WAIT_PATTERN = /\bsleep\b/u;

/** Verifies the one-time migration is durable, exact, and least-privileged. */
export function verifyMigrationWorkflow(migration: string): void {
  assert.match(
    migration,
    TRIGGER_PATTERN,
    "Migration must be an explicit input-driven workflow"
  );
  assert.match(
    migration,
    CONCURRENCY_PATTERN,
    "Migration must serialize with content production"
  );
  assert.match(
    migration,
    CHAIN_PATTERN,
    "Migration jobs must prove, seal, publish, then clean"
  );
  assert.match(
    migration,
    VERIFY_PATTERN,
    "Migration must pass every gate and prove the exact contract release"
  );
  assert.match(
    migration,
    SEAL_PATTERN,
    "Migration sealing must produce and attest one exact receipt"
  );
  assert.match(
    migration,
    PUBLISH_PATTERN,
    "Migration publication must create or reuse one exact immutable release"
  );
  assert.match(
    migration,
    CLEANUP_PATTERN,
    "Migration cleanup must reverify the public receipt before deletion"
  );

  const publish = migration.slice(
    migration.indexOf("\n  publish:"),
    migration.indexOf("\n  cleanup:")
  );
  assert.doesNotMatch(
    publish,
    PRIVILEGED_CODE_PATTERN,
    "Migration publication must not execute repository code"
  );

  const cleanup = migration.slice(migration.indexOf("\n  cleanup:"));
  assert.doesNotMatch(
    cleanup,
    SIGNING_SECRET_PATTERN,
    "Migration cleanup must not receive signing credentials"
  );
  assert.doesNotMatch(
    migration,
    FIXED_WAIT_PATTERN,
    "Migration must not rely on fixed propagation waits"
  );
}
