import { SignedContentArtifactSchema } from "@nakafa/aksara-contracts/content";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  Ed25519SignatureSchema,
  PublicPathSchema,
  type ReleaseId,
  ReleaseIdSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "@nakafa/aksara-contracts/ids";
import { hashContentProjection } from "@nakafa/aksara-contracts/projection/hash";
import {
  MaterialLessonProjectionSchema,
  MaterialSectionSchema,
} from "@nakafa/aksara-contracts/projection/material";
import { MaterialHeadSchema } from "@nakafa/aksara-contracts/release/head";
import {
  DerivedRollbackRecordSchema,
  type DerivedRollbackState,
  snapshotRollbackState,
} from "#publisher/rollback/records";
import { materialGraph } from "#test/graph";
import { projection as baseProjection, contentRecord } from "#test/publication";

export const rollbackFixtureReleaseId = ReleaseIdSchema.make(
  "test-derived-rollback"
);

interface MaterialFixtureInput {
  readonly contentKey: string;
  readonly hashCharacter: string;
  readonly index: number;
  readonly publicPath: string;
  readonly releaseId?: ReleaseId;
}

/** Builds one internally coherent derived material state and compact head. */
export function makeDerivedMaterial(input: MaterialFixtureInput) {
  const contentKey = ContentKeySchema.make(input.contentKey);
  const publicPath = PublicPathSchema.make(input.publicPath);
  const sourcePath = CorpusSourcePathSchema.make(
    `packages/corpus/material/lesson/test/${input.hashCharacter}/en.mdx`
  );
  const hash = Sha256HashSchema.make(
    `sha256:${input.hashCharacter.repeat(64)}`
  );
  const projection = MaterialLessonProjectionSchema.make({
    ...baseProjection,
    contentKey,
    graph: materialGraph("en", "material", `test-${input.hashCharacter}`),
    parentPath: PublicPathSchema.make(
      input.publicPath.slice(0, input.publicPath.lastIndexOf("/"))
    ),
    publicPath,
    sectionKey: MaterialSectionSchema.make(`test-${input.hashCharacter}`),
  });
  const payload = {
    ...contentRecord.payload,
    compilerConfigHash: hash,
    contentKey,
    sourceHash: hash,
  };
  const artifact = SignedContentArtifactSchema.make({
    artifactHash: hash,
    keyId: SigningKeyIdSchema.make("test-derived-key"),
    payload,
    signature: Ed25519SignatureSchema.make(`${"A".repeat(85)}A`),
  });
  const change = {
    artifactHash: hash,
    contentKey,
    delivery: "public" as const,
    family: "material" as const,
    locale: "en" as const,
    operation: "upsert" as const,
    rendererDomain: "mathematics" as const,
    sourcePath,
  };
  const state: DerivedRollbackState = {
    artifact,
    item: {
      change,
      index: input.index,
      releaseId: input.releaseId ?? rollbackFixtureReleaseId,
    },
    kind: "upsert",
    projection,
  };
  const snapshot = snapshotRollbackState(state);
  const head = MaterialHeadSchema.make({
    artifactHash: change.artifactHash,
    compilerConfigHash: payload.compilerConfigHash,
    contentKey: change.contentKey,
    delivery: change.delivery,
    family: "material",
    locale: change.locale,
    projectionHash: hashContentProjection(projection),
    publicPath: projection.publicPath,
    rendererDomain: change.rendererDomain,
    sourceHash: payload.sourceHash,
    sourcePath: change.sourcePath,
  });
  return {
    head,
    snapshot,
    state,
  };
}

/** Builds one body-free derived absence state for a known material identity. */
export function makeDerivedDelete(input: {
  readonly contentKey: string;
  readonly index: number;
  readonly releaseId?: ReleaseId;
}) {
  return {
    item: {
      change: {
        contentKey: ContentKeySchema.make(input.contentKey),
        family: "material" as const,
        locale: "en" as const,
        operation: "delete" as const,
      },
      index: input.index,
      releaseId: input.releaseId ?? rollbackFixtureReleaseId,
    },
    kind: "delete" as const,
  };
}

/** Pairs current and prior derived states under one exact transition index. */
export function makeDerivedTransition(
  current: DerivedRollbackState,
  prior: DerivedRollbackState
) {
  return DerivedRollbackRecordSchema.make({ current, prior });
}
