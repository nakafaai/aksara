import { describe, expect, it } from "@effect/vitest";
import { MAX_PUBLICATION_RESPONSE_BYTES } from "@nakafa/aksara-contracts/transport/limits";
import { PublicationStatusRequestSchema } from "@nakafa/aksara-contracts/transport/request";
import { Effect } from "effect";
import { HttpClientRequest, HttpClientResponse } from "effect/unstable/http";
import { readPublicationResponse } from "#publisher/target/response";
import { transportRelease } from "#test/transport/spec";
import { transportSuccess } from "#test/transport/success";

const request = PublicationStatusRequestSchema.make({
  manifestHash: transportRelease.manifestHash,
  operation: "status",
  releaseId: transportRelease.manifest.releaseId,
});

/** Wraps one web response with the Effect HTTP client response adapter. */
function response(
  body: ConstructorParameters<typeof Response>[0],
  init: ResponseInit = {}
) {
  const outgoing = HttpClientRequest.get(
    "https://publish.test.invalid/content"
  );
  return HttpClientResponse.fromWeb(outgoing, new Response(body, init));
}

/** Reads one response failure through the target protocol boundary. */
const reject = Effect.fn("PublicationResponseTest.reject")(
  (input: HttpClientResponse.HttpClientResponse) =>
    readPublicationResponse(request, input).pipe(Effect.flip)
);

describe("publication response body", () => {
  it.effect("decodes one bounded strict UTF-8 JSON success", () =>
    Effect.gen(function* () {
      const body = JSON.stringify(transportSuccess(request));
      const result = yield* readPublicationResponse(
        request,
        response(body, {
          headers: {
            "content-length": String(Buffer.byteLength(body, "utf8")),
            "content-type": "application/json; charset=utf-8",
          },
        })
      );
      expect(result).toEqual(transportSuccess(request));
    })
  );

  it.effect("rejects missing content type and invalid declared lengths", () =>
    Effect.gen(function* () {
      const bodies = [
        response("{}"),
        response("{}", {
          headers: { "content-type": "application/json-evil" },
        }),
        ...["invalid", "-1", String(MAX_PUBLICATION_RESPONSE_BYTES + 1)].map(
          (length) =>
            response("{}", {
              headers: {
                "content-length": length,
                "content-type": "application/json",
              },
            })
        ),
      ];
      const errors = yield* Effect.forEach(bodies, reject);
      for (const error of errors) {
        expect(error).toMatchObject({
          _tag: "PublicationTargetProtocolError",
          reason: "response-decoding",
        });
      }
    })
  );

  it.effect(
    "rejects streamed bytes beyond the post-decompression ceiling",
    () =>
      Effect.gen(function* () {
        const error = yield* reject(
          response("x".repeat(MAX_PUBLICATION_RESPONSE_BYTES + 1), {
            headers: { "content-type": "application/json" },
          })
        );
        expect(error).toMatchObject({
          _tag: "PublicationTargetProtocolError",
          reason: "response-decoding",
        });
      })
  );

  it.effect(
    "rejects malformed UTF-8, JSON, and excess response properties",
    () =>
      Effect.gen(function* () {
        const success = transportSuccess(request);
        const bodies = [
          response(new Uint8Array([255]), {
            headers: { "content-type": "application/json" },
          }),
          response("{", { headers: { "content-type": "application/json" } }),
          response(JSON.stringify({ ...success, extra: true }), {
            headers: { "content-type": "application/json" },
          }),
        ];
        const errors = yield* Effect.forEach(bodies, reject);
        expect(
          errors.every(
            (error) =>
              error._tag === "PublicationTargetProtocolError" &&
              error.reason === "response-decoding"
          )
        ).toBe(true);
      })
  );

  it.effect(
    "treats an absent response body as a permanent protocol failure",
    () =>
      Effect.gen(function* () {
        const error = yield* reject(
          response(null, { headers: { "content-type": "application/json" } })
        );
        expect(error).toMatchObject({
          _tag: "PublicationTargetProtocolError",
          reason: "response-decoding",
        });
      })
  );

  it.effect(
    "sanitizes response stream failures as retryable network errors",
    () =>
      Effect.gen(function* () {
        const stream = new ReadableStream<Uint8Array>({
          start: (controller) => controller.error("test-stream-failure"),
        });
        const error = yield* reject(
          response(stream, { headers: { "content-type": "application/json" } })
        );
        expect(error).toMatchObject({
          _tag: "PublicationTargetTransportError",
          detail: { reason: "network" },
          stage: "status",
        });
        expect(JSON.stringify(error)).not.toContain("test-stream-failure");
      })
  );
});
