import { Effect, Schema, Stream } from "effect";
import { describe, expect, it } from "vitest";
import { Sha256HashSchema } from "#contracts/ids";
import {
  canonicalizeTryoutCatalog,
  canonicalizeTryoutPlacement,
  canonicalizeTryoutSnapshot,
  compareTryoutPlacements,
  digestTryoutCatalog,
  digestTryoutPlacements,
  makeTryoutCatalogRecord,
  makeTryoutPlacementRecord,
  makeTryoutSnapshot,
  tryoutPlacementIdentity,
} from "#contracts/tryout/hash";
import {
  compareTryoutCatalog,
  TryoutCatalogRowSchema,
  TryoutPlacementSchema,
  type TryoutSnapshotInput,
} from "#contracts/tryout/spec";

const hashes = {
  answer: Sha256HashSchema.make(`sha256:${"a".repeat(64)}`),
  question: Sha256HashSchema.make(`sha256:${"b".repeat(64)}`),
  tampered: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
};
const SHA256_HASH_PATTERN = /^sha256:[a-f\d]{64}$/u;

/** Derives current SNBT graph facts for one canonical hierarchy sample. */
function graph(kind: "country" | "exam" | "track" | "set" | "section") {
  const suffixByKind = {
    country: ["indonesia"],
    exam: ["indonesia", "snbt"],
    section: ["indonesia", "snbt", "2027", "set-1", "quantitative-knowledge"],
    set: ["indonesia", "snbt", "2027", "set-1"],
    track: ["indonesia", "snbt", "2027"],
  };
  const lens =
    kind === "country"
      ? ["tryout", "indonesia", "catalog"]
      : ["tryout", "indonesia", "snbt"];
  const suffix = suffixByKind[kind];
  const concept =
    kind === "section"
      ? ["tryout", ...suffix.filter((segment) => segment !== "set-1")]
      : ["tryout", ...suffix];
  const learningObject = [`tryout-${kind}`, ...suffix];
  const alignment = [...lens, ...learningObject];
  return {
    alignmentId: `alignment:${alignment.join(":")}`,
    assetId: `asset:en:${alignment.join(":")}`,
    conceptId: `concept:${concept.join(":")}`,
    learningObjectId: `lo:${learningObject.join(":")}`,
    lensId: `lens:${lens.join(":")}`,
  };
}

/** Builds one real-shape catalog row for each hierarchy kind. */
function catalogRows() {
  const common = {
    locale: "en",
    sourceRevision: "2026-07-05",
    title: "Test-only title",
  } as const;
  return Schema.decodeUnknownSync(Schema.Array(TryoutCatalogRowSchema))([
    {
      ...common,
      countryCode: "ID",
      countryKey: "indonesia",
      description: "Test-only country",
      graph: graph("country"),
      kind: "country",
      publicPath: "try-out/indonesia",
    },
    {
      ...common,
      countryKey: "indonesia",
      examKey: "snbt",
      graph: graph("exam"),
      kind: "exam",
      publicPath: "try-out/indonesia/snbt",
      scoringStrategy: "irt",
    },
    {
      ...common,
      countryKey: "indonesia",
      examKey: "snbt",
      graph: graph("track"),
      kind: "track",
      order: 1,
      publicPath: "try-out/indonesia/snbt/2027",
      questionCount: 300,
      sectionCount: 14,
      setCount: 2,
      trackKey: "2027",
      trackKind: "year",
      visibleSectionCount: 14,
    },
    {
      ...common,
      countryKey: "indonesia",
      examKey: "snbt",
      graph: graph("set"),
      internalEntrySectionKey: "entry",
      kind: "set",
      order: 1,
      publicPath: "try-out/indonesia/snbt/2027/set-1",
      questionCount: 40,
      scoringStrategy: "irt",
      sectionCount: 1,
      setKey: "set-1",
      trackKey: "2027",
      visibleSectionCount: 0,
    },
    {
      ...common,
      countryKey: "indonesia",
      examKey: "snbt",
      graph: graph("section"),
      kind: "section",
      order: 1,
      questionCount: 20,
      questionSourcePath:
        "packages/corpus/question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1",
      sectionKey: "quantitative-knowledge",
      setKey: "set-1",
      timeLimitSeconds: 1800,
      trackKey: "2027",
      visibility: "internal-entry",
    },
  ]);
}

/** Builds one artifact-bound placement using test-only hash identities. */
function placement(locale: "en" | "id", order: number) {
  return Schema.decodeUnknownSync(TryoutPlacementSchema)({
    answerArtifactHash: hashes.answer,
    answerContentKey: `question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-${order}/answer`,
    choices: [
      {
        isCorrect: true,
        label: "Test-only choice",
        optionKey: "option-1",
        order: 1,
      },
    ],
    countryKey: "indonesia",
    examKey: "snbt",
    locale,
    questionArtifactHash: hashes.question,
    questionContentKey: `question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-${order}/question`,
    questionOrder: order,
    questionSourcePath: `packages/corpus/question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-${order}`,
    rendererDomain: "snbt-quant",
    scope: "server",
    sectionKey: "quantitative-knowledge",
    setKey: "set-1",
    sourceRevision: "2026-07-05",
    title: "Test-only question",
    trackKey: "2027",
  });
}

const snapshotInput: TryoutSnapshotInput = {
  catalogDigest: hashes.answer,
  counts: { country: 2, exam: 4, section: 34, set: 10, track: 4 },
  format: "tryout-v1",
  locales: ["en", "id"],
  placementCount: 840,
  placementDigest: hashes.question,
  routeCount: 48,
};

describe("try-out hashing", () => {
  it("canonically serializes every hierarchy kind and optional field", () => {
    const parsed = catalogRows().map((row) =>
      JSON.parse(canonicalizeTryoutCatalog(row))
    );

    expect(parsed.map(({ kind }) => kind)).toEqual([
      "country",
      "exam",
      "track",
      "set",
      "section",
    ]);
    expect(parsed[0]).toHaveProperty("description");
    expect(parsed[0]).toHaveProperty("graph");
    expect(parsed[1]).not.toHaveProperty("description");
    expect(parsed[3]).toHaveProperty("internalEntrySectionKey");
    expect(parsed[4]).not.toHaveProperty("publicPath");
  });

  it("binds placement choices and snapshot facts deterministically", () => {
    const row = placement("en", 1);
    const first = makeTryoutPlacementRecord(row);
    const second = makeTryoutPlacementRecord(row);
    const snapshot = makeTryoutSnapshot(snapshotInput);

    expect(first).toEqual(second);
    expect(JSON.parse(canonicalizeTryoutPlacement(row))).toEqual(row);
    expect(JSON.parse(canonicalizeTryoutSnapshot(snapshotInput))).toEqual(
      snapshotInput
    );
    expect(snapshot.snapshotId).toMatch(SHA256_HASH_PATTERN);
  });

  it("binds graph identity into each immutable catalog row", () => {
    const [row] = catalogRows();
    if (row === undefined) {
      throw new Error("Expected one catalog row.");
    }
    const altered = Schema.decodeUnknownSync(TryoutCatalogRowSchema)({
      ...row,
      graph: {
        ...row.graph,
        conceptId: "concept:tryout:other",
      },
    });

    expect(makeTryoutCatalogRecord(row).rowHash).not.toBe(
      makeTryoutCatalogRecord(altered).rowHash
    );
  });

  it("orders placements by hierarchy, content, and locale identity", () => {
    const english = placement("en", 1);
    const indonesian = placement("id", 1);

    expect(tryoutPlacementIdentity(english)).toContain("\0en");
    expect(compareTryoutPlacements(english, indonesian)).toBeLessThan(0);
    expect(compareTryoutPlacements(indonesian, english)).toBeGreaterThan(0);
    expect(compareTryoutPlacements(english, english)).toBe(0);
  });

  it("digests sorted hierarchy and placement records", async () => {
    const catalog = catalogRows()
      .map(makeTryoutCatalogRecord)
      .sort((left, right) => compareTryoutCatalog(left.row, right.row));
    const placements = [
      makeTryoutPlacementRecord(placement("en", 1)),
      makeTryoutPlacementRecord(placement("id", 1)),
      makeTryoutPlacementRecord(placement("en", 2)),
    ].sort((left, right) => compareTryoutPlacements(left.row, right.row));
    const [catalogSummary, placementSummary] = await Effect.runPromise(
      Effect.all([
        digestTryoutCatalog(Stream.fromIterable(catalog)),
        digestTryoutPlacements(Stream.fromIterable(placements)),
      ])
    );

    expect(catalogSummary.count).toBe(5);
    expect(placementSummary.count).toBe(3);
    expect(catalogSummary.digest).not.toBe(placementSummary.digest);
  });

  it("rejects tampered and non-increasing record streams", async () => {
    const catalog = catalogRows()
      .map(makeTryoutCatalogRecord)
      .sort((left, right) => compareTryoutCatalog(left.row, right.row));
    const [firstCatalog] = catalog;
    if (firstCatalog === undefined) {
      throw new Error("Expected one catalog row.");
    }
    const placementRecord = makeTryoutPlacementRecord(placement("en", 1));
    const failures = [
      digestTryoutCatalog(
        Stream.make({ ...firstCatalog, rowHash: hashes.tampered })
      ),
      digestTryoutCatalog(Stream.make(firstCatalog, firstCatalog)),
      digestTryoutPlacements(
        Stream.make({ ...placementRecord, rowHash: hashes.tampered })
      ),
      digestTryoutPlacements(Stream.make(placementRecord, placementRecord)),
    ];
    const errors = await Effect.runPromise(
      Effect.all(failures.map((failure) => failure.pipe(Effect.flip)))
    );

    expect(errors.map(({ code }) => code)).toEqual([
      "integrity",
      "order",
      "integrity",
      "order",
    ]);
  });

  it("digests empty streams without retaining rows", async () => {
    const [catalog, placements] = await Effect.runPromise(
      Effect.all([
        digestTryoutCatalog(Stream.empty),
        digestTryoutPlacements(Stream.empty),
      ])
    );

    expect(catalog.count).toBe(0);
    expect(placements.count).toBe(0);
  });
});
