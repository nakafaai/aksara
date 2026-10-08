import type { BinaryLike } from "node:crypto";
import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema, Stream } from "effect";
import { ReleaseIdSchema } from "#contracts/ids";
import {
  completeRouteDigest,
  createRouteDigest,
  digestRoutes,
  RouteHashError,
  updateRouteDigest,
} from "#contracts/release/route/digest";
import { ContentRouteItemSchema } from "#contracts/release/route/spec";

const failures = vi.hoisted(() => ({ create: false, digest: false }));
const releaseId = Schema.decodeSync(ReleaseIdSchema)("test-route-digest");

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    /** Injects deterministic route digest failures. */
    createHash(algorithm: string) {
      if (failures.create) {
        throw new TypeError("injected route digest creation failure");
      }
      const hash = crypto.createHash(algorithm);
      return new Proxy(hash, {
        /** Preserves hash methods while intercepting explicit test markers. */
        get(target, property, receiver) {
          if (property === "update") {
            return (data: BinaryLike) => {
              if (String(data).includes('"contentKey":"hash:failure"')) {
                throw new TypeError("injected route digest update failure");
              }
              target.update(data);
              return receiver;
            };
          }
          if (property === "digest" && failures.digest) {
            return () => {
              throw new TypeError("injected route digest completion failure");
            };
          }
          const value = Reflect.get(target, property, target);
          return typeof value === "function" ? value.bind(target) : value;
        },
      });
    },
  };
});

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
      const initial = yield* createRouteDigest(releaseId);
      const updated = yield* updateRouteDigest(releaseId, initial, value);
      const digest = yield* completeRouteDigest(releaseId, updated);
      const summary = yield* digestRoutes(releaseId, Stream.make(value));

      expect(summary).toEqual({ count: 1, digest });
      expect(updated.count).toBe(1);
    })
  );

  it.effect("maps creation, update, and completion failures", () =>
    Effect.gen(function* () {
      yield* Effect.addFinalizer(() =>
        Effect.sync(() => {
          failures.create = false;
          failures.digest = false;
        })
      );
      yield* Effect.sync(() => {
        failures.create = true;
      });
      const creation = yield* createRouteDigest(releaseId).pipe(Effect.flip);
      yield* Effect.sync(() => {
        failures.create = false;
      });
      const initial = yield* createRouteDigest(releaseId);
      const update = yield* updateRouteDigest(
        releaseId,
        initial,
        route("hash:failure")
      ).pipe(Effect.flip);
      yield* Effect.sync(() => {
        failures.digest = true;
      });
      const completion = yield* completeRouteDigest(releaseId, initial).pipe(
        Effect.flip
      );

      expect([creation, update, completion]).toEqual([
        new RouteHashError({ releaseId }),
        new RouteHashError({ releaseId }),
        new RouteHashError({ releaseId }),
      ]);
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
        const whole = yield* digestRoutes(
          releaseId,
          Stream.make(bind, deletion)
        );
        const split = yield* digestRoutes(
          releaseId,
          Stream.make(bind, deletion).pipe(Stream.rechunk(1))
        );
        const initial = yield* createRouteDigest(releaseId);
        const withBind = yield* updateRouteDigest(releaseId, initial, bind);
        const withDelete = yield* updateRouteDigest(
          releaseId,
          withBind,
          deletion
        );
        const incremental = yield* completeRouteDigest(releaseId, withDelete);

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
