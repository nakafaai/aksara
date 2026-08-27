import { TryoutHistoryMigrationValueSchema } from "@nakafa/aksara-contracts/transport/migration/tryout/response";
import { Effect, Schema } from "effect";

import type { ConvertedTryoutArtifact } from "#publisher/migration/tryout/artifact";
import { convertedArtifactMap } from "#publisher/migration/tryout/row";
import {
  answerArtifactHash,
  questionArtifactHash,
} from "#test/migration/artifact";
import { convertedArtifacts } from "#test/migration/converted";
import { migrationId } from "#test/migration/source";

const graph = {
  alignmentId: "alignment:tryout-indonesia",
  assetId: "asset:tryout-indonesia",
  conceptId: "concept:tryout-indonesia",
  learningObjectId: "lo:tryout-indonesia",
  lensId: "lens:tryout-indonesia",
};
const questionRoot =
  "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1";

const catalogValue = Schema.decodeSync(TryoutHistoryMigrationValueSchema)({
  command: "rowPage",
  isDone: true,
  migrationId,
  nextIndex: null,
  rowKind: "catalog",
  rows: [
    {
      index: 0,
      row: {
        family: "tryout",
        record: {
          row: {
            countryCode: "ID",
            countryKey: "indonesia",
            graph,
            kind: "country",
            locale: "en",
            order: 1,
            publicPath: "try-out/indonesia",
            sourceRevision: "retained-source",
            title: "Indonesia",
          },
          rowHash: `sha256:${"e".repeat(64)}`,
        },
        rowKind: "catalog",
      },
    },
  ],
});
const placementValue = Schema.decodeSync(TryoutHistoryMigrationValueSchema)({
  command: "rowPage",
  isDone: true,
  migrationId,
  nextIndex: null,
  rowKind: "placement",
  rows: [
    {
      index: 1,
      row: {
        family: "tryout",
        record: {
          row: {
            answerArtifactHash,
            answerContentKey: `${questionRoot}/answer`,
            choices: [
              { isCorrect: true, label: "A", optionKey: "option-1", order: 1 },
              {
                isCorrect: false,
                label: "B",
                optionKey: "option-2",
                order: 2,
              },
            ],
            countryKey: "indonesia",
            examKey: "snbt",
            locale: "en",
            questionArtifactHash,
            questionContentKey: `${questionRoot}/question`,
            questionOrder: 1,
            questionSourcePath: `packages/corpus/${questionRoot}`,
            rendererDomain: "snbt-general",
            scope: "server",
            sectionKey: "general-reasoning",
            setKey: "set-1",
            sourceRevision: "retained-source",
            title: "Question 1",
            trackKey: "2027",
          },
          rowHash: `sha256:${"f".repeat(64)}`,
        },
        rowKind: "placement",
      },
    },
  ],
});

export const historicalCatalogEntries =
  catalogValue.command === "rowPage" ? catalogValue.rows : [];
export const historicalPlacementEntries =
  placementValue.command === "rowPage" ? placementValue.rows : [];

/** Complete indexed retained rows used by publisher migration tests. */
export const historicalRows = {
  catalog: historicalCatalogEntries.flatMap((entry) =>
    entry.row.rowKind === "catalog"
      ? [{ index: entry.index, row: entry.row }]
      : []
  ),
  placements: historicalPlacementEntries.flatMap((entry) =>
    entry.row.rowKind === "placement"
      ? [{ index: entry.index, row: entry.row }]
      : []
  ),
};

/** Body-free artifact identities corresponding to the retained fixture. */
export const convertedArtifactMaps =
  convertedArtifacts.map(convertedArtifactMap);

/** Provides deterministic random reads over converted test artifacts. */
export function convertedArtifactSpool(
  artifacts: readonly ConvertedTryoutArtifact[] = convertedArtifacts
) {
  return {
    count: artifacts.length,
    read: (index: number) => {
      const artifact = artifacts[index];
      return artifact === undefined
        ? Effect.die("Expected one converted artifact fixture.")
        : Effect.succeed(artifact);
    },
  };
}
export const currentAnswerHash =
  convertedArtifacts[0].mapping.artifact.artifactHash;
export const currentQuestionHash =
  convertedArtifacts[1].mapping.artifact.artifactHash;
