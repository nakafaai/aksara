import { describe, expect, it } from "@effect/vitest";
import { CompiledContentPayloadSchema } from "@nakafa/aksara-contracts/content";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
} from "@nakafa/aksara-contracts/ids";
import { ArtifactLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { RendererDomainSchema } from "@nakafa/aksara-contracts/renderer/domain";
import { Effect } from "effect";
import { vi } from "vitest";

import {
  type ConvertedTryoutArtifact,
  ConvertedTryoutArtifactSchema,
  makeArtifactRequirements,
} from "#publisher/migration/tryout/artifact";
import {
  convertedArtifactMap,
  convertedCatalogRecords,
  convertedPlacementRecords,
  convertTryoutRows,
} from "#publisher/migration/tryout/row";
import {
  answerArtifactHash,
  historicalArtifacts,
  questionArtifactHash,
} from "#test/migration/artifact";
import { convertedArtifacts } from "#test/migration/converted";
import {
  convertedArtifactSpool,
  currentAnswerHash,
  currentQuestionHash,
  historicalRows,
} from "#test/migration/rows";
import { migrationSigner } from "#test/migration/signing";

const mapping = vi.hoisted(() => ({ catalog: true, placement: true }));

/** Converts rows against an in-memory implementation of the disk index. */
const convertRows = Effect.fn("AksaraPublisherTest.convertRows")(function* (
  rows = historicalRows,
  artifacts: readonly ConvertedTryoutArtifact[] = convertedArtifacts
) {
  const requirements = yield* makeArtifactRequirements(rows, 2);
  return yield* convertTryoutRows(
    rows,
    requirements,
    convertedArtifactSpool(artifacts)
  );
});

/** Changes one converted artifact field for fail-closed row tests. */
function changeArtifact(
  artifact: ConvertedTryoutArtifact,
  input: {
    readonly payload?: Partial<typeof CompiledContentPayloadSchema.Type>;
    readonly role?: ConvertedTryoutArtifact["role"];
  }
) {
  return ConvertedTryoutArtifactSchema.make({
    ...artifact,
    mapping: {
      ...artifact.mapping,
      artifact: {
        ...artifact.mapping.artifact,
        payload: CompiledContentPayloadSchema.make({
          ...artifact.mapping.artifact.payload,
          ...input.payload,
        }),
      },
    },
    role: input.role ?? artifact.role,
  });
}

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
      const rows = yield* convertRows();
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
        convertedArtifactMap(
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

  it.effect("rejects duplicate, missing, and mismatched artifact records", () =>
    Effect.gen(function* () {
      const first = convertedArtifacts.at(0);
      if (first === undefined) {
        return yield* Effect.die("Expected converted artifact fixtures.");
      }
      const requirements = yield* makeArtifactRequirements(historicalRows, 2);
      const duplicate = yield* convertTryoutRows(
        historicalRows,
        requirements,
        convertedArtifactSpool([...convertedArtifacts, first])
      ).pipe(Effect.flip);
      const missing = yield* convertTryoutRows(
        historicalRows,
        requirements,
        convertedArtifactSpool(convertedArtifacts.slice(0, 1))
      ).pipe(Effect.flip);
      const fields: readonly Parameters<typeof changeArtifact>[1][] = [
        { payload: { artifactLocale: ArtifactLocaleSchema.make("de") } },
        {
          payload: {
            contentKey: ContentKeySchema.make(
              "question-bank/mismatch/question"
            ),
          },
        },
        {
          payload: {
            rendererDomain: RendererDomainSchema.make("mathematics"),
          },
        },
        { role: "answer" },
      ];
      const mismatches = yield* Effect.forEach(fields, (override) =>
        convertRows(
          historicalRows,
          convertedArtifacts.map((artifact) =>
            artifact.mapping.oldArtifactHash === questionArtifactHash
              ? changeArtifact(artifact, override)
              : artifact
          )
        ).pipe(Effect.flip)
      );

      expect(failureReason(duplicate)).toBe("artifact-count");
      expect(failureReason(missing)).toBe("artifact-count");
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
      const catalog = yield* convertRows({
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
      }).pipe(Effect.flip);
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
      const invalidArtifacts = convertedArtifacts.map((artifact) => {
        if (artifact.mapping.oldArtifactHash === questionArtifactHash) {
          return changeArtifact(artifact, {
            payload: { contentKey: questionContentKey },
          });
        }
        if (artifact.mapping.oldArtifactHash === answerArtifactHash) {
          return changeArtifact(artifact, {
            payload: { contentKey: ContentKeySchema.make("invalid/answer") },
          });
        }
        return artifact;
      });
      const source = yield* convertRows(invalidRows, invalidArtifacts).pipe(
        Effect.flip
      );

      expect(failureReason(catalog)).toBe("catalog-conversion");
      expect(failureReason(source)).toBe("placement-conversion");
    })
  );

  it.effect("rejects any non-lossless catalog or placement mapping", () =>
    Effect.gen(function* () {
      mapping.catalog = false;
      const catalog = yield* convertRows().pipe(Effect.flip);
      mapping.catalog = true;
      mapping.placement = false;
      const placement = yield* convertRows().pipe(Effect.flip);
      mapping.placement = true;

      expect(failureReason(catalog)).toBe("catalog-conversion");
      expect(failureReason(placement)).toBe("placement-conversion");
    })
  );
});
