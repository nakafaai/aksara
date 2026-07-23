import type { BinaryLike } from "node:crypto";
import { Effect, Schema, Stream } from "effect";
import { describe, expect, it, vi } from "vitest";
import { ReleaseIdSchema } from "#contracts/ids";
import { ContentRouteItemSchema } from "#contracts/release/route";
import {
  completeRouteDigest,
  createRouteDigest,
  digestRoutes,
  RouteHashError,
  updateRouteDigest,
} from "#contracts/release/route-digest";

const failures = vi.hoisted(() => ({ create: false, digest: false }));
const releaseId =
  Schema.decodeUnknownSync(ReleaseIdSchema)("test-route-digest");

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
  return Schema.decodeUnknownSync(ContentRouteItemSchema)({
    change: {
      contentKey,
      locale: "en",
      operation: "bind",
      publicPath: "subjects/test/route",
    },
    index: 0,
    releaseId,
  });
}

describe("route digest", () => {
  it("matches streamed and incremental canonical digests", async () => {
    const value = route();
    const initial = await Effect.runPromise(createRouteDigest(releaseId));
    const updated = await Effect.runPromise(
      updateRouteDigest(releaseId, initial, value)
    );
    const digest = await Effect.runPromise(
      completeRouteDigest(releaseId, updated)
    );
    const summary = await Effect.runPromise(
      digestRoutes(releaseId, Stream.make(value))
    );

    expect(summary).toEqual({ count: 1, digest });
    expect(updated.count).toBe(1);
  });

  it("maps creation, update, and completion failures", async () => {
    failures.create = true;
    const creation = await Effect.runPromise(
      createRouteDigest(releaseId).pipe(Effect.flip)
    );
    failures.create = false;
    const initial = await Effect.runPromise(createRouteDigest(releaseId));
    const update = await Effect.runPromise(
      updateRouteDigest(releaseId, initial, route("hash:failure")).pipe(
        Effect.flip
      )
    );
    failures.digest = true;
    const completion = await Effect.runPromise(
      completeRouteDigest(releaseId, initial).pipe(Effect.flip)
    );
    failures.digest = false;

    expect([creation, update, completion]).toEqual([
      new RouteHashError({ releaseId }),
      new RouteHashError({ releaseId }),
      new RouteHashError({ releaseId }),
    ]);
  });
});
