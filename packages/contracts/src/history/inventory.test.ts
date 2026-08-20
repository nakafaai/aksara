import { describe, expect, it } from "@nakafa/testing/effect";
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
  return Effect.runPromise(
    verifyStoredTryoutInventory(input).pipe(Effect.flip)
  );
}

describe("stored try-out inventory", () => {
  it("authenticates exact historical aggregate bytes", async () => {
    await expect(
      Effect.runPromise(verifyStoredTryoutInventory(retainedTryoutInventory))
    ).resolves.toEqual(retainedTryoutInventory);
  });

  it("covers every old catalog identity and internal route branch", async () => {
    await expect(
      Effect.runPromise(
        verifyStoredTryoutInventory(completeHistoricalTryoutInventory)
      )
    ).resolves.toEqual(completeHistoricalTryoutInventory);
  });

  it("authenticates the later retained placement shape with content hash", async () => {
    await expect(
      Effect.runPromise(
        verifyStoredTryoutInventory(contentHashHistoricalTryoutInventory)
      )
    ).resolves.toEqual(contentHashHistoricalTryoutInventory);
  });

  it("rejects unknown and incomplete inventory shapes", async () => {
    const [decodeError, catalogCountError, placementCountError] =
      await Promise.all([
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
  });

  it("closes every catalog kind and public route count", async () => {
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
    const [kindError, routeError] = await Promise.all([
      readFailure(wrongKindInventory),
      readFailure(wrongRouteInventory),
    ]);

    expect(kindError).toMatchObject({ kind: "country" });
    expect(routeError).toMatchObject({ kind: "route" });
  });

  it("requires the snapshot identity selected by an authenticated release", async () => {
    const failure = await readFailure({
      ...retainedTryoutInventory,
      expectedSnapshotId: `sha256:${"f".repeat(64)}`,
    });

    expect(failure).toBeInstanceOf(StoredTryoutInventorySnapshotMismatchError);
    expect(failure.message).toContain("authenticated release");
  });

  it("rejects catalog and placement ordering drift", async () => {
    const [catalogError, placementError] = await Promise.all([
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
  });

  it("rejects duplicate catalog and placement identities", async () => {
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
    const [catalogError, placementError] = await Promise.all([
      readFailure(duplicateCatalog),
      readFailure(duplicatePlacements),
    ]);

    expect(catalogError).toMatchObject({ rowKind: "catalog" });
    expect(placementError).toMatchObject({ rowKind: "placement" });
    expect(catalogError.message).toContain("is not ordered after");
    expect(placementError.message).toContain("is not ordered after");
  });

  it("rejects both aggregate digest substitutions", async () => {
    const sourceCatalog = completeHistoricalTryoutInventory.catalog.at(0);
    const sourcePlacement = completeHistoricalTryoutInventory.placements.at(0);
    if (sourceCatalog === undefined || sourcePlacement === undefined) {
      throw new Error("Complete retained inventory fixture is empty.");
    }
    const changedCatalog = historicalCatalogEnvelope({
      ...sourceCatalog.record.row,
      title: "Changed country title",
    });
    const changedPlacement = historicalPlacementEnvelope({
      ...sourcePlacement.record.row,
      title: "Changed question title",
    });
    const [catalogError, placementError] = await Promise.all([
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
  });

  it("rejects an individually corrupted row before aggregate verification", async () => {
    const failure = await readFailure({
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
  });

  it("maps Web Crypto aggregate failures to the owned error", async () => {
    const nativeDigest = crypto.subtle.digest.bind(crypto.subtle);
    let calls = 0;
    const digest = vi
      .spyOn(crypto.subtle, "digest")
      .mockImplementation((algorithm, data) => {
        calls += 1;
        if (calls === 6) {
          return Promise.reject(new TypeError("injected inventory failure"));
        }
        return nativeDigest(algorithm, data);
      });
    const failure = await readFailure(retainedTryoutInventory);
    digest.mockRestore();

    expect(failure).toBeInstanceOf(StoredTryoutInventoryHashError);
    expect(failure.message).toContain("inventory could not be hashed");
  });
});
