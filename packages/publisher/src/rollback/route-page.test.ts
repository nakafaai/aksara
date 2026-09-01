import { describe, expect, it } from "@effect/vitest";
import {
  ContentKeySchema,
  PublicPathSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import {
  type RoutePageRequest,
  RoutePageSchema,
  type RouteRollbackRecord,
  RouteRollbackRecordSchema,
} from "@nakafa/aksara-contracts/release/route/page";
import { ContentRouteItemSchema } from "@nakafa/aksara-contracts/release/route/spec";
import { Effect, Stream } from "effect";
import { PublicationTarget } from "#publisher/publication/spec";
import { streamRouteRecords } from "#publisher/rollback/route-page";
import { PublicationTargetTransportError } from "#publisher/target/errors";
import { makePublicationTarget } from "#test/target";

const rollbackOf = ReleaseIdSchema.make("test-route-source");
const rollbackOfManifestHash = Sha256HashSchema.make(
  `sha256:${"d".repeat(64)}`
);

/** Creates one signed route mutation paired with a distinct prior owner. */
function routeRecord(index: number, priorOwner: string | null = null) {
  const currentOwner = ContentKeySchema.make(`test:route-${index}`);
  return RouteRollbackRecordSchema.make({
    current: ContentRouteItemSchema.make({
      change: {
        appLocale: AppLocaleSchema.make("en"),
        contentKey: currentOwner,
        operation: "bind",
        publicPath: PublicPathSchema.make(`subjects/test/route-${index}`),
      },
      index,
      releaseId: rollbackOf,
    }),
    priorContentKey:
      priorOwner === null ? null : ContentKeySchema.make(priorOwner),
  });
}

/** Creates one schema-valid route page for stream protocol tests. */
function page(input: {
  readonly done: boolean;
  readonly nextIndex: number;
  readonly records: readonly RouteRollbackRecord[];
  readonly rollbackOfManifestHash?: typeof rollbackOfManifestHash;
  readonly rollbackOf?: typeof rollbackOf;
  readonly total: number;
}) {
  return RoutePageSchema.make({
    ...input,
    rollbackOf: input.rollbackOf ?? rollbackOf,
    rollbackOfManifestHash:
      input.rollbackOfManifestHash ?? rollbackOfManifestHash,
  });
}

/** Builds one complete target around the selected route page operation. */
function targetWith(
  routePage: (
    request: RoutePageRequest
  ) => ReturnType<(typeof PublicationTarget.Service)["routePage"]>
) {
  return makePublicationTarget({ routePage });
}

/** Collects one complete authenticated route replay. */
const collect = Effect.fn("RoutePageTest.collect")(
  (target: typeof PublicationTarget.Service, expectedTotal = 3) =>
    streamRouteRecords(rollbackOf, rollbackOfManifestHash, expectedTotal).pipe(
      Stream.runCollect,
      Effect.provideService(PublicationTarget, target)
    )
);

/** Returns the typed failure from one route replay. */
const reject = Effect.fn("RoutePageTest.reject")(
  (target: typeof PublicationTarget.Service, expectedTotal = 3) =>
    streamRouteRecords(rollbackOf, rollbackOfManifestHash, expectedTotal).pipe(
      Stream.runCollect,
      Effect.provideService(PublicationTarget, target),
      Effect.flip
    )
);

describe("streamRouteRecords", () => {
  it.effect("replays bounded pages through exact route indexes", () =>
    Effect.gen(function* () {
      const routePage = vi.fn((request: RoutePageRequest) => {
        if (request.afterIndex === -1) {
          return Effect.succeed(
            page({
              done: false,
              nextIndex: 0,
              records: [routeRecord(0)],
              total: 3,
            })
          );
        }
        if (request.afterIndex === 0) {
          return Effect.succeed(
            page({
              done: false,
              nextIndex: 1,
              records: [routeRecord(1, "test:prior")],
              total: 3,
            })
          );
        }
        return Effect.succeed(
          page({
            done: true,
            nextIndex: 2,
            records: [routeRecord(2)],
            total: 3,
          })
        );
      });
      const records = yield* collect(targetWith(routePage));

      expect([...records].map(({ current }) => current.index)).toEqual([
        0, 1, 2,
      ]);
      expect(
        routePage.mock.calls.map(([request]) => request.afterIndex)
      ).toEqual([-1, 0, 1]);
    })
  );

  it.effect("accepts the canonical empty terminal page", () =>
    Effect.gen(function* () {
      const records = yield* collect(
        targetWith(() =>
          Effect.succeed(
            page({ done: true, nextIndex: -1, records: [], total: 0 })
          )
        ),
        0
      );
      expect([...records]).toEqual([]);
    })
  );

  it.effect.each([
    [
      "decode",
      () => ({
        done: true,
        extra: true,
        nextIndex: -1,
        records: [],
        rollbackOf,
        rollbackOfManifestHash,
        total: 0,
      }),
      0,
      "RoutePageDecodeError",
    ],
    [
      "release identity",
      () =>
        page({
          done: true,
          nextIndex: -1,
          records: [],
          rollbackOf: ReleaseIdSchema.make("test-other-release"),
          total: 0,
        }),
      0,
      "RoutePageIdentityError",
    ],
    [
      "manifest identity",
      () =>
        page({
          done: true,
          nextIndex: -1,
          records: [],
          rollbackOfManifestHash: Sha256HashSchema.make(
            `sha256:${"e".repeat(64)}`
          ),
          total: 0,
        }),
      0,
      "RoutePageIdentityError",
    ],
    [
      "cursor",
      () =>
        page({
          done: true,
          nextIndex: 1,
          records: [routeRecord(1)],
          total: 2,
        }),
      2,
      "RoutePageCursorError",
    ],
  ] as const)("rejects invalid %s evidence", ([_label, source, total, tag]) =>
    Effect.gen(function* () {
      const error = yield* reject(
        targetWith(() => Effect.succeed(source())),
        total
      );
      expect(error._tag).toBe(tag);
    })
  );

  it.effect("rejects a total that changes after cursor progress", () =>
    Effect.gen(function* () {
      const target = targetWith((request) =>
        Effect.succeed(
          request.afterIndex === -1
            ? page({
                done: false,
                nextIndex: 0,
                records: [routeRecord(0)],
                total: 3,
              })
            : page({
                done: false,
                nextIndex: 1,
                records: [routeRecord(1)],
                total: 4,
              })
        )
      );
      const error = yield* reject(target);
      expect(error._tag).toBe("RoutePageTotalError");
    })
  );

  it.effect("preserves typed target transport failures", () =>
    Effect.gen(function* () {
      const transport = new PublicationTargetTransportError({
        detail: { reason: "network" },
        stage: "rollback",
      });
      const error = yield* reject(targetWith(() => Effect.fail(transport)));
      expect(error).toEqual(transport);
    })
  );
});
