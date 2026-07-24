import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { MaterialPreviewDocumentSchema } from "@nakafa/aksara-contracts/preview/document";
import {
  LOCAL_PREVIEW_FORMAT,
  LocalPreviewManifestSchema,
  PreviewRepositorySchema,
} from "@nakafa/aksara-contracts/preview/spec";
import { HashMap, Schema } from "effect";
import { describe, expect, it } from "vitest";
import { isAddressInfo } from "#cli/address";
import {
  makePreviewHttp,
  PREVIEW_EVENTS_PATH,
  PREVIEW_MANIFEST_PATH,
  type PreviewHttpState,
  previewArtifactPath,
} from "#cli/provider/http";
import { ENGLISH_ENTRY } from "#test/real";

const firstHash = Sha256HashSchema.make(`sha256:${"d".repeat(64)}`);
const secondHash = Sha256HashSchema.make(`sha256:${"e".repeat(64)}`);
const unknownHash = Sha256HashSchema.make(`sha256:${"f".repeat(64)}`);
const firstBody = '{"artifact":"first-test"}';
const secondBody = '{"artifact":"second-test"}';
const testToken = "test-preview-provider-token";

/** Starts one test-owned loopback server around the HTTP-only transport. */
function listen(server: Server) {
  return new Promise<AddressInfo>((resolve, reject) => {
    server.once("error", reject);
    server.listen({ host: "127.0.0.1", port: 0 }, () => {
      const address = server.address();
      if (isAddressInfo(address)) {
        resolve(address);
        return;
      }
      reject(new Error("Test server did not expose one address."));
    });
  });
}

/** Stops one test-owned server after every transport assertion finishes. */
function close(server: Server) {
  return new Promise<void>((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

describe("preview HTTP transport", () => {
  it("serves every immutable hash entry and conflicts on unknown hashes", async () => {
    const document = Schema.decodeUnknownSync(MaterialPreviewDocumentSchema)({
      delivery: ENGLISH_ENTRY.delivery,
      family: "material",
      rendererDomain: ENGLISH_ENTRY.rendererDomain,
      route: ENGLISH_ENTRY.route,
      sourcePath: ENGLISH_ENTRY.sourcePath,
    });
    const repository = Schema.decodeUnknownSync(PreviewRepositorySchema)({
      dirty: false,
      sha: "a".repeat(40),
    });
    const manifest = Schema.decodeUnknownSync(LocalPreviewManifestSchema)({
      document,
      format: LOCAL_PREVIEW_FORMAT,
      repositories: { aksara: repository, nakafa: repository },
      revision: 1,
      status: "pending",
    });
    const state: PreviewHttpState = {
      artifacts: HashMap.fromIterable([
        [firstHash, firstBody],
        [secondHash, secondBody],
      ]),
      manifest,
      manifestJson: JSON.stringify(manifest),
    };
    const http = makePreviewHttp({
      readState: () => state,
      token: testToken,
    });
    const server = createServer(http.handle);

    try {
      const address = await listen(server);
      const origin = new URL(`http://127.0.0.1:${address.port}`);
      const headers = { authorization: `Bearer ${testToken}` };
      const unauthenticated = await fetch(
        new URL(PREVIEW_MANIFEST_PATH, origin)
      );
      const wrongToken = await fetch(new URL(PREVIEW_MANIFEST_PATH, origin), {
        headers: { authorization: `Bearer ${"x".repeat(testToken.length)}` },
      });
      const wrongMethod = await fetch(new URL(PREVIEW_MANIFEST_PATH, origin), {
        headers,
        method: "POST",
      });
      const servedManifest = await fetch(
        new URL(`${PREVIEW_MANIFEST_PATH}?revision=1`, origin),
        { headers }
      );
      const missing = await fetch(new URL("/v1/missing", origin), { headers });
      const malformed = await fetch(
        new URL("/v1/artifacts/not-a-hash", origin),
        { headers }
      );
      const noncanonical = await fetch(
        new URL(`/v1/artifacts/${firstHash}`, origin),
        { headers }
      );
      const responses = await Promise.all(
        [firstHash, secondHash].map((artifactHash) =>
          fetch(new URL(previewArtifactPath(artifactHash), origin), {
            headers,
          })
        )
      );
      const bodies = await Promise.all(
        responses.map((response) => response.text())
      );
      const unknown = await fetch(
        new URL(previewArtifactPath(unknownHash), origin),
        { headers }
      );
      const events = await fetch(new URL(PREVIEW_EVENTS_PATH, origin), {
        headers,
      });
      const reader = events.body?.getReader();
      const initial = await reader?.read();
      http.publish(state);
      const changed = await reader?.read();
      http.close();
      const closed = await reader?.read();

      expect(responses.map(({ status }) => status)).toEqual([200, 200]);
      expect(bodies).toEqual([firstBody, secondBody]);
      expect(unauthenticated.status).toBe(401);
      expect(wrongToken.status).toBe(401);
      expect(wrongMethod.status).toBe(405);
      expect(wrongMethod.headers.get("allow")).toBe("GET");
      expect(servedManifest.status).toBe(200);
      await expect(servedManifest.json()).resolves.toEqual(manifest);
      expect(missing.status).toBe(404);
      expect(malformed.status).toBe(409);
      expect(noncanonical.status).toBe(409);
      expect(unknown.status).toBe(409);
      expect(new TextDecoder().decode(initial?.value)).toContain(
        '"revision":1'
      );
      expect(new TextDecoder().decode(changed?.value)).toContain(
        '"revision":1'
      );
      expect(closed?.done).toBe(true);
    } finally {
      http.close();
      await close(server);
    }
  }, 30_000);
});
