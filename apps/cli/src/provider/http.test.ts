import { describe, expect, it } from "@effect/vitest";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { localPreviewArtifactPath } from "@nakafa/aksara-contracts/preview/artifact";
import { MaterialPreviewDocumentSchema } from "@nakafa/aksara-contracts/preview/document";
import {
  LOCAL_PREVIEW_FORMAT,
  LocalPreviewManifestSchema,
  PreviewRepositorySchema,
} from "@nakafa/aksara-contracts/preview/spec";
import { Array as Arr, Effect, Fiber, HashMap, Schema } from "effect";
import { TestClock } from "effect/testing";
import {
  PREVIEW_EVENTS_PATH,
  PREVIEW_MANIFEST_PATH,
  type PreviewHttpState,
} from "#cli/provider/http";
import { encodeJsonText } from "#cli/text/json";
import {
  KEEP_ALIVE_LINE,
  makeEventReader,
  openEventStream,
  readBodyChunk,
} from "#test/events";
import {
  cancelProviderEvent,
  openPreviewHttpReader,
  openPreviewHttpServer,
  PREVIEW_PROVIDER_TEST_TOKEN,
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
    manifestJson: encodeJsonText(manifest),
  } satisfies PreviewHttpState;
});

/** Decodes the served manifest directly from its JSON wire representation. */
const responseManifest = Effect.fn("AksaraCliTest.decodePreviewHttpManifest")(
  (response: Parameters<typeof responseText>[0]) =>
    responseText(response).pipe(
      Effect.flatMap(
        Schema.decodeEffect(Schema.fromJsonString(LocalPreviewManifestSchema))
      )
    )
);

describe("preview HTTP transport", () => {
  it.live(
    "serves every immutable hash entry and conflicts on unknown hashes",
    () =>
      Effect.scoped(
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
            requestPreviewHttp(new URL("/artifacts/not-a-hash", origin), {
              headers,
            }),
            requestPreviewHttp(new URL(`/artifacts/${firstHash}`, origin), {
              headers,
            }),
          ]);
          const responses = yield* Effect.forEach(
            [firstHash, secondHash],
            (artifactHash) =>
              requestPreviewHttp(
                new URL(localPreviewArtifactPath(artifactHash), origin),
                { headers }
              )
          );
          const bodies = yield* Effect.forEach(responses, responseText);
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
          yield* http.publish(state);
          const changed = yield* readBodyChunk(reader);
          yield* http.close;
          const closed = yield* readProviderEvent(reader);

          expect(Arr.map(responses, ({ status }) => status)).toEqual([
            200, 200,
          ]);
          expect(bodies).toEqual([firstBody, secondBody]);
          expect(unauthenticated.status).toBe(401);
          expect(wrongToken.status).toBe(401);
          expect(wrongMethod.status).toBe(405);
          expect(wrongMethod.headers.allow).toBe("GET");
          expect(servedManifest.status).toBe(200);
          expect(yield* responseManifest(servedManifest)).toEqual(
            state.manifest
          );
          expect(missing.status).toBe(404);
          expect(malformed.status).toBe(409);
          expect(noncanonical.status).toBe(409);
          expect(unknown.status).toBe(409);
          expect(new TextDecoder().decode(initial)).toContain('"revision":1');
          expect(new TextDecoder().decode(changed)).toContain('"revision":1');
          expect(closed.done).toBe(true);
        })
      ),
    30_000
  );

  it.effect(
    "keeps an idle event stream alive without publishing an update",
    () =>
      Effect.scoped(
        Effect.gen(function* () {
          const state = yield* makeState();
          const { origin } = yield* openPreviewHttpServer(state, 10);
          const reader = yield* openEventStream(origin);
          const readEvent = makeEventReader(reader);

          expect(yield* readEvent()).toContain("event: update\n");
          const firstHeartbeat = yield* Effect.forkChild(readEvent());
          yield* TestClock.adjust(10);
          expect(yield* Fiber.join(firstHeartbeat)).toBe(KEEP_ALIVE_LINE);
          const secondHeartbeat = yield* Effect.forkChild(readEvent());
          yield* TestClock.adjust(10);
          expect(yield* Fiber.join(secondHeartbeat)).toBe(KEEP_ALIVE_LINE);
          yield* cancelProviderEvent(reader);
        })
      ),
    30_000
  );

  it.effect("stops every heartbeat when the transport closes", () =>
    Effect.scoped(
      Effect.gen(function* () {
        const state = yield* makeState();
        const { http, origin } = yield* openPreviewHttpServer(state, 10);
        const firstReader = yield* openEventStream(origin);
        const secondReader = yield* openEventStream(origin);
        const readFirst = makeEventReader(firstReader);
        const readSecond = makeEventReader(secondReader);

        expect(yield* readFirst()).toContain("event: update\n");
        expect(yield* readSecond()).toContain("event: update\n");
        yield* TestClock.adjust(10);
        expect(yield* readFirst()).toBe(KEEP_ALIVE_LINE);
        expect(yield* readSecond()).toBe(KEEP_ALIVE_LINE);
        yield* http.close;
        expect((yield* readProviderEvent(firstReader)).done).toBe(true);
        expect((yield* readProviderEvent(secondReader)).done).toBe(true);
      })
    )
  );

  it.live("sends a keep-alive on the real clock", () =>
    Effect.scoped(
      Effect.gen(function* () {
        const state = yield* makeState();
        const { origin } = yield* openPreviewHttpServer(state, 20);
        const reader = yield* openEventStream(origin);
        const readEvent = makeEventReader(reader);

        expect(yield* readEvent()).toContain("event: update\n");
        expect(yield* readEvent()).toBe(KEEP_ALIVE_LINE);
        yield* cancelProviderEvent(reader);
      })
    )
  );
});
