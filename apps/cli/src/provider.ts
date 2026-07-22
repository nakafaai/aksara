import { Buffer } from "node:buffer";
import { timingSafeEqual } from "node:crypto";
import {
  createServer,
  type IncomingMessage,
  type Server,
  type ServerResponse,
} from "node:http";
import type { AddressInfo } from "node:net";
import {
  canonicalizeSignedContentArtifact,
  type SignedContentArtifact,
} from "@nakafa/aksara-contracts/content";
import type { Sha256Hash } from "@nakafa/aksara-contracts/ids";
import {
  LOCAL_PREVIEW_FORMAT,
  type LocalPreviewManifest,
  LocalPreviewManifestSchema,
  type PreviewDocument,
  PreviewEventSchema,
  type PreviewRepository,
} from "@nakafa/aksara-contracts/preview/spec";
import type { MaterialLessonProjection } from "@nakafa/aksara-contracts/projection/material";
import { Effect, Redacted, Schema } from "effect";
import { isAddressInfo } from "#cli/address";

export const PREVIEW_MANIFEST_PATH = "/v1/manifest";
export const PREVIEW_EVENTS_PATH = "/v1/events";
const ARTIFACT_PREFIX = "/v1/artifacts/";

/** Loopback provider startup or state encoding failed safely. */
export class PreviewProviderError extends Schema.TaggedError<PreviewProviderError>()(
  "PreviewProviderError",
  { stage: Schema.Literal("encode", "listen") }
) {}

/** Sanitized failure shown instead of an older changed-route body. */
export interface PreviewFailure {
  readonly code: string;
  readonly message: string;
}

/** Exact values served only after compilation and signing succeed together. */
export interface PreviewReadyInput {
  readonly artifact: SignedContentArtifact;
  readonly projection: MaterialLessonProjection;
  readonly rendererManifestHash: Sha256Hash;
}

/** Scoped provider controls used by the authoring workflow. */
export interface PreviewProvider {
  readonly eventsPath: typeof PREVIEW_EVENTS_PATH;
  /** Publishes a sanitized changed-route error without retaining an artifact. */
  readonly failed: (
    failure: PreviewFailure
  ) => Effect.Effect<void, PreviewProviderError>;
  readonly manifestPath: typeof PREVIEW_MANIFEST_PATH;
  readonly origin: URL;
  /** Clears the old artifact before a changed document starts compiling. */
  readonly pending: () => Effect.Effect<void, PreviewProviderError>;
  /** Atomically exposes one signed artifact and its matching route projection. */
  readonly ready: (
    input: PreviewReadyInput
  ) => Effect.Effect<void, PreviewProviderError>;
}

interface PreviewProviderInput {
  readonly document: PreviewDocument;
  readonly repositories: {
    readonly aksara: PreviewRepository;
    readonly nakafa: PreviewRepository;
  };
  readonly token: Redacted.Redacted<string>;
}

interface ProviderState {
  readonly artifactJson?: string;
  readonly artifactPath?: string;
  readonly manifest: LocalPreviewManifest;
  readonly manifestJson: string;
}

/** Writes one bounded JSON response with cache and sniffing disabled. */
function writeJson(response: ServerResponse, status: number, body: string) {
  response.writeHead(status, {
    "cache-control": "no-store",
    "content-type": "application/json; charset=utf-8",
    "x-content-type-options": "nosniff",
  });
  response.end(body);
}

/** Compares one bearer header without data-dependent token comparison. */
function hasValidToken(header: string | undefined, token: string) {
  const expected = Buffer.from(`Bearer ${token}`, "utf8");
  const actual = Buffer.from(header ?? "", "utf8");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

/** Encodes one exact manifest before it can become visible to HTTP callbacks. */
const encodeManifest = Effect.fn("AksaraCli.encodePreviewManifest")(
  (manifest: LocalPreviewManifest) =>
    Schema.decodeUnknown(LocalPreviewManifestSchema)(manifest, {
      onExcessProperty: "error",
    }).pipe(
      Effect.mapError(() => new PreviewProviderError({ stage: "encode" })),
      Effect.map((decoded) => ({
        manifest: decoded,
        manifestJson: JSON.stringify(decoded),
      }))
    )
);

/** Returns the exact request path without normalizing traversal segments. */
function requestPath(request: IncomingMessage) {
  const url = String(request.url);
  const queryIndex = url.indexOf("?");
  return queryIndex === -1 ? url : url.slice(0, queryIndex);
}

/** Creates the authenticated request handler around mutable scoped state. */
function makeRequestHandler(input: {
  readonly clients: Set<ServerResponse>;
  /** Returns the current atomically replaced provider state. */
  readonly readState: () => ProviderState;
  readonly token: string;
}) {
  return (request: IncomingMessage, response: ServerResponse) => {
    if (!hasValidToken(request.headers.authorization, input.token)) {
      writeJson(response, 401, '{"error":"unauthorized"}');
      return;
    }
    if (request.method !== "GET") {
      response.setHeader("allow", "GET");
      writeJson(response, 405, '{"error":"method"}');
      return;
    }
    const path = requestPath(request);
    const state = input.readState();
    if (path === PREVIEW_MANIFEST_PATH) {
      writeJson(response, 200, state.manifestJson);
      return;
    }
    if (path === PREVIEW_EVENTS_PATH) {
      response.writeHead(200, {
        "cache-control": "no-store",
        connection: "keep-alive",
        "content-type": "text/event-stream; charset=utf-8",
      });
      input.clients.add(response);
      response.write(`event: update\ndata: ${eventJson(state.manifest)}\n\n`);
      request.once("close", () => input.clients.delete(response));
      return;
    }
    if (path === state.artifactPath && state.artifactJson) {
      writeJson(response, 200, state.artifactJson);
      return;
    }
    const status = path.startsWith(ARTIFACT_PREFIX) ? 409 : 404;
    writeJson(response, status, `{"error":"${status}"}`);
  };
}

/** Serializes one minimal event derived from already validated state. */
function eventJson(manifest: LocalPreviewManifest) {
  return JSON.stringify(
    PreviewEventSchema.make({
      format: LOCAL_PREVIEW_FORMAT,
      revision: manifest.revision,
      status: manifest.status,
    })
  );
}

/** Notifies every live client after the manifest and artifact change together. */
function broadcast(clients: Set<ServerResponse>, state: ProviderState) {
  const event = `event: update\ndata: ${eventJson(state.manifest)}\n\n`;
  for (const client of clients) {
    client.write(event);
  }
}

/** Starts one HTTP server and proves it bound only to IPv4 loopback. */
function listenLoopback(server: Server) {
  return Effect.async<AddressInfo, PreviewProviderError>((resume) => {
    server.once("error", () =>
      resume(Effect.fail(new PreviewProviderError({ stage: "listen" })))
    );
    server.listen({ host: "127.0.0.1", port: 0 }, () => {
      const address = server.address();
      if (
        isAddressInfo(address) &&
        address.address === "127.0.0.1" &&
        address.family === "IPv4"
      ) {
        resume(Effect.succeed(address));
      } else {
        server.close(() =>
          resume(Effect.fail(new PreviewProviderError({ stage: "listen" })))
        );
      }
    });
    return Effect.sync(() => {
      server.close();
    });
  });
}

/** Closes event streams before stopping the scoped loopback server. */
function closeServer(server: Server, clients: Set<ServerResponse>) {
  return Effect.async<void>((resume) => {
    for (const client of clients) {
      client.end();
    }
    clients.clear();
    server.close(() => resume(Effect.void));
  });
}

/** Opens one bearer-protected provider whose artifact state fails closed. */
export const openPreviewProvider = Effect.fn("AksaraCli.openPreviewProvider")(
  function* (input: PreviewProviderInput) {
    const base = {
      document: input.document,
      format: LOCAL_PREVIEW_FORMAT,
      repositories: input.repositories,
    } satisfies Pick<
      LocalPreviewManifest,
      "document" | "format" | "repositories"
    >;
    let state: ProviderState = yield* encodeManifest({
      ...base,
      revision: 1,
      status: "pending",
    });
    const clients = new Set<ServerResponse>();
    const token = Redacted.value(input.token);
    const server = createServer(
      makeRequestHandler({
        clients,
        readState: () => state,
        token,
      })
    );
    const address = yield* Effect.uninterruptibleMask((restore) =>
      restore(listenLoopback(server)).pipe(
        Effect.tap(() =>
          Effect.addFinalizer(() => closeServer(server, clients))
        )
      )
    );
    /** Replaces the complete served state before notifying connected clients. */
    const update = Effect.fn("AksaraCli.updatePreviewProvider")(
      (next: LocalPreviewManifest, artifact?: SignedContentArtifact) =>
        encodeManifest(next).pipe(
          Effect.map((encoded) => {
            state = artifact
              ? {
                  ...encoded,
                  artifactJson: canonicalizeSignedContentArtifact(artifact),
                  artifactPath: `${ARTIFACT_PREFIX}${encodeURIComponent(
                    artifact.artifactHash
                  )}`,
                }
              : encoded;
            return broadcast(clients, state);
          })
        )
    );
    return {
      eventsPath: PREVIEW_EVENTS_PATH,
      failed: (failure) =>
        update({
          ...base,
          failure,
          revision: state.manifest.revision + 1,
          status: "failed",
        }),
      manifestPath: PREVIEW_MANIFEST_PATH,
      origin: new URL(`http://127.0.0.1:${address.port}`),
      pending: () =>
        update({
          ...base,
          revision: state.manifest.revision + 1,
          status: "pending",
        }),
      ready: (ready) => {
        const artifactPath = `${ARTIFACT_PREFIX}${encodeURIComponent(
          ready.artifact.artifactHash
        )}`;
        return update(
          {
            ...base,
            artifactHash: ready.artifact.artifactHash,
            artifactPath,
            projection: ready.projection,
            rendererManifestHash: ready.rendererManifestHash,
            revision: state.manifest.revision + 1,
            status: "ready",
          },
          ready.artifact
        );
      },
    } satisfies PreviewProvider;
  }
);
