import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { vi } from "vitest";

import {
  StoredTryoutInventoryDecodeError,
  StoredTryoutInventoryDigestMismatchError,
  StoredTryoutInventoryHashError,
  StoredTryoutInventorySnapshotMismatchError,
  StoredTryoutRowHashMismatchError,
  verifyStoredTryoutInventory,
} from "#contracts/history/decode";
import {
  completeHistoricalTryoutInventory,
  contentHashHistoricalTryoutInventory,
  historicalCatalogEnvelope,
  historicalPlacementEnvelope,
  historicalTryoutInventory,
  retainedTryoutInventory,
} from "#contracts/test/history-inventory";

/** Reads one expected inventory failure through the Effect error channel. */
function readFailure(input: unknown) {
  return verifyStoredTryoutInventory(input).pipe(Effect.flip);
}

describe("stored try-out inventory", () => {
  it.effect("authenticates exact historical aggregate bytes", () =>
    Effect.gen(function* () {
      expect(
        yield* verifyStoredTryoutInventory(retainedTryoutInventory)
      ).toEqual(retainedTryoutInventory);
    })
  );

  it.effect("covers every old catalog identity and internal route branch", () =>
    Effect.gen(function* () {
      expect(
        yield* verifyStoredTryoutInventory(completeHistoricalTryoutInventory)
      ).toEqual(completeHistoricalTryoutInventory);
    })
  );

  it.effect(
    "authenticates the later retained placement shape with content hash",
    () =>
      Effect.gen(function* () {
        expect(
          yield* verifyStoredTryoutInventory(
            contentHashHistoricalTryoutInventory
          )
        ).toEqual(contentHashHistoricalTryoutInventory);
      })
  );

  it.effect("rejects unknown and incomplete inventory shapes", () =>
    Effect.gen(function* () {
      const [decodeError, catalogCountError, placementCountError] =
        yield* Effect.all([
          readFailure({ ...retainedTryoutInventory, unexpected: true }),
          readFailure({
            ...retainedTryoutInventory,
            catalog: retainedTryoutInventory.catalog.slice(0, 1),
          }),
          readFailure({
            ...retainedTryoutInventory,
            placements: retainedTryoutInventory.placements.slice(0, 1),
          }),
        ]);

      expect(decodeError).toBeInstanceOf(StoredTryoutInventoryDecodeError);
      expect(catalogCountError).toMatchObject({ kind: "catalog" });
      expect(placementCountError).toMatchObject({ kind: "placement" });
      expect(decodeError.message).toContain("immutable history contract");
      expect(catalogCountError.message).toContain("does not match");
    })
  );

  it.effect("closes every catalog kind and public route count", () =>
    Effect.gen(function* () {
      const wrongKindInventory = historicalTryoutInventory(
        retainedTryoutInventory.catalog,
        retainedTryoutInventory.placements,
        {
          counts: {
            country: 1,
            exam: 1,
            section: 0,
            set: 0,
            track: 0,
          },
        }
      );
      const wrongRouteInventory = historicalTryoutInventory(
        retainedTryoutInventory.catalog,
        retainedTryoutInventory.placements,
        { routeCount: 1 }
      );
      const [kindError, routeError] = yield* Effect.all([
        readFailure(wrongKindInventory),
        readFailure(wrongRouteInventory),
      ]);

      expect(kindError).toMatchObject({ kind: "country" });
      expect(routeError).toMatchObject({ kind: "route" });
    })
  );

  it.effect(
    "requires the snapshot identity selected by an authenticated release",
    () =>
      Effect.gen(function* () {
        const failure = yield* readFailure({
          ...retainedTryoutInventory,
          expectedSnapshotId: `sha256:${"f".repeat(64)}`,
        });

        expect(failure).toBeInstanceOf(
          StoredTryoutInventorySnapshotMismatchError
        );
        expect(failure.message).toContain("authenticated release");
      })
  );

  it.effect("rejects catalog and placement ordering drift", () =>
    Effect.gen(function* () {
      const [catalogError, placementError] = yield* Effect.all([
        readFailure({
          ...retainedTryoutInventory,
          catalog: [...retainedTryoutInventory.catalog].reverse(),
        }),
        readFailure({
          ...retainedTryoutInventory,
          placements: [...retainedTryoutInventory.placements].reverse(),
        }),
      ]);

      expect(catalogError).toMatchObject({ rowKind: "catalog" });
      expect(placementError).toMatchObject({ rowKind: "placement" });
      expect(catalogError.message).toContain("is not ordered after");
    })
  );

  it.effect("rejects duplicate catalog and placement identities", () =>
    Effect.gen(function* () {
      const [catalogRow] = retainedTryoutInventory.catalog;
      const [placementRow] = retainedTryoutInventory.placements;
      const duplicateCatalog = historicalTryoutInventory(
        [catalogRow, catalogRow],
        retainedTryoutInventory.placements
      );
      const duplicatePlacements = historicalTryoutInventory(
        retainedTryoutInventory.catalog,
        [placementRow, placementRow]
      );
      const [catalogError, placementError] = yield* Effect.all([
        readFailure(duplicateCatalog),
        readFailure(duplicatePlacements),
      ]);

      expect(catalogError).toMatchObject({ rowKind: "catalog" });
      expect(placementError).toMatchObject({ rowKind: "placement" });
      expect(catalogError.message).toContain("is not ordered after");
      expect(placementError.message).toContain("is not ordered after");
    })
  );

  it.effect("rejects both aggregate digest substitutions", () =>
    Effect.gen(function* () {
      const sourceCatalog = yield* Effect.fromNullishOr(
        completeHistoricalTryoutInventory.catalog.at(0)
      );
      const sourcePlacement = yield* Effect.fromNullishOr(
        completeHistoricalTryoutInventory.placements.at(0)
      );
      const changedCatalog = historicalCatalogEnvelope({
        ...sourceCatalog.record.row,
        title: "Changed country title",
      });
      const changedPlacement = historicalPlacementEnvelope({
        ...sourcePlacement.record.row,
        title: "Changed question title",
      });
      const [catalogError, placementError] = yield* Effect.all([
        readFailure({
          ...retainedTryoutInventory,
          catalog: [changedCatalog, retainedTryoutInventory.catalog[1]],
        }),
        readFailure({
          ...retainedTryoutInventory,
          placements: [changedPlacement, retainedTryoutInventory.placements[1]],
        }),
      ]);

      expect(catalogError).toBeInstanceOf(
        StoredTryoutInventoryDigestMismatchError
      );
      expect(placementError).toMatchObject({ rowKind: "placement" });
      expect(catalogError.message).toContain("snapshot digest");
    })
  );

  it.effect(
    "rejects an individually corrupted row before aggregate verification",
    () =>
      Effect.gen(function* () {
        const failure = yield* readFailure({
          ...retainedTryoutInventory,
          catalog: [
            {
              ...retainedTryoutInventory.catalog[0],
              record: {
                ...retainedTryoutInventory.catalog[0].record,
                rowHash: `sha256:${"f".repeat(64)}`,
              },
            },
            retainedTryoutInventory.catalog[1],
          ],
        });

        expect(failure).toBeInstanceOf(StoredTryoutRowHashMismatchError);
      })
  );

  it.effect("maps Web Crypto aggregate failures to the owned error", () =>
    Effect.gen(function* () {
      const nativeDigest = crypto.subtle.digest.bind(crypto.subtle);
      yield* Effect.acquireRelease(
        Effect.sync(() => {
          const mock = vi.spyOn(crypto.subtle, "digest");
          for (
            let completedCalls = 0;
            completedCalls < 5;
            completedCalls += 1
          ) {
            mock.mockImplementationOnce(nativeDigest);
          }
          return mock.mockRejectedValueOnce(
            new TypeError("injected inventory failure")
          );
        }),
        (mock) => Effect.sync(() => mock.mockRestore())
      );
      const failure = yield* readFailure(retainedTryoutInventory);

      expect(failure).toBeInstanceOf(StoredTryoutInventoryHashError);
      expect(failure.message).toContain("inventory could not be hashed");
    })
  );
});
