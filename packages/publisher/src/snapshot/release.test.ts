import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import {
  type Sha256Hash,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import type { ContentSnapshotManifest } from "@nakafa/aksara-contracts/release/snapshot/data";
import type { PublicationScope } from "@nakafa/aksara-contracts/release/snapshot/scope";
import {
  ContentSnapshotSetSchema,
  inheritContentSnapshot,
} from "@nakafa/aksara-contracts/release/snapshot/spec";
import { Array as Arr, Effect, Path, Stream } from "effect";
import { prepareReleaseSnapshots } from "#publisher/snapshot/release";
import {
  makeQuranSnapshotFixture,
  type QuranFixture,
  type TryoutFixture,
  tryoutSnapshotFixture,
} from "#test/snapshot";

const repositoryRoot = Effect.map(Path.Path, (path) =>
  path.resolve(process.cwd(), "..", "..")
);
const quranSnapshot = vi.hoisted(() =>
  vi.fn<() => Effect.Effect<QuranFixture>>()
);
const tryoutSnapshot = vi.hoisted(() =>
  vi.fn<() => Effect.Effect<TryoutFixture>>()
);

vi.mock("@nakafa/aksara-corpus/quran/snapshot", () => ({
  prepareQuranSnapshot: quranSnapshot,
}));

vi.mock("@nakafa/aksara-corpus/tryout/content", async () => {
  const { Effect: RuntimeEffect } = await import("effect");
  return {
    loadTryoutContent: () =>
      RuntimeEffect.succeed({
        entries: [],
        projection: { catalog: [], placements: [], routeCount: 0 },
        sources: [],
      }),
  };
});

vi.mock("#publisher/tryout/snapshot", () => ({
  prepareTryoutSnapshot: tryoutSnapshot,
}));

/** Runs snapshot preparation and collects both replayable outputs. */
function prepare(
  previousSnapshots: Parameters<
    typeof prepareReleaseSnapshots
  >[0]["previousSnapshots"],
  families: PublicationScope["snapshots"] = ["program", "quran", "tryout"],
  runtime: Parameters<typeof prepareReleaseSnapshots>[0]["runtime"] = {
    kind: "stable",
  }
) {
  return Effect.scoped(
    Effect.gen(function* () {
      const prepared = yield* prepareReleaseSnapshots({
        checkoutRoot: yield* repositoryRoot,
        families,
        previousSnapshots,
        questionHeads: Stream.empty,
        rendererManifest: {},
        runtime,
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
      quranSnapshot.mockReturnValue(Effect.succeed(quranFixture));
      tryoutSnapshot.mockReturnValue(Effect.succeed(tryoutFixture));
    });
    yield* Effect.addFinalizer(() =>
      Effect.sync(() => {
        quranSnapshot.mockReturnValue(
          Effect.die(new Error("Expected a configured Quran snapshot."))
        );
        tryoutSnapshot.mockReturnValue(
          Effect.die(new Error("Expected a configured try-out snapshot."))
        );
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
        expect(
          Arr.map(changedSnapshots.manifests, ({ family }) => family)
        ).toEqual(["program", "quran", "tryout"]);
        const programRows = Arr.take(changedSnapshots.rows, programRowCount);
        const quranRows = Arr.take(
          Arr.drop(changedSnapshots.rows, programRowCount),
          quranRowCount
        );
        const tryoutRows = Arr.drop(
          changedSnapshots.rows,
          programRowCount + quranRowCount
        );
        expect(programRows).toHaveLength(program.manifest.rowCount);
        expect(
          Arr.every(programRows, ({ family }) => family === "program")
        ).toBe(true);
        expect(quranRows).toHaveLength(quranRowCount);
        expect(Arr.every(quranRows, ({ family }) => family === "quran")).toBe(
          true
        );
        expect(tryoutRows).toHaveLength(tryoutFixture.rowCount);
        expect(Arr.every(tryoutRows, ({ family }) => family === "tryout")).toBe(
          true
        );
        expect(quran).toMatchObject({
          family: "quran",
          manifest: { provenanceStatus: "blocked" },
        });
        yield* Effect.sync(() => {
          quranSnapshot.mockReturnValue(
            Effect.die(new Error("Expected a configured Quran snapshot."))
          );
        });
        const tryoutOnly = yield* prepare(null, ["tryout"]);
        yield* Effect.sync(() => {
          quranSnapshot.mockReturnValue(Effect.succeed(quranFixture));
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
          {
            kind: "refresh",
            snapshot: completeSnapshots.tryout.manifest,
          }
        );
        expect(rendererRefresh).toEqual({
          manifests: [],
          rows: [],
          tryoutRuntimeSnapshot: completeSnapshots.tryout.manifest,
        });
      })
  );
  it.effect(
    "keeps the authenticated active snapshot during renderer-only refresh",
    () =>
      Effect.gen(function* () {
        const { completeSnapshots, tryoutFixture } = yield* makeFixtures();
        const activeSnapshot = completeSnapshots.tryout.manifest;
        yield* Effect.sync(() => {
          tryoutSnapshot.mockReturnValue(
            Effect.succeed({
              ...tryoutFixture,
              manifest: {
                family: "tryout",
                manifest: {
                  ...tryoutFixture.manifest.manifest,
                  snapshotId: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
                },
              },
            })
          );
        });

        const rendererRefresh = yield* prepare(
          activeSnapshots(
            completeSnapshots,
            completeSnapshots.quran.manifest.snapshotId
          ),
          [],
          { kind: "refresh", snapshot: activeSnapshot }
        );

        expect(rendererRefresh).toEqual({
          manifests: [],
          rows: [],
          tryoutRuntimeSnapshot: activeSnapshot,
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
          Arr.every(changedQuran.rows, ({ family }) => family === "quran")
        ).toBe(true);
      })
  );
});
