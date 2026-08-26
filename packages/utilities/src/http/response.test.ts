import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";
import { HttpClientRequest, HttpClientResponse } from "effect/unstable/http";
import {
  BodyError,
  hasDirectives,
  isJsonType,
  readBytes,
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
const reject = Effect.fn("HttpResponseTest.reject")(
  (input: HttpClientResponse.HttpClientResponse, limit = 4) =>
    readText(input, limit).pipe(Effect.flip)
);

describe("HTTP response utilities", () => {
  it("matches strict JSON media types and exact cache directives", () => {
    assert.strictEqual(isJsonType("Application/JSON; charset=utf-8"), true);
    assert.strictEqual(isJsonType("application/json-evil"), false);
    assert.strictEqual(isJsonType(undefined), false);
    assert.strictEqual(
      hasDirectives("Private, NO-STORE", ["private", "no-store"]),
      true
    );
    assert.strictEqual(
      hasDirectives("private, x-no-store", ["private", "no-store"]),
      false
    );
    assert.strictEqual(hasDirectives(undefined, ["no-store"]), false);
  });

  it.effect("assembles streamed bytes within the declared ceiling", () =>
    Effect.gen(function* () {
      const stream = new ReadableStream<Uint8Array>({
        /** Emits two chunks to verify incremental bounded assembly. */
        start(controller) {
          controller.enqueue(Uint8Array.from([1, 2]));
          controller.enqueue(Uint8Array.from([3, 4]));
          controller.close();
        },
      });

      const bounded = response(stream, {
        headers: { "content-length": "4" },
      });

      assert.deepStrictEqual(
        yield* readBytes(bounded, 4),
        Uint8Array.from([1, 2, 3, 4])
      );
      assert.strictEqual(yield* readText(response("text"), 4), "text");
    })
  );

  it.effect(
    "classifies unsafe lengths, overflows, empty bodies, and streams",
    () =>
      Effect.gen(function* () {
        const failed = new ReadableStream<Uint8Array>({
          /** Fails while the consumer reads the response stream. */
          pull(controller) {
            controller.error(new Error("Test stream failure."));
          },
        });
        const errors = yield* Effect.all(
          [
            reject(
              response("ok", { headers: { "content-length": "invalid" } })
            ),
            reject(response("ok", { headers: { "content-length": "-1" } })),
            reject(response("ok", { headers: { "content-length": "1.5" } })),
            reject(response("ok", { headers: { "content-length": "5" } })),
            reject(response(""), -1),
            reject(response(""), 1.5),
            reject(response("12345")),
            reject(response(null)),
            reject(response(failed)),
            reject(response(Uint8Array.from([0xc3, 0x28]))),
          ],
          { concurrency: "unbounded" }
        );

        assert.deepStrictEqual(
          errors.map(({ reason }) => reason),
          [
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
          ]
        );
        assert.ok(errors.every((error) => error instanceof BodyError));
      })
  );
});
