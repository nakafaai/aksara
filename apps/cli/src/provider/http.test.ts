import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { MaterialPreviewDocumentSchema } from "@nakafa/aksara-contracts/preview/document";
import {
  LOCAL_PREVIEW_FORMAT,
  LocalPreviewManifestSchema,
  localPreviewArtifactPath,
  PreviewRepositorySchema,
} from "@nakafa/aksara-contracts/preview/spec";
import { HashMap, Schema } from "effect";
import { describe, expect, it, vi } from "vitest";
import { isAddressInfo } from "#cli/address";
import {
  makePreviewHttp,
  PREVIEW_EVENTS_PATH,
  PREVIEW_MANIFEST_PATH,
  type PreviewHttpState,
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

/** Creates the complete immutable provider state shared by transport tests. */
function makeState(): PreviewHttpState {
  const document = Schema.decodeSync(MaterialPreviewDocumentSchema)({
    delivery: ENGLISH_ENTRY.delivery,
    family: "material",
    rendererDomain: ENGLISH_ENTRY.rendererDomain,
    route: ENGLISH_ENTRY.route,
    sourcePath: ENGLISH_ENTRY.sourcePath,
  });
  const repository = Schema.decodeSync(PreviewRepositorySchema)({
    dirty: false,
    sha: "a".repeat(40),
  });
  const manifest = Schema.decodeSync(LocalPreviewManifestSchema)({
    document,
    format: LOCAL_PREVIEW_FORMAT,
    repositories: { aksara: repository, nakafa: repository },
    revision: 1,
    status: "pending",
  });

  return {
    artifacts: HashMap.fromIterable([
      [firstHash, firstBody],
      [secondHash, secondBody],
    ]),
    manifest,
    manifestJson: JSON.stringify(manifest),
  };
}

/** Reads exactly one complete SSE block without assuming network chunking. */
function makeEventReader(reader: ReadableStreamDefaultReader<Uint8Array>) {
  const decoder = new TextDecoder();
  let buffered = "";

  /** Reads the next complete block and retains any following bytes. */
  const readEvent = async (): Promise<string> => {
    const boundary = buffered.indexOf("\n\n");
    if (boundary >= 0) {
      const event = buffered.slice(0, boundary + 2);
      buffered = buffered.slice(boundary + 2);
      return event;
    }

    const result = await reader.read();
    if (result.done) {
      throw new Error("Preview event stream closed before a complete block.");
    }
    buffered += decoder.decode(result.value, { stream: true });
    return readEvent();
  };

  return readEvent;
}

describe("preview HTTP transport", () => {
  it("serves every immutable hash entry and conflicts on unknown hashes", async () => {
    const state = makeState();
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
          fetch(new URL(localPreviewArtifactPath(artifactHash), origin), {
            headers,
          })
        )
      );
      const bodies = await Promise.all(
        responses.map((response) => response.text())
      );
      const unknown = await fetch(
        new URL(localPreviewArtifactPath(unknownHash), origin),
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
      await expect(servedManifest.json()).resolves.toEqual(state.manifest);
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

  it("keeps an idle event stream alive without publishing an update", async () => {
    const state = makeState();
    const setIntervalSpy = vi.spyOn(globalThis, "setInterval");
    const clearIntervalSpy = vi.spyOn(globalThis, "clearInterval");
    const http = makePreviewHttp({
      heartbeatIntervalMs: 10,
      readState: () => state,
      token: testToken,
    });
    const server = createServer(http.handle);

    try {
      const address = await listen(server);
      const events = await fetch(
        `http://127.0.0.1:${address.port}${PREVIEW_EVENTS_PATH}`,
        { headers: { authorization: `Bearer ${testToken}` } }
      );
      const reader = events.body?.getReader();
      if (!reader) {
        throw new Error("Preview event response did not expose a body.");
      }
      const readEvent = makeEventReader(reader);

      await expect(readEvent()).resolves.toContain("event: update\n");
      await expect(readEvent()).resolves.toBe(": keep-alive\n\n");
      const heartbeatIndex = setIntervalSpy.mock.calls.findIndex(
        ([, delay]) => delay === 10
      );
      const heartbeat = setIntervalSpy.mock.results[heartbeatIndex]?.value;
      expect(heartbeatIndex).toBeGreaterThanOrEqual(0);
      await reader.cancel();
      await vi.waitFor(() => {
        expect(clearIntervalSpy).toHaveBeenCalledWith(heartbeat);
      });
      http.close();
      expect(
        clearIntervalSpy.mock.calls.filter(([timer]) => timer === heartbeat)
      ).toHaveLength(1);
    } finally {
      http.close();
      await close(server);
      vi.restoreAllMocks();
    }
  }, 30_000);
});
