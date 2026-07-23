import { Effect, Schema, Stream } from "effect";
import { describe, expect, it } from "vitest";
import { ContentRouteItemSchema } from "#contracts/release/route";
import { digestRoutes } from "#contracts/release/route-digest";
import {
  decodeContentRoutes,
  verifyContentRoutes,
} from "#contracts/release/routes";
import type { ContentReleaseManifest } from "#contracts/release/spec";
import { release } from "#contracts/test/request";

const { releaseId } = release.manifest;

/** Builds one ordered route binding at a deterministic identity. */
function route(index: number, publicPath = `subjects/test/${index}`) {
  return Schema.decodeUnknownSync(ContentRouteItemSchema)({
    change: {
      contentKey: `test:route-${index}`,
      locale: "en",
      operation: "bind",
      publicPath,
    },
    index,
    releaseId,
  });
}

/** Binds exact signed route evidence onto the shared test manifest. */
async function manifest(routes: readonly ReturnType<typeof route>[]) {
  const summary = await Effect.runPromise(
    digestRoutes(releaseId, Stream.fromIterable(routes))
  );
  return {
    ...release.manifest,
    routeCount: summary.count,
    routeDigest: summary.digest,
  } satisfies ContentReleaseManifest;
}

describe("route verification", () => {
  it("strictly decodes and verifies canonical route streams", async () => {
    const routes = [route(0), route(1)];
    const signedManifest = await manifest(routes);
    const decoded = await Effect.runPromise(
      decodeContentRoutes({
        manifest: signedManifest,
        routes: Stream.fromIterable(routes),
      }).pipe(Stream.runCollect)
    );
    const verified = await Effect.runPromise(
      verifyContentRoutes({
        manifest: signedManifest,
        routes: Stream.fromIterable(routes),
      })
    );

    expect(Array.from(decoded)).toEqual(routes);
    expect(verified).toEqual({ count: 2 });
  });

  it("rejects malformed, foreign, skipped, and duplicate routes", async () => {
    const valid = route(0);
    const signedManifest = await manifest([valid]);
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
            change: { ...route(1).change, publicPath: valid.change.publicPath },
          },
        ],
      },
    ];

    const errors = await Promise.all(
      failures.map((failure) =>
        Effect.runPromise(
          decodeContentRoutes({
            manifest: signedManifest,
            routes: Stream.fromIterable(failure.routes),
          }).pipe(Stream.runDrain, Effect.flip)
        ).then((error) => ({ error, expected: failure.expected }))
      )
    );
    for (const { error, expected } of errors) {
      expect(error._tag).toBe(expected);
    }
  });

  it("rejects signed count and digest mismatches", async () => {
    const routes = [route(0)];
    const signedManifest = await manifest(routes);
    const countError = await Effect.runPromise(
      verifyContentRoutes({
        manifest: { ...signedManifest, routeCount: 2 },
        routes: Stream.fromIterable(routes),
      }).pipe(Effect.flip)
    );
    const digestError = await Effect.runPromise(
      verifyContentRoutes({
        manifest: {
          ...signedManifest,
          routeDigest: release.manifest.routeDigest,
        },
        routes: Stream.fromIterable(routes),
      }).pipe(Effect.flip)
    );

    expect(countError._tag).toBe("RouteCountError");
    expect(digestError._tag).toBe("RouteDigestError");
  });
});
