import { PublicationRequestSchema } from "@nakafa/aksara-contracts/transport/request";
import type { PublicationResponse } from "@nakafa/aksara-contracts/transport/response";
import { Effect, Match, Redacted, Schema } from "effect";
import {
  HttpClient,
  type HttpClientRequest,
  HttpClientResponse,
} from "effect/unstable/http";
import type { PublicationTarget } from "#publisher/publication/spec";
import type { HttpPublicationTargetConfig } from "#publisher/target/config";
import { makeHttpPublicationTarget } from "#publisher/target/http";
import type { transportRequests } from "#test/transport/spec";
import { transportSuccess } from "#test/transport/success";

/** Exact target endpoint used by captured HTTP client assertions. */
export const endpoint = new URL("https://publish.test.invalid/content");
const token = Redacted.make("test-secret-token");

/** Builds the one authenticated target configuration used by HTTP tests. */
function targetConfig(
  timeout: HttpPublicationTargetConfig["timeout"] = "1 second"
) {
  return { allowInsecureLoopback: false, endpoint, timeout, token };
}

/** Decodes the schema-encoded JSON body captured by a fake HTTP client. */
function decodeRequest(request: HttpClientRequest.HttpClientRequest) {
  if (request.body._tag !== "Uint8Array") {
    return Effect.die("Expected one encoded JSON request body.");
  }
  const source = Buffer.from(request.body.body).toString("utf8");
  return Schema.decodeEffect(Schema.fromJsonString(PublicationRequestSchema))(
    source
  );
}

/** Builds one web response visible through Effect's official client adapter. */
function webResponse(
  request: HttpClientRequest.HttpClientRequest,
  body: PublicationResponse,
  status = 200
) {
  return HttpClientResponse.fromWeb(
    request,
    new Response(JSON.stringify(body), {
      headers: { "content-type": "application/json" },
      status,
    })
  );
}

/** Creates a captured client whose responses derive from strict requests. */
export function capturedClient() {
  const requests: HttpClientRequest.HttpClientRequest[] = [];
  const client = HttpClient.make((request) =>
    Effect.gen(function* () {
      requests.push(request);
      const decoded = yield* decodeRequest(request).pipe(Effect.orDie);
      return webResponse(request, transportSuccess(decoded));
    })
  );
  return { client, requests };
}

/** Constructs the target with an injected client and deterministic timeout. */
export function makeTarget(
  client: HttpClient.HttpClient,
  timeout: HttpPublicationTargetConfig["timeout"] = "1 second"
) {
  return makeHttpPublicationTarget(targetConfig(timeout)).pipe(
    Effect.provideService(HttpClient.HttpClient, client)
  );
}

/** Exposes one expected target failure for direct Effect assertions. */
export function reject<Value, Error>(program: Effect.Effect<Value, Error>) {
  return Effect.flip(program);
}

/** Invokes the matching target operation for one decoded wire request. */
export function invokeTarget(
  target: typeof PublicationTarget.Service,
  request: (typeof transportRequests)[number]
) {
  return Match.value(request).pipe(
    Match.discriminatorsExhaustive("operation")({
      abort: (value) => target.abort(value),
      accept: (value) => target.accept(value),
      activate: (value) => target.activate(value.release),
      activateRecovery: (value) => target.activateRecovery(value.release),
      cleanup: (value) => target.cleanup(value),
      current: () => target.current,
      headPage: (value) => target.headPage(value),
      recovery: (value) => target.recovery(value),
      rollbackPage: (value) => target.rollbackPage(value),
      routePage: (value) => target.routePage(value),
      stageArtifactBatch: (value) => target.stageArtifactBatch(value),
      stageGroup: (value) => target.stageGroup(value),
      stageItemBatch: (value) => target.stageItemBatch(value),
      stageProjectionBatch: (value) => target.stageProjectionBatch(value),
      stageRecovery: (value) =>
        target.stageRecovery({
          release: value.release,
          rendererManifest: value.rendererManifest,
        }),
      stageRelease: (value) =>
        target.stageRelease({
          release: value.release,
          rendererManifest: value.rendererManifest,
        }),
      stageRouteBatch: (value) => target.stageRouteBatch(value),
      stageSnapshot: (value) => target.stageSnapshot(value),
      stageSnapshotBatch: (value) => target.stageSnapshotBatch(value),
      stageTryoutRuntimeBundle: (value) =>
        target.stageTryoutRuntimeBundle(value),
      status: (value) => target.status(value),
      verify: (value) => target.verify(value.release),
    })
  );
}
