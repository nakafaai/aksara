import { HttpClientRequest, HttpClientResponse } from "@effect/platform";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import {
  BodyError,
  hasDirectives,
  isJsonType,
  readText,
} from "#utilities/http/response";

const REQUEST = HttpClientRequest.get("https://response.test.invalid");

/** Wraps a web response with the official Effect response adapter. */
function response(
  body: ConstructorParameters<typeof Response>[0],
  init: ResponseInit = {}
) {
  return HttpClientResponse.fromWeb(REQUEST, new Response(body, init));
}

/** Reads one bounded response failure without leaking the source error. */
function reject(input: HttpClientResponse.HttpClientResponse, limit = 4) {
  return Effect.runPromise(readText(input, limit).pipe(Effect.flip));
}

describe("HTTP response utilities", () => {
  it("matches strict JSON media types and exact cache directives", () => {
    expect(isJsonType("Application/JSON; charset=utf-8")).toBe(true);
    expect(isJsonType("application/json-evil")).toBe(false);
    expect(isJsonType(undefined)).toBe(false);
    expect(hasDirectives("Private, NO-STORE", ["private", "no-store"])).toBe(
      true
    );
    expect(hasDirectives("private, x-no-store", ["private", "no-store"])).toBe(
      false
    );
    expect(hasDirectives(undefined, ["no-store"])).toBe(false);
  });

  it("assembles streamed bytes within the declared ceiling", async () => {
    const stream = new ReadableStream<Uint8Array>({
      /** Emits two chunks to verify incremental bounded assembly. */
      start(controller) {
        controller.enqueue(Uint8Array.from([1, 2]));
        controller.enqueue(Uint8Array.from([3, 4]));
        controller.close();
      },
    });

    await expect(
      Effect.runPromise(
        readText(response(stream, { headers: { "content-length": "4" } }), 4)
      )
    ).resolves.toBe("\u0001\u0002\u0003\u0004");
  });

  it("classifies unsafe lengths, overflows, empty bodies, and streams", async () => {
    const failed = new ReadableStream<Uint8Array>({
      /** Fails while the consumer reads the response stream. */
      pull(controller) {
        controller.error(new Error("Test stream failure."));
      },
    });
    const errors = await Promise.all([
      reject(response("ok", { headers: { "content-length": "invalid" } })),
      reject(response("ok", { headers: { "content-length": "-1" } })),
      reject(response("ok", { headers: { "content-length": "1.5" } })),
      reject(response("ok", { headers: { "content-length": "5" } })),
      reject(response(""), -1),
      reject(response(""), 1.5),
      reject(response("12345")),
      reject(response(null)),
      reject(response(failed)),
      reject(response(Uint8Array.from([0xc3, 0x28]))),
    ]);

    expect(errors.map(({ reason }) => reason)).toEqual([
      "length",
      "length",
      "length",
      "length",
      "length",
      "length",
      "limit",
      "empty",
      "stream",
      "encoding",
    ]);
    expect(errors.every((error) => error instanceof BodyError)).toBe(true);
  });
});
