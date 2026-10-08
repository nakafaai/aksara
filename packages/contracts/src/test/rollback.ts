import { Schema } from "effect";
import { SignedContentArtifactSchema } from "#contracts/content";
import { MaterialLessonProjectionSchema } from "#contracts/projection/material";
import {
  MaterialHeadSchema,
  QuestionHeadSchema,
} from "#contracts/release/head";
import {
  RollbackDeleteStateSchema,
  RollbackRecordSchema,
  RollbackSnapshotEntrySchema,
  RollbackUpsertStateSchema,
} from "#contracts/release/rollback/spec";
import { ContentUpsertSchema } from "#contracts/release/spec";
import { materialGraph } from "#contracts/test/graph";

export const artifact = Schema.decodeSync(SignedContentArtifactSchema)({
  artifactHash: `sha256:${"a".repeat(64)}`,
  keyId: "test-old-key",
  payload: {
    artifactLocale: "en",
    byteLength: 1,
    compiledCode: "x",
    compilerConfigHash: `sha256:${"b".repeat(64)}`,
    compilerVersion: "0.1.0",
    contentKey: "test:rollback",
    format: "mdx-function-body",
    mdxCompilerVersion: "3.1.1",
    plainText: "x",
    rawMdx: "x",
    rendererDomain: "mathematics",
    requiredComponents: [],
    sourceHash: `sha256:${"c".repeat(64)}`,
  },
  signature: `${"A".repeat(85)}A`,
});

const change = Schema.decodeSync(ContentUpsertSchema)({
  artifactHash: artifact.artifactHash,
  artifactLocale: artifact.payload.artifactLocale,
  contentKey: artifact.payload.contentKey,
  delivery: "public",
  family: "material",
  operation: "upsert",
  rendererDomain: artifact.payload.rendererDomain,
  sourcePath: "packages/corpus/test/rollback/en.mdx",
});

export const projection = Schema.decodeSync(MaterialLessonProjectionSchema)({
  appLocale: "en",
  artifactLocale: artifact.payload.artifactLocale,
  contentKey: artifact.payload.contentKey,
  graph: materialGraph("en", "test", "material", "test-lesson"),
  kind: "subject-lesson",
  materialKey: "lesson.test.material",
  metadata: { authors: [], datePublished: "2026-01-01", title: "Test" },
  order: 1,
  parentPath: "subjects/test/material",
  publicPath: "subjects/test/material/lesson",
  sectionKey: "test-lesson",
  sitemap: true,
  topicTitle: "Test Material",
});

const head = Schema.decodeSync(MaterialHeadSchema)({
  artifactHash: artifact.artifactHash,
  artifactLocale: change.artifactLocale,
  compilerConfigHash: artifact.payload.compilerConfigHash,
  contentKey: change.contentKey,
  delivery: change.delivery,
  family: "material",
  projectionHash: `sha256:${"d".repeat(64)}`,
  publicPath: projection.publicPath,
  rendererDomain: change.rendererDomain,
  sourceHash: artifact.payload.sourceHash,
  sourcePath: change.sourcePath,
});

const questionHead = Schema.decodeSync(QuestionHeadSchema)({
  artifactHash: artifact.artifactHash,
  artifactLocale: change.artifactLocale,
  compilerConfigHash: artifact.payload.compilerConfigHash,
  contentKey: change.contentKey,
  delivery: "authenticated",
  family: "question",
  projectionHash: `sha256:${"d".repeat(64)}`,
  rendererDomain: "snbt-general",
  sourceHash: artifact.payload.sourceHash,
  sourcePath: change.sourcePath,
});

export const upsert = RollbackUpsertStateSchema.make({
  artifact,
  change,
  projection,
});

export const deletion = Schema.decodeSync(RollbackDeleteStateSchema)({
  change: {
    artifactLocale: change.artifactLocale,
    contentKey: change.contentKey,
    family: "material",
    operation: "delete",
  },
});

export const record = RollbackRecordSchema.make({
  current: upsert,
  index: 0,
  prior: deletion,
});

export const reverseRecord = RollbackRecordSchema.make({
  current: deletion,
  index: 1,
  prior: upsert,
});

const richProjection = Schema.decodeSync(MaterialLessonProjectionSchema)({
  appLocale: "en",
  artifactLocale: "en",
  contentKey: "test:rollback",
  graph: materialGraph("en", "test", "material", "test-lesson"),
  kind: "subject-lesson",
  materialKey: "lesson.test.material",
  metadata: {
    authors: [],
    dateModified: "2026-02-01",
    datePublished: "2026-01-01",
    description: "Deskripsi uji é",
    searchTitle: "Judul pencarian é",
    subject: "Matematika é",
    title: "Tes é",
  },
  order: 1,
  parentPath: "subjects/test/material",
  publicPath: "subjects/test/material/lesson",
  sectionKey: "test-lesson",
  sitemap: true,
  topicTitle: "Test Material",
});

export const richRecord = RollbackRecordSchema.make({
  current: RollbackUpsertStateSchema.make({
    artifact,
    change,
    projection: richProjection,
  }),
  index: 0,
  prior: deletion,
});

export const absentEntry = Schema.decodeSync(RollbackSnapshotEntrySchema)({
  index: 0,
  releaseId: "release-active",
  snapshot: {
    artifactLocale: change.artifactLocale,
    contentKey: change.contentKey,
    family: "material",
    state: "absent",
  },
});

export const materialEntry = Schema.decodeSync(RollbackSnapshotEntrySchema)({
  index: 1,
  releaseId: "release-active",
  snapshot: { head, state: "material" },
});

export const questionEntry = Schema.decodeSync(RollbackSnapshotEntrySchema)({
  index: 2,
  releaseId: "release-active",
  snapshot: { head: questionHead, state: "question" },
});

/** Test material rollback snapshot entry for the rollback digest vectors. */
export const digestMaterialEntry = Schema.decodeSync(
  RollbackSnapshotEntrySchema
)({
  index: 1,
  releaseId: "test-rollback-digest",
  snapshot: {
    head: {
      artifactHash:
        "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      artifactLocale: "en",
      compilerConfigHash:
        "sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      contentKey: "test:rollback-material",
      delivery: "public",
      family: "material",
      projectionHash:
        "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
      publicPath: "subjects/test/rollback-material",
      rendererDomain: "mathematics",
      sourceHash:
        "sha256:dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
      sourcePath: "packages/corpus/test/rollback-material/en.mdx",
    },
    state: "material",
  },
});

/** Test question rollback snapshot entry for the rollback digest vectors. */
export const digestQuestionEntry = Schema.decodeSync(
  RollbackSnapshotEntrySchema
)({
  index: 2,
  releaseId: "test-rollback-digest",
  snapshot: {
    head: {
      artifactHash:
        "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      artifactLocale: "id",
      compilerConfigHash:
        "sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      contentKey: "question-bank/test/rollback",
      delivery: "authenticated",
      family: "question",
      projectionHash:
        "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
      rendererDomain: "snbt-general",
      sourceHash:
        "sha256:dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
      sourcePath: "packages/corpus/question-bank/test/rollback/id.mdx",
    },
    state: "question",
  },
});
