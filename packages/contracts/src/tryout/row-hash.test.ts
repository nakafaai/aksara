import { Effect, Schema, Stream } from "effect";
import { describe, expect, it } from "vitest";
import { Sha256HashSchema } from "#contracts/ids";
import { compareTryoutCatalog } from "#contracts/tryout/identity";
import {
  canonicalizeTryoutCatalog,
  digestTryoutCatalog,
  makeTryoutCatalogRecord,
} from "#contracts/tryout/row-hash";
import {
  type TryoutCatalogRow,
  TryoutCatalogRowSchema,
} from "#contracts/tryout/spec";

const hashes = {
  tampered: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
};
/** Derives current SNBT graph facts for one canonical hierarchy sample. */
function graph(kind: TryoutCatalogRow["kind"]) {
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
      order: 1,
      publicPath: "try-out/indonesia",
    },
    {
      ...common,
      countryKey: "indonesia",
      examKey: "snbt",
      graph: graph("exam"),
      kind: "exam",
      order: 1,
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

describe("try-out row hashing", () => {
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

  it("digests sorted hierarchy records", async () => {
    const catalog = catalogRows()
      .map(makeTryoutCatalogRecord)
      .sort((left, right) => compareTryoutCatalog(left.row, right.row));
    const summary = await Effect.runPromise(
      digestTryoutCatalog(Stream.fromIterable(catalog))
    );

    expect(summary.count).toBe(5);
  });

  it("rejects tampered and non-increasing record streams", async () => {
    const catalog = catalogRows()
      .map(makeTryoutCatalogRecord)
      .sort((left, right) => compareTryoutCatalog(left.row, right.row));
    const [firstCatalog] = catalog;
    if (firstCatalog === undefined) {
      throw new Error("Expected one catalog row.");
    }
    const failures = [
      digestTryoutCatalog(
        Stream.make({ ...firstCatalog, rowHash: hashes.tampered })
      ),
      digestTryoutCatalog(Stream.make(firstCatalog, firstCatalog)),
    ];
    const errors = await Effect.runPromise(
      Effect.all(failures.map((failure) => failure.pipe(Effect.flip)))
    );

    expect(errors.map(({ code }) => code)).toEqual(["integrity", "order"]);
  });

  it("digests empty streams without retaining rows", async () => {
    const catalog = await Effect.runPromise(digestTryoutCatalog(Stream.empty));

    expect(catalog.count).toBe(0);
  });
});
