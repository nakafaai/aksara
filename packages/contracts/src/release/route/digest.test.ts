import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema, Stream } from "effect";
import { ReleaseIdSchema } from "#contracts/ids";
import {
  completeRouteDigest,
  createRouteDigest,
  digestRoutes,
  updateRouteDigest,
} from "#contracts/release/route/digest";
import { ContentRouteItemSchema } from "#contracts/release/route/spec";

const releaseId = Schema.decodeSync(ReleaseIdSchema)("test-route-digest");

/** Builds one ordered route binding for digest tests. */
function route(contentKey = "test:route") {
  return Schema.decodeSync(ContentRouteItemSchema)({
    change: {
      appLocale: "en",
      contentKey,
      operation: "bind",
      publicPath: "subjects/test/route",
    },
    index: 0,
    releaseId,
  });
}

describe("route digest", () => {
  it.effect("matches streamed and incremental canonical digests", () =>
    Effect.gen(function* () {
      const value = route();
      const initial = yield* createRouteDigest;
      const updated = yield* updateRouteDigest(initial, value);
      const digest = yield* completeRouteDigest(updated);
      const summary = yield* digestRoutes(Stream.make(value));

      expect(summary).toEqual({ count: 1, digest });
      expect(updated.count).toBe(1);
    })
  );

  it.effect(
    "pins one digest for the whole stream, one-element chunks, and the incremental fold of the same route stream",
    () =>
      Effect.gen(function* () {
        const bind = route();
        const deletion = yield* Schema.decodeEffect(ContentRouteItemSchema)({
          change: {
            appLocale: "id",
            operation: "delete",
            publicPath: "subjects/test/rute",
          },
          index: 1,
          releaseId,
        });
        const whole = yield* digestRoutes(Stream.make(bind, deletion));
        const split = yield* digestRoutes(
          Stream.make(bind, deletion).pipe(Stream.rechunk(1))
        );
        const initial = yield* createRouteDigest;
        const withBind = yield* updateRouteDigest(initial, bind);
        const withDelete = yield* updateRouteDigest(withBind, deletion);
        const incremental = yield* completeRouteDigest(withDelete);

        expect(whole).toEqual({
          count: 2,
          digest:
            "sha256:ffd8ad538a5f6d06609960cf44215f58265e6ed1a9fe028cac084f70edf3e33a",
        });
        expect(split).toEqual({
          count: 2,
          digest:
            "sha256:ffd8ad538a5f6d06609960cf44215f58265e6ed1a9fe028cac084f70edf3e33a",
        });
        expect(incremental).toBe(
          "sha256:ffd8ad538a5f6d06609960cf44215f58265e6ed1a9fe028cac084f70edf3e33a"
        );
      })
  );
});
