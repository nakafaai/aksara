import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema, Stream } from "effect";
import { digestRoutes } from "#contracts/release/route/digest";
import { ContentRouteItemSchema } from "#contracts/release/route/spec";
import {
  decodeContentRoutes,
  verifyContentRoutes,
} from "#contracts/release/route/verify";
import type { ContentReleaseManifest } from "#contracts/release/spec";
import { release } from "#contracts/test/request";

const { releaseId } = release.manifest;

/** Builds one ordered route binding at a deterministic identity. */
function route(index: number, publicPath = `subjects/test/${index}`) {
  return Schema.decodeSync(ContentRouteItemSchema)({
    change: {
      appLocale: "en",
      contentKey: `test:route-${index}`,
      operation: "bind",
      publicPath,
    },
    index,
    releaseId,
  });
}

/** Binds exact signed route evidence onto the shared test manifest. */
const manifest = Effect.fn("RouteVerificationTest.manifest")(function* (
  routes: readonly ReturnType<typeof route>[]
) {
  const summary = yield* digestRoutes(releaseId, Stream.fromIterable(routes));
  return {
    ...release.manifest,
    routeCount: summary.count,
    routeDigest: summary.digest,
  } satisfies ContentReleaseManifest;
});

describe("route verification", () => {
  it.effect("strictly decodes and verifies canonical route streams", () =>
    Effect.gen(function* () {
      const routes = [route(0), route(1)];
      const signedManifest = yield* manifest(routes);
      const decoded = yield* decodeContentRoutes({
        manifest: signedManifest,
        routes: Stream.fromIterable(routes),
      }).pipe(Stream.runCollect);
      const verified = yield* verifyContentRoutes({
        manifest: signedManifest,
        routes: Stream.fromIterable(routes),
      });

      expect(Array.from(decoded)).toEqual(routes);
      expect(verified).toEqual({ count: 2 });
    })
  );

  it.effect("rejects malformed, foreign, skipped, and duplicate routes", () =>
    Effect.gen(function* () {
      const valid = route(0);
      const signedManifest = yield* manifest([valid]);
      const failures = [
        { expected: "RouteDecodeError", routes: [{ ...valid, extra: true }] },
        {
          expected: "RouteIdentityError",
          routes: [{ ...valid, releaseId: "test-other" }],
        },
        {
          expected: "RouteIdentityError",
          routes: [{ ...valid, index: 1 }],
        },
        {
          expected: "RouteDuplicateError",
          routes: [
            valid,
            {
              ...route(1),
              change: {
                ...route(1).change,
                publicPath: valid.change.publicPath,
              },
            },
          ],
        },
      ];

      const errors = yield* Effect.all(
        failures.map((failure) =>
          decodeContentRoutes({
            manifest: signedManifest,
            routes: Stream.fromIterable(failure.routes),
          }).pipe(
            Stream.runDrain,
            Effect.flip,
            Effect.map((error) => ({ error, expected: failure.expected }))
          )
        )
      );
      for (const { error, expected } of errors) {
        expect(error._tag).toBe(expected);
      }
    })
  );

  it.effect("rejects signed count and digest mismatches", () =>
    Effect.gen(function* () {
      const routes = [route(0)];
      const signedManifest = yield* manifest(routes);
      const countError = yield* verifyContentRoutes({
        manifest: { ...signedManifest, routeCount: 2 },
        routes: Stream.fromIterable(routes),
      }).pipe(Effect.flip);
      const digestError = yield* verifyContentRoutes({
        manifest: {
          ...signedManifest,
          routeDigest: release.manifest.routeDigest,
        },
        routes: Stream.fromIterable(routes),
      }).pipe(Effect.flip);

      expect(countError._tag).toBe("RouteCountError");
      expect(digestError._tag).toBe("RouteDigestError");
    })
  );
});
