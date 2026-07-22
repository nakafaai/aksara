import { HttpClientRequest, HttpClientResponse } from "@effect/platform";
import { MAX_PUBLICATION_RESPONSE_BYTES } from "@nakafa/aksara-contracts/transport/limits";
import { PublicationStatusRequestSchema } from "@nakafa/aksara-contracts/transport/request";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { readPublicationResponse } from "#publisher/target/response";
import { transportRelease, transportSuccess } from "#test/transport";

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
function reject(input: HttpClientResponse.HttpClientResponse) {
  return Effect.runPromise(
    readPublicationResponse(request, input).pipe(Effect.flip)
  );
}

describe("publication response body", () => {
  it("decodes one bounded strict UTF-8 JSON success", async () => {
    const body = JSON.stringify(transportSuccess(request));
    await expect(
      Effect.runPromise(
        readPublicationResponse(
          request,
          response(body, {
            headers: {
              "content-length": String(Buffer.byteLength(body, "utf8")),
              "content-type": "application/json; charset=utf-8",
            },
          })
        )
      )
    ).resolves.toEqual(transportSuccess(request));
  });

  it("rejects missing content type and invalid declared lengths", async () => {
    const bodies = [
      response("{}"),
      response("{}", { headers: { "content-type": "application/json-evil" } }),
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
    const errors = await Promise.all(bodies.map(reject));
    for (const error of errors) {
      expect(error).toMatchObject({
        _tag: "PublicationTargetProtocolError",
        reason: "response-decoding",
      });
    }
  });

  it("rejects streamed bytes beyond the post-decompression ceiling", async () => {
    const error = await reject(
      response("x".repeat(MAX_PUBLICATION_RESPONSE_BYTES + 1), {
        headers: { "content-type": "application/json" },
      })
    );
    expect(error).toMatchObject({
      _tag: "PublicationTargetProtocolError",
      reason: "response-decoding",
    });
  });

  it("rejects malformed UTF-8, JSON, and excess response properties", async () => {
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
    const errors = await Promise.all(bodies.map(reject));
    expect(
      errors.every(
        (error) =>
          error._tag === "PublicationTargetProtocolError" &&
          error.reason === "response-decoding"
      )
    ).toBe(true);
  });

  it("treats an absent response body as a permanent protocol failure", async () => {
    const error = await reject(
      response(null, { headers: { "content-type": "application/json" } })
    );
    expect(error).toMatchObject({
      _tag: "PublicationTargetProtocolError",
      reason: "response-decoding",
    });
  });

  it("sanitizes response stream failures as retryable network errors", async () => {
    const stream = new ReadableStream<Uint8Array>({
      start: (controller) => controller.error("test-stream-failure"),
    });
    const error = await reject(
      response(stream, { headers: { "content-type": "application/json" } })
    );
    expect(error).toMatchObject({
      _tag: "PublicationTargetTransportError",
      detail: { reason: "network" },
      stage: "status",
    });
    expect(JSON.stringify(error)).not.toContain("test-stream-failure");
  });
});
