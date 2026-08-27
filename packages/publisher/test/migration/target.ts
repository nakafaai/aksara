import {
  CorpusSourcePathSchema,
  type Sha256Hash,
} from "@nakafa/aksara-contracts/ids";
import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import type { TryoutHistoryMigrationSource } from "@nakafa/aksara-contracts/transport/migration/tryout/response";
import { TryoutHistoryMigrationSourceSchema } from "@nakafa/aksara-contracts/transport/migration/tryout/response";
import { TryoutCatalogRowSchema } from "@nakafa/aksara-contracts/tryout/catalog";
import { makeTryoutCatalogRecord } from "@nakafa/aksara-contracts/tryout/catalog-hash";
import { Effect, Schema } from "effect";

import { makeArtifactRequirements } from "#publisher/migration/tryout/artifact";
import { convertTryoutRows } from "#publisher/migration/tryout/row";
import {
  convertHistoricalRenderer,
  prepareTryoutMigrationTarget,
} from "#publisher/migration/tryout/target";
import { convertedArtifacts } from "#test/migration/converted";
import {
  convertedArtifactMaps,
  convertedArtifactSpool,
  historicalRows,
} from "#test/migration/rows";
import { migrationSigner } from "#test/migration/signing";
import { historicalRenderer, historicalSource } from "#test/migration/source";

/** Strictly decodes one migration source fixture after an intentional edit. */
function decodeSource(input: unknown) {
  return Schema.decodeUnknownSync(TryoutHistoryMigrationSourceSchema)(input, {
    onExcessProperty: "error",
  });
}

/** Builds the complete deterministic current target for one retained source. */
export const makeMigrationTarget = Effect.fn(
  "AksaraPublisherTest.makeMigrationTarget"
)(function* (source: TryoutHistoryMigrationSource = historicalSource) {
  const requirements = yield* makeArtifactRequirements(
    historicalRows,
    convertedArtifacts.length
  );
  const rows = yield* convertTryoutRows(
    historicalRows,
    requirements,
    convertedArtifactSpool()
  );
  const rendererManifest = yield* convertHistoricalRenderer(
    source.rendererManifest
  );
  const prepared = yield* prepareTryoutMigrationTarget({
    artifacts: convertedArtifactMaps,
    rendererManifest,
    rows,
    signer: migrationSigner,
    source,
  });
  return { prepared, rows, source };
});

/** Builds a target whose extra internal section does not create a route. */
export const makeInternalTarget = Effect.fn(
  "AksaraPublisherTest.makeInternalMigrationTarget"
)(function* (oldRowHash: Sha256Hash) {
  const requirements = yield* makeArtifactRequirements(
    historicalRows,
    convertedArtifacts.length
  );
  const rows = yield* convertTryoutRows(
    historicalRows,
    requirements,
    convertedArtifactSpool()
  );
  const first = rows.catalog.at(0);
  if (first === undefined) {
    return yield* Effect.die("Expected one converted catalog fixture.");
  }
  const rendererManifest = yield* convertHistoricalRenderer(historicalRenderer);
  const record = makeTryoutCatalogRecord(
    TryoutCatalogRowSchema.make({
      appLocale: AppLocaleSchema.make("en"),
      countryKey: "indonesia",
      examKey: "snbt",
      graph: first.record.row.graph,
      kind: "section",
      order: 1,
      questionCount: 1,
      questionSourcePath: CorpusSourcePathSchema.make(
        "packages/corpus/question-bank/tryout/indonesia/snbt/internal/set-1"
      ),
      sectionKey: "internal",
      setKey: "set-1",
      sourceRevision: "retained-source",
      timeLimitSeconds: 60,
      title: "Internal section",
      trackKey: "2027",
      visibility: "internal-entry",
    })
  );
  const source = decodeSource({
    ...historicalSource,
    evidence: {
      ...historicalSource.evidence,
      snapshot: {
        ...historicalSource.evidence.snapshot,
        counts: {
          ...historicalSource.evidence.snapshot.counts,
          section: 1,
        },
      },
    },
  });
  return yield* prepareTryoutMigrationTarget({
    artifacts: convertedArtifactMaps,
    rendererManifest,
    rows: {
      ...rows,
      catalog: [
        ...rows.catalog,
        { index: 1, oldRowHash, record, rowKind: "catalog" },
      ],
    },
    signer: migrationSigner,
    source,
  });
});
