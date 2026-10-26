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
  type AssessmentFixture,
  assessmentSnapshotFixture,
  makeQuranSnapshotFixture,
  type QuranFixture,
} from "#test/snapshot";

const repositoryRoot = Effect.map(Path.Path, (path) =>
  path.resolve(process.cwd(), "..", "..")
);
const quranSnapshot = vi.hoisted(() =>
  vi.fn<() => Effect.Effect<QuranFixture>>()
);
const assessmentSnapshot = vi.hoisted(() =>
  vi.fn<() => Effect.Effect<AssessmentFixture>>()
);

vi.mock("@nakafa/aksara-corpus/quran/snapshot", () => ({
  prepareQuranSnapshot: quranSnapshot,
}));

vi.mock("@nakafa/aksara-corpus/tryout/content", async () => {
  const { Effect: RuntimeEffect } = await import("effect");
  return {
    loadTryoutContent: () =>
      RuntimeEffect.succeed({ exams: [], papers: [], sets: [] }),
  };
});

vi.mock("#publisher/assessment/snapshot", () => ({
  prepareAssessmentSnapshot: assessmentSnapshot,
}));

/** Runs snapshot preparation and collects both replayable outputs. */
function prepare(
  previousSnapshots: Parameters<
    typeof prepareReleaseSnapshots
  >[0]["previousSnapshots"],
  families: PublicationScope["snapshots"] = ["assessment", "program", "quran"]
) {
  return Effect.scoped(
    Effect.gen(function* () {
      const prepared = yield* prepareReleaseSnapshots({
        checkoutRoot: yield* repositoryRoot,
        families,
        previousSnapshots,
      });
      const [manifests, rows] = yield* Effect.all([
        prepared.manifests.pipe(Stream.runCollect),
        prepared.rows.pipe(Stream.runCollect),
      ]);
      return { manifests: [...manifests], rows: [...rows] };
    })
  );
}

/** Requires the complete canonical family sequence used by these assertions. */
function requireCompleteManifests(
  manifests: readonly ContentSnapshotManifest[]
) {
  const [assessment, program, quran] = manifests;
  if (
    !(
      assessment?.family === "assessment" &&
      program?.family === "program" &&
      quran?.family === "quran"
    )
  ) {
    throw new Error("Expected every structured snapshot manifest.");
  }
  return { assessment, program, quran };
}

/** Acquires one complete structured fixture set for an isolated assertion. */
const makeFixtures = Effect.fn("AksaraPublisherTest.makeSnapshotFixtures")(
  function* () {
    const quranFixture = makeQuranSnapshotFixture();
    const assessmentFixture = yield* assessmentSnapshotFixture;
    yield* Effect.sync(() => {
      quranSnapshot.mockReturnValue(Effect.succeed(quranFixture));
      assessmentSnapshot.mockReturnValue(Effect.succeed(assessmentFixture));
    });
    yield* Effect.addFinalizer(() =>
      Effect.sync(() => {
        quranSnapshot.mockReturnValue(
          Effect.die(new Error("Expected a configured Quran snapshot."))
        );
        assessmentSnapshot.mockReturnValue(
          Effect.die(new Error("Expected a configured assessment snapshot."))
        );
      })
    );
    const changedSnapshots = yield* prepare(null);
    const completeSnapshots = requireCompleteManifests(
      changedSnapshots.manifests
    );
    return {
      assessmentFixture,
      changedSnapshots,
      completeSnapshots,
      quranFixture,
    };
  }
);

/** Builds one exact active structured set while varying only Quran identity. */
function activeSnapshots(
  snapshots: ReturnType<typeof requireCompleteManifests>,
  quranSnapshotId: Sha256Hash | null
) {
  return ContentSnapshotSetSchema.make({
    assessment: inheritContentSnapshot(
      snapshots.assessment.manifest.snapshotId
    ),
    program: inheritContentSnapshot(snapshots.program.manifest.snapshotId),
    quran: inheritContentSnapshot(quranSnapshotId),
  });
}

layer(NodeServices.layer)("release snapshot preparation", (it) => {
  it.effect(
    "stages every changed snapshot and row in canonical family order",
    () =>
      Effect.gen(function* () {
        const {
          assessmentFixture,
          changedSnapshots,
          completeSnapshots,
          quranFixture,
        } = yield* makeFixtures();
        const { program, quran } = completeSnapshots;
        const assessmentRows = Arr.take(
          changedSnapshots.rows,
          assessmentFixture.rowCount
        );
        const programRows = Arr.take(
          Arr.drop(changedSnapshots.rows, assessmentFixture.rowCount),
          program.manifest.rowCount
        );
        const quranRows = Arr.drop(
          changedSnapshots.rows,
          assessmentFixture.rowCount + program.manifest.rowCount
        );

        expect(
          Arr.map(changedSnapshots.manifests, ({ family }) => family)
        ).toEqual(["assessment", "program", "quran"]);
        expect(
          Arr.every(assessmentRows, ({ family }) => family === "assessment")
        ).toBe(true);
        expect(programRows).toHaveLength(program.manifest.rowCount);
        expect(
          Arr.every(programRows, ({ family }) => family === "program")
        ).toBe(true);
        expect(quranRows).toHaveLength(quranFixture.rowCount);
        expect(Arr.every(quranRows, ({ family }) => family === "quran")).toBe(
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
        const assessmentOnly = yield* prepare(null, ["assessment"]);
        yield* Effect.sync(() => {
          quranSnapshot.mockReturnValue(Effect.succeed(quranFixture));
        });

        expect(assessmentOnly.manifests).toEqual([
          completeSnapshots.assessment,
        ]);
        expect(assessmentOnly.rows).toHaveLength(assessmentFixture.rowCount);
      })
  );

  it.effect(
    "inherits exact active snapshot identities without restaging rows",
    () =>
      Effect.gen(function* () {
        const { completeSnapshots } = yield* makeFixtures();
        const inherited = yield* prepare(
          activeSnapshots(
            completeSnapshots,
            completeSnapshots.quran.manifest.snapshotId
          )
        );

        expect(inherited).toEqual({ manifests: [], rows: [] });
      })
  );

  it.effect("stages an assessment snapshot whose identity changed", () =>
    Effect.gen(function* () {
      const { assessmentFixture, completeSnapshots } = yield* makeFixtures();
      const changed = Sha256HashSchema.make(`sha256:${"f".repeat(64)}`);
      const replaced = yield* prepare(
        ContentSnapshotSetSchema.make({
          ...activeSnapshots(
            completeSnapshots,
            completeSnapshots.quran.manifest.snapshotId
          ),
          assessment: inheritContentSnapshot(changed),
        }),
        ["assessment"]
      );

      expect(replaced.manifests).toEqual([assessmentFixture.manifest]);
      expect(replaced.rows).toHaveLength(assessmentFixture.rowCount);
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
