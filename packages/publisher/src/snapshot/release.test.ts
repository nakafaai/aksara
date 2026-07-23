import { resolve } from "node:path";
import { NodeContext } from "@effect/platform-node";
import {
  ContentSnapshotSetSchema,
  inheritContentSnapshot,
} from "@nakafa/aksara-contracts/release/snapshot";
import type {
  ContentSnapshotManifest,
  ContentSnapshotRow,
} from "@nakafa/aksara-contracts/release/snapshot-data";
import {
  digestTryoutCatalog,
  digestTryoutPlacements,
} from "@nakafa/aksara-contracts/tryout/row-hash";
import { makeTryoutSnapshot } from "@nakafa/aksara-contracts/tryout/snapshot-hash";
import { loadTryoutProjection } from "@nakafa/aksara-corpus/tryout/projection";
import { Effect, Stream } from "effect";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { prepareReleaseSnapshots } from "#publisher/snapshot/release";

const checkoutRoot = resolve(process.cwd(), "..", "..");

interface TryoutFixture {
  readonly manifest: Extract<
    ContentSnapshotManifest,
    { readonly family: "tryout" }
  >;
  /** Replays the exact real catalog row represented by the fixture. */
  readonly rows: () => Stream.Stream<ContentSnapshotRow>;
}

const tryoutState = vi.hoisted((): { current: TryoutFixture | undefined } => ({
  current: undefined,
}));

vi.mock("#publisher/tryout/snapshot", async () => {
  const { Effect: RuntimeEffect } = await import("effect");
  return {
    prepareTryoutSnapshot: () =>
      tryoutState.current === undefined
        ? RuntimeEffect.dieMessage("Expected a configured try-out snapshot.")
        : RuntimeEffect.succeed(tryoutState.current),
  };
});

/** Builds one structured fixture from an exact real catalog row. */
async function makeTryoutFixture(): Promise<TryoutFixture> {
  const projection = await Effect.runPromise(
    loadTryoutProjection(checkoutRoot).pipe(Effect.provide(NodeContext.layer))
  );
  const [record] = projection.catalog;
  if (record === undefined) {
    throw new Error("Expected the real try-out catalog.");
  }
  const [catalog, placement] = await Effect.runPromise(
    Effect.all([
      digestTryoutCatalog(Stream.make(record)),
      digestTryoutPlacements(Stream.empty),
    ])
  );
  const counts = { country: 0, exam: 0, section: 0, set: 0, track: 0 };
  counts[record.row.kind] = 1;
  const manifest = {
    family: "tryout",
    manifest: makeTryoutSnapshot({
      catalogDigest: catalog.digest,
      counts,
      format: "tryout-v1",
      locales: ["en", "id"],
      placementCount: placement.count,
      placementDigest: placement.digest,
      routeCount: 1,
    }),
  } satisfies TryoutFixture["manifest"];
  const row = {
    family: "tryout",
    record,
    rowKind: "catalog",
  } satisfies ContentSnapshotRow;
  return { manifest, rows: () => Stream.make(row) };
}

/** Runs snapshot preparation and collects both replayable outputs. */
function prepare(
  previousSnapshots: Parameters<
    typeof prepareReleaseSnapshots
  >[0]["previousSnapshots"]
) {
  return Effect.runPromise(
    Effect.scoped(
      Effect.gen(function* () {
        const prepared = yield* prepareReleaseSnapshots({
          checkoutRoot,
          previousSnapshots,
          questionHeads: () => Stream.empty,
          rendererManifest: {},
        });
        const [manifests, rows] = yield* Effect.all([
          prepared.manifests().pipe(Stream.runCollect),
          prepared.rows().pipe(Stream.runCollect),
        ]);
        return { manifests: [...manifests], rows: [...rows] };
      })
    ).pipe(Effect.provide(NodeContext.layer))
  );
}

beforeAll(async () => {
  tryoutState.current = await makeTryoutFixture();
});

describe("release snapshot preparation", () => {
  it("stages changed Program and Try-out snapshots in canonical order", async () => {
    const prepared = await prepare(null);

    expect(prepared.manifests.map(({ family }) => family)).toEqual([
      "program",
      "tryout",
    ]);
    expect(prepared.rows.map(({ family }) => family)).toEqual([
      "program",
      "program",
      "program",
      "program",
      "program",
      "program",
      "tryout",
    ]);
  });

  it("inherits exact active snapshot identities without restaging rows", async () => {
    const initial = await prepare(null);
    const [program, tryout] = initial.manifests;
    if (!(program?.family === "program" && tryout?.family === "tryout")) {
      throw new Error("Expected both structured snapshot manifests.");
    }
    const previous = ContentSnapshotSetSchema.make({
      program: inheritContentSnapshot(program.manifest.snapshotId),
      quran: inheritContentSnapshot(null),
      tryout: inheritContentSnapshot(tryout.manifest.snapshotId),
    });
    const prepared = await prepare(previous);

    expect(prepared).toEqual({ manifests: [], rows: [] });
  });
});
