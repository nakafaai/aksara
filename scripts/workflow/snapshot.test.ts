import { readFileSync } from "node:fs";
import { describe, expect, it } from "@effect/vitest";
import { verifySnapshotDispatch } from "#scripts/workflow/snapshot";

const release = readFileSync(".github/workflows/release.yml", "utf8");
const TOKEN_ERROR =
  "Snapshot dispatch must mint one protected least-privilege Nakafa token";
const DISPATCH_ERROR =
  "Snapshot dispatch must target cache.yml on Nakafa main after exact content operations";

describe("Nakafa snapshot dispatch policy", () => {
  it("accepts the protected exact-operation dispatch", () => {
    expect(() => verifySnapshotDispatch(release)).not.toThrow();
  });

  it.each([
    [
      "action pin",
      release.replace(
        "bcd2ba49218906704ab6c1aa796996da409d3eb1",
        "0000000000000000000000000000000000000000"
      ),
      TOKEN_ERROR,
    ],
    [
      "operation set",
      release.replace(
        "|| inputs.operation == 'abort')",
        "|| inputs.operation == 'audit')"
      ),
      TOKEN_ERROR,
    ],
    [
      "protected client ID",
      release.replace(
        "vars.NAKAFA_SNAPSHOT_APP_CLIENT_ID",
        "secrets.NAKAFA_SNAPSHOT_APP_CLIENT_ID"
      ),
      TOKEN_ERROR,
    ],
    [
      "protected private key",
      release.replace(
        "secrets.NAKAFA_SNAPSHOT_APP_PRIVATE_KEY",
        "vars.NAKAFA_SNAPSHOT_APP_PRIVATE_KEY"
      ),
      TOKEN_ERROR,
    ],
    [
      "repository scope",
      release.replace("repositories: nakafa.com", "repositories: aksara"),
      TOKEN_ERROR,
    ],
    [
      "least privilege",
      release.replace("permission-actions: write", "permission-actions: read"),
      TOKEN_ERROR,
    ],
    [
      "token output",
      release.replace(
        "steps.nakafa-snapshot-token.outputs.token",
        "github.token"
      ),
      DISPATCH_ERROR,
    ],
    [
      "workflow target",
      release.replace(
        "actions/workflows/cache.yml",
        "actions/workflows/ci.yml"
      ),
      DISPATCH_ERROR,
    ],
    [
      "main ref",
      release.replace("-f ref=main", "-f ref=develop"),
      DISPATCH_ERROR,
    ],
  ])("rejects a changed %s", (_name, source, error) => {
    expect(() => verifySnapshotDispatch(source)).toThrow(error);
  });

  it("requires the token and dispatch after the content operation", () => {
    const tokenMarker = "      - name: Create Nakafa snapshot token";
    const dispatchMarker = "      - name: Refresh Nakafa content snapshot";
    const abortMarker = "      - name: Abort pending release";
    const tokenStart = release.indexOf(tokenMarker);
    const dispatchStart = release.indexOf(dispatchMarker);
    const tokenBlock = release.slice(tokenStart, dispatchStart);
    const withoutToken =
      release.slice(0, tokenStart) + release.slice(dispatchStart);
    const abortStart = withoutToken.indexOf(abortMarker);
    const reordered =
      withoutToken.slice(0, abortStart) +
      tokenBlock +
      withoutToken.slice(abortStart);

    expect(() => verifySnapshotDispatch(reordered)).toThrow(
      "Snapshot dispatch must follow successful protected content operations"
    );
  });
});
