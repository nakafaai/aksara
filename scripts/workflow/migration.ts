import assert from "node:assert/strict";

const TRIGGER_PATTERN =
  /workflow_dispatch:[\s\S]*operation:[\s\S]*type: choice[\s\S]*- genesis[\s\S]*- migrate[\s\S]*- cleanup[\s\S]*- abort[\s\S]*migration_id:[\s\S]*required: true[\s\S]*permissions: \{\}/u;
const CONCURRENCY_PATTERN = /group: content-production/u;
const CHAIN_PATTERN =
  /verify:[\s\S]*seal:[\s\S]*needs: verify[\s\S]*environment: content-production[\s\S]*publish:[\s\S]*needs: seal[\s\S]*cleanup:[\s\S]*needs: \[verify, seal, publish\][\s\S]*environment: content-production/u;
const VERIFY_PATTERN =
  /verify:[\s\S]*attestations: read[\s\S]*contents: read[\s\S]*pnpm install --frozen-lockfile[\s\S]*pnpm security:audit[\s\S]*Verify repository controls[\s\S]*Verify migration revision[\s\S]*verify:consumer --output "\$TARBALL"[\s\S]*release-command\.ts prove[\s\S]*--source-sha "\$GITHUB_SHA"/u;
const ABORT_PATTERN =
  /abort:[\s\S]*needs: verify[\s\S]*inputs\.operation == 'abort'[\s\S]*environment: content-production[\s\S]*contents: read[\s\S]*git worktree add --detach "\$OPERATION_ROOT" "\$GITHUB_SHA"[\s\S]*pnpm --dir "\$OPERATION_ROOT" install --frozen-lockfile[\s\S]*pnpm --filter @nakafa\/aksara-cli migrate:abort\s+--release-id "\$MIGRATION_ID"/u;
const SEAL_PATTERN =
  /seal:[\s\S]*attestations: write[\s\S]*contents: read[\s\S]*id-token: write[\s\S]*git worktree add --detach "\$OPERATION_ROOT" "\$GITHUB_SHA"[\s\S]*AKSARA_SIGNING_PRIVATE_KEY[\s\S]*pnpm --filter @nakafa\/aksara-cli migrate\s+--release-id "\$MIGRATION_ID"[\s\S]*Resolve signed asset identity[\s\S]*release_tag="migration-\$receipt_migration_id"[\s\S]*asset_hash=sha256:\$digest[\s\S]*Attest signed asset[\s\S]*Upload signed asset/u;
const GENESIS_COMMAND_PATTERN =
  /inputs\.operation == 'genesis'[\s\S]*Seal signed genesis bundle[\s\S]*AKSARA_SIGNING_KEY_ID[\s\S]*AKSARA_SIGNING_PRIVATE_KEY[\s\S]*pnpm --filter @nakafa\/aksara-cli genesis\s+--bundle-path "\$BUNDLE"/u;
const GENESIS_IDENTITY_PATTERNS = [
  /sha256:6613c0fe37c6fbc94bc88fa59bacf20d664f6568f8da4dab8347396685573bd1/u,
  /genesis-six-scope-v013-20260814-e3a7f1e/u,
  /e3a7f1e05bc64e1439e54084f50f2ad6ce22cd79/u,
  /asset_name="bundle\.json"[\s\S]*release_tag="tryout-runtime-\$MIGRATION_ID"/u,
] as const;
const PUBLISH_PATTERN =
  /publish:[\s\S]*attestations: read[\s\S]*contents: write[\s\S]*Download signed asset[\s\S]*Verify transported asset[\s\S]*Resolve release state[\s\S]*isImmutable,isPrerelease,targetCommitish[\s\S]*mode=reuse[\s\S]*Create draft release[\s\S]*Attach signed asset[\s\S]*Publish immutable release[\s\S]*Verify public asset[\s\S]*\.immutable == true[\s\S]*\.assets\[0\]\.digest == \$digest[\s\S]*\.object\.type == "commit" and \.object\.sha == \$sha[\s\S]*gh release verify-asset[\s\S]*gh attestation verify/u;
const CLEANUP_PATTERN =
  /cleanup:[\s\S]*needs: \[verify, seal, publish\][\s\S]*always\(\)[\s\S]*inputs\.operation == 'cleanup'[\s\S]*needs\.seal\.result == 'skipped'[\s\S]*needs\.publish\.result == 'skipped'[\s\S]*Resolve public receipt identity[\s\S]*\^\[a-z0-9\]\[a-z0-9\._-\]\{0,127\}\$[\s\S]*release_tag="migration-\$MIGRATION_ID"[\s\S]*\.target_commitish \| test\("\^\[0-9a-f\]\{40\}\$"\)[\s\S]*source_sha=\$\(jq -er '\.target_commitish'[\s\S]*\.object\.type == "commit" and \.object\.sha == \$sha[\s\S]*gh release download "\$RELEASE_TAG"[\s\S]*Verify public release[\s\S]*\.immutable == true[\s\S]*\.assets\[0\]\.digest == \$digest[\s\S]*gh release verify-asset[\s\S]*gh attestation verify[\s\S]*--source-digest "\$SOURCE_SHA"[\s\S]*git worktree add --detach "\$OPERATION_ROOT" "\$GITHUB_SHA"[\s\S]*pnpm --filter @nakafa\/aksara-cli migrate:cleanup\s+--release-id "\$MIGRATION_ID"[\s\S]*--asset-hash "\$ASSET_HASH" --source-sha "\$SOURCE_SHA"/u;
const PRIVILEGED_CODE_PATTERN =
  /actions\/checkout|\bpnpm\b|\bnode\b|packages\/|scripts\//u;
const SIGNING_SECRET_PATTERN =
  /AKSARA_SIGNING_KEY_ID|AKSARA_SIGNING_PRIVATE_KEY/u;
const FIXED_WAIT_PATTERN = /\bsleep\b/u;

/** Verifies try-out recovery assets are durable, exact, and least-privileged. */
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
    ABORT_PATTERN,
    "Migration abort must use the protected exact-revision path"
  );
  assert.match(
    migration,
    SEAL_PATTERN,
    "Migration sealing must produce and attest one exact receipt"
  );
  assert.match(
    migration,
    GENESIS_COMMAND_PATTERN,
    "Genesis signing must bind the exact reviewed runtime payload"
  );
  for (const pattern of GENESIS_IDENTITY_PATTERNS) {
    assert.match(
      migration,
      pattern,
      "Genesis signing must bind the exact reviewed runtime payload"
    );
  }
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

  const abort = migration.slice(
    migration.indexOf("\n  abort:"),
    migration.indexOf("\n  seal:")
  );
  assert.doesNotMatch(
    abort,
    SIGNING_SECRET_PATTERN,
    "Migration abort must not receive signing credentials"
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
