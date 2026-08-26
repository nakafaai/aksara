import { describe, expect, it } from "@effect/vitest";
import { CompiledContentPayloadSchema } from "@nakafa/aksara-contracts/content";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
} from "@nakafa/aksara-contracts/ids";
import { ArtifactLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { Effect } from "effect";
import { vi } from "vitest";

import { ConvertedTryoutArtifactSchema } from "#publisher/migration/tryout/artifact";
import {
  type ConvertedArtifactFact,
  convertedArtifactFact,
  convertedCatalogRecords,
  convertedPlacementRecords,
  convertTryoutRows,
} from "#publisher/migration/tryout/row";
import {
  answerArtifactHash,
  historicalArtifacts,
  questionArtifactHash,
} from "#test/migration/artifact";
import {
  convertedArtifactFacts,
  currentAnswerHash,
  currentQuestionHash,
  historicalRows,
} from "#test/migration/rows";
import { migrationSigner } from "#test/migration/signing";

const mapping = vi.hoisted(() => ({ catalog: true, placement: true }));

vi.mock(
  "@nakafa/aksara-contracts/migration/tryout/history/lossless",
  async (importOriginal) => {
    const original =
      await importOriginal<
        typeof import("@nakafa/aksara-contracts/migration/tryout/history/lossless")
      >();
    return {
      ...original,
      hasLosslessHistoricalCatalogMapping: (
        ...args: Parameters<typeof original.hasLosslessHistoricalCatalogMapping>
      ) =>
        mapping.catalog &&
        original.hasLosslessHistoricalCatalogMapping(...args),
      hasLosslessHistoricalPlacementMapping: (
        ...args: Parameters<
          typeof original.hasLosslessHistoricalPlacementMapping
        >
      ) =>
        mapping.placement &&
        original.hasLosslessHistoricalPlacementMapping(...args),
    };
  }
);

/** Returns the migration reason without hiding an unexpected failure tag. */
function failureReason(failure: { readonly _tag: string }) {
  return failure._tag === "TryoutHistoryMigrationError" && "reason" in failure
    ? failure.reason
    : failure._tag;
}

describe("try-out history row conversion", () => {
  it.effect("converts exact catalog, placement, and artifact identities", () =>
    Effect.gen(function* () {
      const rows = yield* convertTryoutRows(
        historicalRows,
        convertedArtifactFacts
      );
      const catalog = convertedCatalogRecords(rows);
      const placements = convertedPlacementRecords(rows);

      expect(catalog).toHaveLength(1);
      expect(catalog[0]?.row).toMatchObject({
        appLocale: "en",
        kind: "country",
      });
      expect(placements[0]?.row).toMatchObject({
        answerArtifactHash: currentAnswerHash,
        answerArtifactLocale: "en",
        appLocale: "en",
        deliveryLanguage: "en",
        questionArtifactHash: currentQuestionHash,
        questionArtifactLocale: "en",
      });
      expect(rows.catalog[0]?.index).toBe(0);
      expect(rows.placements[0]?.index).toBe(1);

      const source = historicalArtifacts.at(0);
      if (source === undefined) {
        return yield* Effect.die("Expected one retained artifact fixture.");
      }
      const artifact = yield* migrationSigner.signArtifact(
        CompiledContentPayloadSchema.make({
          artifactLocale: ArtifactLocaleSchema.make("en"),
          byteLength: source.payload.byteLength,
          compiledCode: source.payload.compiledCode,
          compilerConfigHash: source.payload.compilerConfigHash,
          compilerVersion: source.payload.compilerVersion,
          contentKey: source.payload.contentKey,
          format: "mdx-function-body",
          mdxCompilerVersion: source.payload.mdxCompilerVersion,
          plainText: source.payload.plainText,
          rawMdx: source.payload.rawMdx,
          rendererDomain: source.payload.rendererDomain,
          requiredComponents: source.payload.requiredComponents,
          sourceHash: source.payload.sourceHash,
        })
      );
      expect(
        convertedArtifactFact(
          ConvertedTryoutArtifactSchema.make({
            bodyMdx: "Retained answer",
            date: "2026-01-01",
            mapping: {
              artifact,
              index: 0,
              oldArtifactHash: answerArtifactHash,
            },
            role: "answer",
          })
        )
      ).toMatchObject({
        index: 0,
        newArtifactHash: artifact.artifactHash,
        oldArtifactHash: answerArtifactHash,
      });
    })
  );

  it.effect("rejects duplicate, missing, and mismatched artifact facts", () =>
    Effect.gen(function* () {
      const facts = convertedArtifactFacts;
      const duplicate = yield* convertTryoutRows(historicalRows, [
        ...facts,
        ...facts.slice(0, 1),
      ]).pipe(Effect.flip);
      const missing = yield* convertTryoutRows(
        historicalRows,
        facts.slice(0, 1)
      ).pipe(Effect.flip);
      const fields: readonly Partial<ConvertedArtifactFact>[] = [
        { artifactLocale: ArtifactLocaleSchema.make("de") },
        { contentKey: "question-bank/mismatch/question" },
        { rendererDomain: "mathematics" },
        { role: "answer" },
      ];
      const mismatches = yield* Effect.forEach(fields, (override) =>
        convertTryoutRows(
          historicalRows,
          facts.map((fact) =>
            fact.oldArtifactHash === questionArtifactHash
              ? { ...fact, ...override }
              : fact
          )
        ).pipe(Effect.flip)
      );

      expect(failureReason(duplicate)).toBe("artifact-count");
      expect(failureReason(missing)).toBe("artifact-requirement");
      expect(mismatches.map(failureReason)).toEqual([
        "artifact-requirement",
        "artifact-requirement",
        "artifact-requirement",
        "artifact-requirement",
      ]);
    })
  );

  it.effect("rejects malformed current catalog and placement projections", () =>
    Effect.gen(function* () {
      const catalog = yield* convertTryoutRows(
        {
          ...historicalRows,
          catalog: historicalRows.catalog.map(({ index, row }) => ({
            index,
            row: {
              ...row,
              record: {
                ...row.record,
                row: { ...row.record.row, order: 0 },
              },
            },
          })),
        },
        convertedArtifactFacts
      ).pipe(Effect.flip);
      const placement = historicalRows.placements.at(0);
      if (placement === undefined) {
        return yield* Effect.die("Expected one retained placement fixture.");
      }
      const questionContentKey = ContentKeySchema.make("invalid/question");
      const invalidRows = {
        ...historicalRows,
        placements: [
          {
            ...placement,
            row: {
              ...placement.row,
              record: {
                ...placement.row.record,
                row: {
                  ...placement.row.record.row,
                  answerContentKey: ContentKeySchema.make("invalid/answer"),
                  questionContentKey,
                  questionSourcePath: CorpusSourcePathSchema.make(
                    "packages/corpus/invalid/path"
                  ),
                },
              },
            },
          },
        ],
      };
      const invalidFacts = convertedArtifactFacts.map((fact) => {
        if (fact.oldArtifactHash === questionArtifactHash) {
          return { ...fact, contentKey: questionContentKey };
        }
        if (fact.oldArtifactHash === answerArtifactHash) {
          return { ...fact, contentKey: "invalid/answer" };
        }
        return fact;
      });
      const source = yield* convertTryoutRows(invalidRows, invalidFacts).pipe(
        Effect.flip
      );

      expect(failureReason(catalog)).toBe("catalog-conversion");
      expect(failureReason(source)).toBe("placement-conversion");
    })
  );

  it.effect("rejects any non-lossless catalog or placement mapping", () =>
    Effect.gen(function* () {
      mapping.catalog = false;
      const catalog = yield* convertTryoutRows(
        historicalRows,
        convertedArtifactFacts
      ).pipe(Effect.flip);
      mapping.catalog = true;
      mapping.placement = false;
      const placement = yield* convertTryoutRows(
        historicalRows,
        convertedArtifactFacts
      ).pipe(Effect.flip);
      mapping.placement = true;

      expect(failureReason(catalog)).toBe("catalog-conversion");
      expect(failureReason(placement)).toBe("placement-conversion");
    })
  );
});
