import assert from "node:assert/strict";

const SNAPSHOT_ACTION =
  "actions/create-github-app-token@bcd2ba49218906704ab6c1aa796996da409d3eb1";
const SNAPSHOT_OPERATION_CONDITION = `        if: >-
          success()
          && (inputs.operation == 'release'
          || inputs.operation == 'recover'
          || inputs.operation == 'accept'
          || inputs.operation == 'abort')`;
const SNAPSHOT_TOKEN_STEP = `      - name: Create Nakafa snapshot token
        id: nakafa-snapshot-token
${SNAPSHOT_OPERATION_CONDITION}
        uses: ${SNAPSHOT_ACTION} # v3.2.0
        with:
          client-id: \${{ vars.NAKAFA_SNAPSHOT_APP_CLIENT_ID }}
          private-key: \${{ secrets.NAKAFA_SNAPSHOT_APP_PRIVATE_KEY }}
          owner: nakafaai
          repositories: nakafa.com
          permission-actions: write`;
const SNAPSHOT_DISPATCH_STEP = `      - name: Refresh Nakafa content snapshot
${SNAPSHOT_OPERATION_CONDITION}
        env:
          GH_TOKEN: \${{ steps.nakafa-snapshot-token.outputs.token }}
        run: >-
          gh api --method POST
          repos/nakafaai/nakafa.com/actions/workflows/cache.yml/dispatches
          -f ref=main`;

/** Returns the unique named step from one workflow source. */
function namedStep(source: string, name: string): string {
  const marker = `      - name: ${name}`;
  const start = source.indexOf(marker);
  assert.notEqual(start, -1, `Workflow must define ${name}`);
  assert.equal(
    source.indexOf(marker, start + marker.length),
    -1,
    `Workflow must define ${name} exactly once`
  );

  const next = source.indexOf("\n      - name:", start + marker.length);
  return source.slice(start, next === -1 ? source.length : next).trimEnd();
}

/** Verifies protected, least-privilege dispatch of the Nakafa snapshot build. */
export function verifySnapshotDispatch(release: string): void {
  const tokenStep = namedStep(release, "Create Nakafa snapshot token");
  const dispatchStep = namedStep(release, "Refresh Nakafa content snapshot");
  assert.equal(
    tokenStep,
    SNAPSHOT_TOKEN_STEP,
    "Snapshot dispatch must mint one protected least-privilege Nakafa token"
  );
  assert.equal(
    dispatchStep,
    SNAPSHOT_DISPATCH_STEP,
    "Snapshot dispatch must target cache.yml on Nakafa main after exact content operations"
  );

  const operate = release.indexOf("  operate:\n");
  const environment = release.indexOf(
    "    environment: content-production",
    operate
  );
  const abortStep = namedStep(release, "Abort pending release");
  const abort = release.indexOf(abortStep);
  const token = release.indexOf(tokenStep);
  const dispatch = release.indexOf(dispatchStep);
  assert.ok(
    operate !== -1 &&
      environment > operate &&
      abort > environment &&
      token > abort &&
      dispatch > token,
    "Snapshot dispatch must follow successful protected content operations"
  );
  assert.equal(
    release.slice(abort + abortStep.length, token).trim(),
    "",
    "Snapshot token creation must immediately follow content operations"
  );
  assert.equal(
    release.slice(token + tokenStep.length, dispatch).trim(),
    "",
    "Snapshot dispatch must immediately follow token creation"
  );
}
