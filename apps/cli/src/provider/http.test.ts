import type { ServerResponse } from "node:http";
import { describe, expect, it } from "@effect/vitest";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { localPreviewArtifactPath } from "@nakafa/aksara-contracts/preview/artifact";
import { MaterialPreviewDocumentSchema } from "@nakafa/aksara-contracts/preview/document";
import {
  LOCAL_PREVIEW_FORMAT,
  LocalPreviewManifestSchema,
  PreviewRepositorySchema,
} from "@nakafa/aksara-contracts/preview/spec";
import { Effect, HashMap, Logger, Schema } from "effect";
import { TestClock } from "effect/testing";
import {
  PREVIEW_EVENTS_PATH,
  PREVIEW_MANIFEST_PATH,
  type PreviewHttpState,
} from "#cli/provider/http";
import { encodeJsonText } from "#cli/text/json";
import {
  KEEP_ALIVE_LINE,
  keepAliveLineCounter,
  makeEventReader,
  openEventStream,
  readBodyChunk,
  waitFor,
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
        yield* Effect.sync(() => http.publish(state));
        const changed = yield* readBodyChunk(reader);
        yield* Effect.sync(() => http.close());
        const closed = yield* readProviderEvent(reader);

        expect(responses.map(({ status }) => status)).toEqual([200, 200]);
        expect(bodies).toEqual([firstBody, secondBody]);
        expect(unauthenticated.status).toBe(401);
        expect(wrongToken.status).toBe(401);
        expect(wrongMethod.status).toBe(405);
        expect(wrongMethod.headers.allow).toBe("GET");
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

  it.effect(
    "keeps an idle event stream alive without publishing an update",
    () =>
      Effect.gen(function* () {
        const state = yield* makeState();
        const countLines = yield* keepAliveLineCounter;
        const { http, origin, server } = yield* openPreviewHttpServer(
          state,
          10
        );
        const closedStreams: ServerResponse[] = [];
        server.on("request", (_request, response) => {
          response.once("close", () => closedStreams.push(response));
        });
        const reader = yield* openEventStream(origin);
        const readEvent = makeEventReader(reader);

        expect(yield* readEvent()).toContain("event: update\n");
        yield* TestClock.adjust(9);
        expect(countLines()).toBe(0);
        yield* TestClock.adjust(1);
        expect(yield* readEvent()).toBe(KEEP_ALIVE_LINE);
        expect(countLines()).toBe(1);
        yield* TestClock.adjust(10);
        expect(yield* readEvent()).toBe(KEEP_ALIVE_LINE);
        expect(countLines()).toBe(2);
        yield* cancelProviderEvent(reader);
        yield* waitFor(() => {
          expect(closedStreams).toHaveLength(1);
        });
        yield* TestClock.adjust(30);
        expect(countLines()).toBe(2);
        yield* Effect.sync(() => http.close());
        yield* TestClock.adjust(30);
        expect(countLines()).toBe(2);
      }),
    30_000
  );

  it.effect(
    "stops every heartbeat when the transport closes",
    () =>
      Effect.gen(function* () {
        const state = yield* makeState();
        const countLines = yield* keepAliveLineCounter;
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
        expect(countLines()).toBe(2);
        yield* Effect.sync(() => http.close());
        expect((yield* readProviderEvent(firstReader)).done).toBe(true);
        expect((yield* readProviderEvent(secondReader)).done).toBe(true);
        yield* TestClock.adjust(30);
        expect(countLines()).toBe(2);
      }),
    30_000
  );

  it.effect(
    "logs a failed keep-alive write before its heartbeat stops",
    () => {
      const logs: string[] = [];
      return Effect.gen(function* () {
        const state = yield* makeState();
        let keepAliveAttempts = 0;
        const { origin, server } = yield* openPreviewHttpServer(state, 10);
        server.on("request", (_request, response) => {
          const write = response.write.bind(response);
          response.write = (...args: Parameters<typeof write>) => {
            if (args[0] === KEEP_ALIVE_LINE) {
              keepAliveAttempts += 1;
              throw new Error("socket write failed");
            }
            return write(...args);
          };
        });
        const reader = yield* openEventStream(origin);
        const readEvent = makeEventReader(reader);

        expect(yield* readEvent()).toContain("event: update\n");
        yield* TestClock.adjust(10);
        yield* waitFor(() => {
          expect(keepAliveAttempts).toBe(1);
          expect(logs).toEqual([
            expect.stringContaining("socket write failed"),
          ]);
        });
        yield* TestClock.adjust(20);
        expect(keepAliveAttempts).toBe(1);
        yield* cancelProviderEvent(reader);
      }).pipe(
        Effect.provide(
          Logger.layer([
            Logger.make(({ message }) => {
              logs.push(String(message));
            }),
          ])
        )
      );
    },
    30_000
  );
});
