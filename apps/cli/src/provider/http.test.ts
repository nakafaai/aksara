import { describe, expect, it, vi } from "@effect/vitest";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { localPreviewArtifactPath } from "@nakafa/aksara-contracts/preview/artifact";
import { MaterialPreviewDocumentSchema } from "@nakafa/aksara-contracts/preview/document";
import {
  LOCAL_PREVIEW_FORMAT,
  LocalPreviewManifestSchema,
  PreviewRepositorySchema,
} from "@nakafa/aksara-contracts/preview/spec";
import { Effect, HashMap, Schema } from "effect";
import {
  PREVIEW_EVENTS_PATH,
  PREVIEW_MANIFEST_PATH,
  type PreviewHttpState,
} from "#cli/provider/http";
import {
  cancelProviderEvent,
  openPreviewHttpReader,
  openPreviewHttpServer,
  PREVIEW_PROVIDER_TEST_TOKEN,
  PreviewProviderTestError,
  readProviderEvent,
  requestPreviewHttp,
  responseText,
} from "#test/provider";
import { ENGLISH_ENTRY } from "#test/real";

const firstHash = Sha256HashSchema.make(`sha256:${"d".repeat(64)}`);
const secondHash = Sha256HashSchema.make(`sha256:${"e".repeat(64)}`);
const unknownHash = Sha256HashSchema.make(`sha256:${"f".repeat(64)}`);
const firstBody = '{"artifact":"first-test"}';
const secondBody = '{"artifact":"second-test"}';

/** Creates the complete immutable provider state shared by transport tests. */
const makeState = Effect.fn("AksaraCliTest.makePreviewHttpState")(function* () {
  const document = yield* Schema.decodeEffect(MaterialPreviewDocumentSchema)({
    delivery: ENGLISH_ENTRY.delivery,
    family: "material",
    rendererDomain: ENGLISH_ENTRY.rendererDomain,
    route: ENGLISH_ENTRY.route,
    sourcePath: ENGLISH_ENTRY.sourcePath,
  });
  const repository = yield* Schema.decodeEffect(PreviewRepositorySchema)({
    dirty: false,
    sha: "a".repeat(40),
  });
  const manifest = yield* Schema.decodeEffect(LocalPreviewManifestSchema)({
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
  } satisfies PreviewHttpState;
});

/** Decodes the served manifest directly from its JSON wire representation. */
const responseManifest = Effect.fn("AksaraCliTest.decodePreviewHttpManifest")(
  (response: Response) =>
    responseText(response).pipe(
      Effect.flatMap(
        Schema.decodeEffect(Schema.fromJsonString(LocalPreviewManifestSchema))
      )
    )
);

/** Reads one mandatory body chunk and rejects an early stream close. */
const readBodyChunk = Effect.fn("AksaraCliTest.readPreviewHttpBodyChunk")(
  (reader: ReadableStreamDefaultReader<Uint8Array>) =>
    readProviderEvent(reader).pipe(
      Effect.flatMap((result) =>
        result.done
          ? Effect.fail(new PreviewProviderTestError({ stage: "stream" }))
          : Effect.succeed(result.value)
      )
    )
);

/** Reads exactly one complete SSE block without assuming network chunking. */
function makeEventReader(reader: ReadableStreamDefaultReader<Uint8Array>) {
  const decoder = new TextDecoder();
  let buffered = "";

  /** Reads the next complete block and retains any following bytes. */
  return Effect.fn("AksaraCliTest.readPreviewHttpEvent")(() =>
    Effect.gen(function* () {
      let boundary = buffered.indexOf("\n\n");
      while (boundary < 0) {
        buffered += decoder.decode(yield* readBodyChunk(reader), {
          stream: true,
        });
        boundary = buffered.indexOf("\n\n");
      }
      const event = buffered.slice(0, boundary + 2);
      buffered = buffered.slice(boundary + 2);
      return event;
    })
  );
}

/** Waits for one asynchronous Vitest assertion through a typed Effect seam. */
const waitFor = Effect.fn("AksaraCliTest.waitForPreviewHttpAssertion")(
  (assertion: () => void) =>
    Effect.tryPromise({
      catch: (cause) => new PreviewProviderTestError({ cause, stage: "wait" }),
      try: () => vi.waitFor(assertion),
    })
);

describe("preview HTTP transport", () => {
  it.live(
    "serves every immutable hash entry and conflicts on unknown hashes",
    () =>
      Effect.gen(function* () {
        const state = yield* makeState();
        const { http, origin } = yield* openPreviewHttpServer(state);
        const headers = {
          authorization: `Bearer ${PREVIEW_PROVIDER_TEST_TOKEN}`,
        };
        const [
          unauthenticated,
          wrongToken,
          wrongMethod,
          servedManifest,
          missing,
          malformed,
          noncanonical,
        ] = yield* Effect.all([
          requestPreviewHttp(new URL(PREVIEW_MANIFEST_PATH, origin)),
          requestPreviewHttp(new URL(PREVIEW_MANIFEST_PATH, origin), {
            headers: {
              authorization: `Bearer ${"x".repeat(
                PREVIEW_PROVIDER_TEST_TOKEN.length
              )}`,
            },
          }),
          requestPreviewHttp(new URL(PREVIEW_MANIFEST_PATH, origin), {
            headers,
            method: "POST",
          }),
          requestPreviewHttp(
            new URL(`${PREVIEW_MANIFEST_PATH}?revision=1`, origin),
            { headers }
          ),
          requestPreviewHttp(new URL("/v1/missing", origin), { headers }),
          requestPreviewHttp(new URL("/v1/artifacts/not-a-hash", origin), {
            headers,
          }),
          requestPreviewHttp(new URL(`/v1/artifacts/${firstHash}`, origin), {
            headers,
          }),
        ]);
        const responses = yield* Effect.all(
          [firstHash, secondHash].map((artifactHash) =>
            requestPreviewHttp(
              new URL(localPreviewArtifactPath(artifactHash), origin),
              { headers }
            )
          )
        );
        const bodies = yield* Effect.all(responses.map(responseText));
        const unknown = yield* requestPreviewHttp(
          new URL(localPreviewArtifactPath(unknownHash), origin),
          { headers }
        );
        const events = yield* requestPreviewHttp(
          new URL(PREVIEW_EVENTS_PATH, origin),
          { headers }
        );
        const reader = yield* openPreviewHttpReader(events);
        const initial = yield* readBodyChunk(reader);
        yield* Effect.sync(() => http.publish(state));
        const changed = yield* readBodyChunk(reader);
        yield* Effect.sync(() => http.close());
        const closed = yield* readProviderEvent(reader);

        expect(responses.map(({ status }) => status)).toEqual([200, 200]);
        expect(bodies).toEqual([firstBody, secondBody]);
        expect(unauthenticated.status).toBe(401);
        expect(wrongToken.status).toBe(401);
        expect(wrongMethod.status).toBe(405);
        expect(wrongMethod.headers.get("allow")).toBe("GET");
        expect(servedManifest.status).toBe(200);
        expect(yield* responseManifest(servedManifest)).toEqual(state.manifest);
        expect(missing.status).toBe(404);
        expect(malformed.status).toBe(409);
        expect(noncanonical.status).toBe(409);
        expect(unknown.status).toBe(409);
        expect(new TextDecoder().decode(initial)).toContain('"revision":1');
        expect(new TextDecoder().decode(changed)).toContain('"revision":1');
        expect(closed.done).toBe(true);
      }),
    30_000
  );

  it.live(
    "keeps an idle event stream alive without publishing an update",
    () =>
      Effect.gen(function* () {
        const state = yield* makeState();
        const { clearIntervalSpy, setIntervalSpy } =
          yield* Effect.acquireRelease(
            Effect.sync(() => ({
              clearIntervalSpy: vi.spyOn(globalThis, "clearInterval"),
              setIntervalSpy: vi.spyOn(globalThis, "setInterval"),
            })),
            ({ clearIntervalSpy: clearSpy, setIntervalSpy: setSpy }) =>
              Effect.sync(() => {
                clearSpy.mockRestore();
                setSpy.mockRestore();
              })
          );
        const { http, origin } = yield* openPreviewHttpServer(state, 10);
        const events = yield* requestPreviewHttp(
          new URL(PREVIEW_EVENTS_PATH, origin),
          {
            headers: {
              authorization: `Bearer ${PREVIEW_PROVIDER_TEST_TOKEN}`,
            },
          }
        );
        const reader = yield* openPreviewHttpReader(events);
        const readEvent = makeEventReader(reader);

        expect(yield* readEvent()).toContain("event: update\n");
        expect(yield* readEvent()).toBe(": keep-alive\n\n");
        const heartbeatIndex = setIntervalSpy.mock.calls.findIndex(
          ([, delay]) => delay === 10
        );
        const heartbeat = setIntervalSpy.mock.results[heartbeatIndex]?.value;
        expect(heartbeatIndex).toBeGreaterThanOrEqual(0);
        yield* cancelProviderEvent(reader);
        yield* waitFor(() => {
          expect(clearIntervalSpy).toHaveBeenCalledWith(heartbeat);
        });
        yield* Effect.sync(() => http.close());
        expect(
          clearIntervalSpy.mock.calls.filter(([timer]) => timer === heartbeat)
        ).toHaveLength(1);
      }),
    30_000
  );
});
