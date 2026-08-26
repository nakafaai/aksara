import { resolve } from "node:path";
import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import type { Sha256Hash } from "@nakafa/aksara-contracts/ids";
import type { ContentSnapshotManifest } from "@nakafa/aksara-contracts/release/snapshot/data";
import type { PublicationScope } from "@nakafa/aksara-contracts/release/snapshot/scope";
import {
  ContentSnapshotSetSchema,
  inheritContentSnapshot,
} from "@nakafa/aksara-contracts/release/snapshot/spec";
import { Effect, Stream } from "effect";
import { vi } from "vitest";
import { prepareReleaseSnapshots } from "#publisher/snapshot/release";
import {
  makeQuranSnapshotFixture,
  type QuranFixture,
  type TryoutFixture,
  tryoutSnapshotFixture,
} from "#test/snapshot";

const checkoutRoot = resolve(process.cwd(), "..", "..");
const quranState = vi.hoisted((): { current: QuranFixture | undefined } => ({
  current: undefined,
}));
const tryoutState = vi.hoisted((): { current: TryoutFixture | undefined } => ({
  current: undefined,
}));

vi.mock("@nakafa/aksara-corpus/quran/snapshot", async () => {
  const { Effect: RuntimeEffect } = await import("effect");
  return {
    prepareQuranSnapshot: () =>
      quranState.current === undefined
        ? RuntimeEffect.die(new Error("Expected a configured Quran snapshot."))
        : RuntimeEffect.succeed(quranState.current),
  };
});

vi.mock("#publisher/tryout/snapshot", async () => {
  const { Effect: RuntimeEffect } = await import("effect");
  return {
    prepareTryoutSnapshot: () =>
      tryoutState.current === undefined
        ? RuntimeEffect.die(
            new Error("Expected a configured try-out snapshot.")
          )
        : RuntimeEffect.succeed(tryoutState.current),
  };
});

/** Runs snapshot preparation and collects both replayable outputs. */
function prepare(
  previousSnapshots: Parameters<
    typeof prepareReleaseSnapshots
  >[0]["previousSnapshots"],
  families: PublicationScope["snapshots"] = ["program", "quran", "tryout"],
  refreshTryoutRuntimeBundle = false
) {
  return Effect.scoped(
    Effect.gen(function* () {
      const prepared = yield* prepareReleaseSnapshots({
        checkoutRoot,
        families,
        previousSnapshots,
        questionHeads: Stream.empty,
        refreshTryoutRuntimeBundle,
        rendererManifest: {},
      });
      const [manifests, rows] = yield* Effect.all([
        prepared.manifests.pipe(Stream.runCollect),
        prepared.rows.pipe(Stream.runCollect),
      ]);
      return {
        manifests: [...manifests],
        rows: [...rows],
        tryoutRuntimeSnapshot: prepared.tryoutRuntimeSnapshot,
      };
    })
  );
}

/** Requires the complete canonical family sequence used by these assertions. */
function requireCompleteManifests(
  manifests: readonly ContentSnapshotManifest[]
) {
  const [program, quran, tryout] = manifests;
  if (
    !(
      program?.family === "program" &&
      quran?.family === "quran" &&
      tryout?.family === "tryout"
    )
  ) {
    throw new Error("Expected every structured snapshot manifest.");
  }
  return { program, quran, tryout };
}

/** Acquires one complete structured fixture set for an isolated assertion. */
const makeFixtures = Effect.fn("AksaraPublisherTest.makeSnapshotFixtures")(
  function* () {
    const quranFixture = makeQuranSnapshotFixture();
    const tryoutFixture = yield* tryoutSnapshotFixture;
    yield* Effect.sync(() => {
      quranState.current = quranFixture;
      tryoutState.current = tryoutFixture;
    });
    yield* Effect.addFinalizer(() =>
      Effect.sync(() => {
        quranState.current = undefined;
        tryoutState.current = undefined;
      })
    );
    const changedSnapshots = yield* prepare(null);
    const completeSnapshots = requireCompleteManifests(
      changedSnapshots.manifests
    );
    return {
      changedSnapshots,
      completeSnapshots,
      quranFixture,
      tryoutFixture,
    };
  }
);

/** Builds one exact active structured set while varying only Quran identity. */
function activeSnapshots(
  snapshots: ReturnType<typeof requireCompleteManifests>,
  quranSnapshotId: Sha256Hash | null
) {
  return ContentSnapshotSetSchema.make({
    program: inheritContentSnapshot(snapshots.program.manifest.snapshotId),
    quran: inheritContentSnapshot(quranSnapshotId),
    tryout: inheritContentSnapshot(snapshots.tryout.manifest.snapshotId),
  });
}

layer(NodeServices.layer)("release snapshot preparation", (it) => {
  it.effect(
    "stages every changed snapshot and row in canonical family order",
    () =>
      Effect.gen(function* () {
        const {
          changedSnapshots,
          completeSnapshots,
          quranFixture,
          tryoutFixture,
        } = yield* makeFixtures();
        const { program, quran } = completeSnapshots;
        const programRowCount = program.manifest.rowCount;
        const quranRowCount = quranFixture.rowCount;
        expect(changedSnapshots.manifests.map(({ family }) => family)).toEqual([
          "program",
          "quran",
          "tryout",
        ]);
        const programRows = changedSnapshots.rows.slice(0, programRowCount);
        const quranRows = changedSnapshots.rows.slice(
          programRowCount,
          programRowCount + quranRowCount
        );
        const tryoutRows = changedSnapshots.rows.slice(
          programRowCount + quranRowCount
        );
        expect(programRows).toHaveLength(program.manifest.rowCount);
        expect(programRows.every(({ family }) => family === "program")).toBe(
          true
        );
        expect(quranRows).toHaveLength(quranRowCount);
        expect(quranRows.every(({ family }) => family === "quran")).toBe(true);
        expect(tryoutRows).toHaveLength(tryoutFixture.rowCount);
        expect(tryoutRows.every(({ family }) => family === "tryout")).toBe(
          true
        );
        expect(quran).toMatchObject({
          family: "quran",
          manifest: { provenanceStatus: "blocked" },
        });
        yield* Effect.sync(() => {
          quranState.current = undefined;
        });
        const tryoutOnly = yield* prepare(null, ["tryout"]);
        yield* Effect.sync(() => {
          quranState.current = quranFixture;
        });
        expect(tryoutOnly.manifests).toEqual([completeSnapshots.tryout]);
        expect(tryoutOnly.rows).toHaveLength(tryoutFixture.rowCount);
      })
  );
  it.effect(
    "inherits exact active snapshot identities without restaging rows",
    () =>
      Effect.gen(function* () {
        const { completeSnapshots } = yield* makeFixtures();
        const inheritedSnapshots = yield* prepare(
          activeSnapshots(
            completeSnapshots,
            completeSnapshots.quran.manifest.snapshotId
          )
        );
        expect(inheritedSnapshots).toEqual({
          manifests: [],
          rows: [],
          tryoutRuntimeSnapshot: null,
        });
      })
  );
  it.effect(
    "returns an inherited try-out snapshot only for a new renderer pair",
    () =>
      Effect.gen(function* () {
        const { completeSnapshots } = yield* makeFixtures();
        const rendererRefresh = yield* prepare(
          activeSnapshots(
            completeSnapshots,
            completeSnapshots.quran.manifest.snapshotId
          ),
          [],
          true
        );
        expect(rendererRefresh).toEqual({
          manifests: [],
          rows: [],
          tryoutRuntimeSnapshot: completeSnapshots.tryout.manifest,
        });
      })
  );
  it.effect(
    "streams rows only for a family whose active identity changed",
    () =>
      Effect.gen(function* () {
        const { completeSnapshots, quranFixture } = yield* makeFixtures();
        const changedQuran = yield* prepare(
          activeSnapshots(completeSnapshots, null),
          ["quran"]
        );
        expect(changedQuran.manifests).toEqual([completeSnapshots.quran]);
        expect(changedQuran.rows).toHaveLength(quranFixture.rowCount);
        expect(
          changedQuran.rows.every(({ family }) => family === "quran")
        ).toBe(true);
      })
  );
});
