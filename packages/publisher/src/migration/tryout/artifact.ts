import { inspectHistoricalContentSource } from "@nakafa/aksara-compiler/inspect";
import {
  type CompiledContentPayload,
  CompiledContentPayloadSchema,
} from "@nakafa/aksara-contracts/content";
import { DateOnlySchema } from "@nakafa/aksara-contracts/date";
import {
  authenticateHistoricalArtifact,
  type HistoricalAppLocale,
  type HistoricalSignedContentArtifact,
} from "@nakafa/aksara-contracts/history/decode";
import type {
  ContentKey,
  ReleaseId,
  Sha256Hash,
} from "@nakafa/aksara-contracts/ids";
import {
  AppLocaleSchema,
  type ArtifactLocale,
  ArtifactLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { hasLosslessHistoricalArtifactMapping } from "@nakafa/aksara-contracts/migration/tryout/history/lossless";
import type { RendererDomain } from "@nakafa/aksara-contracts/renderer/domain";
import { compareCodeUnits } from "@nakafa/aksara-contracts/text/order";
import {
  MAX_TRYOUT_HISTORY_MIGRATION_ARTIFACTS,
  type TryoutHistoryMigrationArtifactMapping,
  TryoutHistoryMigrationArtifactMappingSchema,
} from "@nakafa/aksara-contracts/transport/migration/tryout/request";
import { questionArtifactLocaleForSection } from "@nakafa/aksara-contracts/tryout/language";
import { Effect, Array as EffectArray, Schema, Stream } from "effect";
import { migrationFail } from "#publisher/migration/tryout/error";
import type { HistoricalTryoutRows } from "#publisher/migration/tryout/source";
import type { PublicationTarget } from "#publisher/publication/spec";
import type { PublicationSigner } from "#publisher/signing/service";

/** Lightweight conversion fact retained beside one disk-spooled artifact. */
export const ConvertedTryoutArtifactSchema = Schema.Struct({
  bodyMdx: Schema.String,
  date: DateOnlySchema,
  mapping: TryoutHistoryMigrationArtifactMappingSchema,
  role: Schema.Literals(["answer", "question"]),
});
export type ConvertedTryoutArtifact = typeof ConvertedTryoutArtifactSchema.Type;

interface ArtifactRequirement {
  readonly artifactLocale: ArtifactLocale;
  readonly contentKey: ContentKey;
  readonly index: number;
  readonly oldArtifactHash: Sha256Hash;
  readonly rendererDomain: RendererDomain;
  readonly role: "answer" | "question";
  readonly sourceLocale: HistoricalAppLocale;
}

type Target = typeof PublicationTarget.Service;

/** Checks whether repeated historical references require one exact conversion. */
function hasSameRequirement(
  left: ArtifactRequirement,
  right: Omit<ArtifactRequirement, "index">
) {
  return (
    left.artifactLocale === right.artifactLocale &&
    left.contentKey === right.contentKey &&
    left.rendererDomain === right.rendererDomain &&
    left.role === right.role &&
    left.sourceLocale === right.sourceLocale
  );
}

/** Adds one old artifact requirement while rejecting ambiguous reuse. */
function addRequirement(
  requirements: Map<Sha256Hash, Omit<ArtifactRequirement, "index">>,
  requirement: Omit<ArtifactRequirement, "index">
) {
  const previous = requirements.get(requirement.oldArtifactHash);
  if (previous && !hasSameRequirement({ ...previous, index: 0 }, requirement)) {
    return Effect.fail(migrationFail("artifact-requirement"));
  }
  requirements.set(requirement.oldArtifactHash, requirement);
  return Effect.void;
}

/** Derives every exact target locale and role from authenticated placements. */
export const makeArtifactRequirements = Effect.fn(
  "AksaraPublisher.makeTryoutArtifactRequirements"
)(function* (rows: HistoricalTryoutRows, expectedCount: number) {
  const requirements = new Map<
    Sha256Hash,
    Omit<ArtifactRequirement, "index">
  >();
  for (const { row: envelope } of rows.placements) {
    const { row } = envelope.record;
    const appLocale = AppLocaleSchema.make(row.locale);
    yield* addRequirement(requirements, {
      artifactLocale: questionArtifactLocaleForSection(
        row.sectionKey,
        appLocale
      ),
      contentKey: row.questionContentKey,
      oldArtifactHash: row.questionArtifactHash,
      rendererDomain: row.rendererDomain,
      role: "question",
      sourceLocale: row.locale,
    });
    yield* addRequirement(requirements, {
      artifactLocale: ArtifactLocaleSchema.make(row.locale),
      contentKey: row.answerContentKey,
      oldArtifactHash: row.answerArtifactHash,
      rendererDomain: row.rendererDomain,
      role: "answer",
      sourceLocale: row.locale,
    });
  }
  if (requirements.size !== expectedCount) {
    return yield* migrationFail("artifact-count");
  }
  return [...requirements.values()]
    .sort((left, right) =>
      compareCodeUnits(left.oldArtifactHash, right.oldArtifactHash)
    )
    .map((requirement, index) => ({ ...requirement, index }));
});

/** Converts one authenticated old artifact into the current signed format. */
const convertArtifact = Effect.fn("AksaraPublisher.convertTryoutArtifact")(
  function* (
    signer: PublicationSigner,
    requirement: ArtifactRequirement,
    untrusted: HistoricalSignedContentArtifact
  ) {
    const source = yield* authenticateHistoricalArtifact(untrusted).pipe(
      Effect.mapError(() => migrationFail("provenance"))
    );
    if (
      source.artifactHash !== requirement.oldArtifactHash ||
      source.payload.contentKey !== requirement.contentKey ||
      source.payload.locale !== requirement.sourceLocale ||
      source.payload.rendererDomain !== requirement.rendererDomain
    ) {
      return yield* migrationFail("artifact-contract");
    }
    const payload: CompiledContentPayload = CompiledContentPayloadSchema.make({
      artifactLocale: requirement.artifactLocale,
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
    });
    const artifact = yield* signer.signArtifact(payload);
    if (!hasLosslessHistoricalArtifactMapping(source, artifact)) {
      return yield* migrationFail("artifact-contract");
    }
    const inspection = yield* inspectHistoricalContentSource({
      contentKey: payload.contentKey,
      rawMdx: payload.rawMdx,
    }).pipe(Effect.mapError(() => migrationFail("artifact-contract")));
    if (
      inspection.contentKey !== payload.contentKey ||
      inspection.sourceHash !== payload.sourceHash
    ) {
      return yield* migrationFail("artifact-contract");
    }
    return yield* Schema.decodeUnknownEffect(ConvertedTryoutArtifactSchema)(
      {
        bodyMdx: inspection.bodyMdx,
        date: inspection.metadata.date,
        mapping: {
          artifact,
          index: requirement.index,
          oldArtifactHash: requirement.oldArtifactHash,
        },
        role: requirement.role,
      },
      { onExcessProperty: "error" }
    ).pipe(Effect.mapError(() => migrationFail("artifact-contract")));
  }
);

/** Fetches and converts one request-bounded historical artifact batch. */
const convertArtifactBatch = Effect.fn(
  "AksaraPublisher.convertTryoutArtifactBatch"
)(function* (
  target: Target,
  signer: PublicationSigner,
  migrationId: ReleaseId,
  sourceSnapshotId: Sha256Hash,
  requirements: readonly [ArtifactRequirement, ...ArtifactRequirement[]]
) {
  const value = yield* target.migrateTryoutHistory({
    artifactHashes: [
      requirements[0].oldArtifactHash,
      ...requirements.slice(1).map(({ oldArtifactHash }) => oldArtifactHash),
    ],
    command: "artifactBatch",
    operation: "migrateTryoutHistory",
    releaseId: migrationId,
    sourceSnapshotId,
  });
  if (
    value.command !== "artifactBatch" ||
    value.artifacts.length !== requirements.length
  ) {
    return yield* migrationFail("command-evidence");
  }
  return yield* Effect.forEach(
    EffectArray.zip(requirements, value.artifacts),
    ([requirement, artifact]) => convertArtifact(signer, requirement, artifact),
    { concurrency: 8 }
  );
});

/** Streams all converted artifacts in deterministic source-hash order. */
export function makeConvertedArtifactStream(input: {
  readonly migrationId: ReleaseId;
  readonly requirements: readonly ArtifactRequirement[];
  readonly signer: PublicationSigner;
  readonly sourceSnapshotId: Sha256Hash;
  readonly target: Target;
}) {
  return Stream.fromIterable(
    EffectArray.chunksOf(
      input.requirements,
      MAX_TRYOUT_HISTORY_MIGRATION_ARTIFACTS
    )
  ).pipe(
    Stream.mapEffect((requirements) =>
      convertArtifactBatch(
        input.target,
        input.signer,
        input.migrationId,
        input.sourceSnapshotId,
        requirements
      )
    ),
    Stream.flatMap(Stream.fromIterable)
  );
}

/** Projects one converted artifact into the signed staging request mapping. */
export function artifactMapping(
  converted: ConvertedTryoutArtifact
): TryoutHistoryMigrationArtifactMapping {
  return converted.mapping;
}
