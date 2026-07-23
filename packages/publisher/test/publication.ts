import { compileContent } from "@nakafa/aksara-compiler/compile";
import { hashCompiledContentPayload } from "@nakafa/aksara-contracts/artifact/integrity";
import { CompileDocumentSourceSchema } from "@nakafa/aksara-contracts/content";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  GitCommitShaSchema,
  PublicPathSchema,
  ReleaseIdSchema,
} from "@nakafa/aksara-contracts/ids";
import { hashContentProjection } from "@nakafa/aksara-contracts/projection/hash";
import {
  MaterialKeySchema,
  MaterialLessonProjectionSchema,
  MaterialSectionSchema,
} from "@nakafa/aksara-contracts/projection/material";
import { ContentUpsertSchema } from "@nakafa/aksara-contracts/release";
import { MaterialHeadSchema } from "@nakafa/aksara-contracts/release/head";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result";
import { rendererDomains } from "@nakafa/aksara-contracts/renderer/contract";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect, Stream } from "effect";
import { prepareContentRelease } from "#publisher/preparation";
import { materialGraph } from "#test/graph";
import { emptySnapshotSources } from "#test/snapshot";

export const rendererManifest = await Effect.runPromise(
  createRendererManifest({
    base: {
      authoringComponents: [{ name: "BlockMath", version: 1 }],
      supportedComponents: [{ name: "BlockMath", version: 1 }],
    },
    domains: rendererDomains({
      chemistry: [{ name: "AtomShellLab", version: 1 }],
      mathematics: [{ name: "FunctionMachine", version: 1 }],
    }),
  })
);

export const publicationSource = CompileDocumentSourceSchema.make({
  contentKey: ContentKeySchema.make("test:publication"),
  locale: "en",
  rawMdx: 'export const metadata = {}\n\n<BlockMath math="x" />',
  rendererDomain: "mathematics",
  sourcePath: CorpusSourcePathSchema.make(
    "packages/corpus/test/publication/en.mdx"
  ),
});

export const { payload: publicationPayload } = await Effect.runPromise(
  compileContent({ ...publicationSource, rendererManifest })
);

export const projection = MaterialLessonProjectionSchema.make({
  contentKey: publicationSource.contentKey,
  graph: materialGraph(publicationSource.locale, "material", "test-lesson"),
  kind: "subject-lesson",
  locale: publicationSource.locale,
  materialKey: MaterialKeySchema.make("lesson.test.material"),
  metadata: { authors: [], date: "2026-01-01", title: "Test protocol" },
  order: 1,
  parentPath: PublicPathSchema.make("subjects/test/material"),
  publicPath: PublicPathSchema.make("subjects/test/material/lesson"),
  sectionKey: MaterialSectionSchema.make("test-lesson"),
  sitemap: true,
});
export const contentRecord = {
  change: ContentUpsertSchema.make({
    artifactHash: hashCompiledContentPayload(publicationPayload),
    contentKey: publicationPayload.contentKey,
    delivery: "public",
    family: "material",
    locale: publicationPayload.locale,
    operation: "upsert",
    rendererDomain: publicationPayload.rendererDomain,
    sourcePath: publicationSource.sourcePath,
  }),
  payload: publicationPayload,
  projection,
  source: publicationSource,
};
export const head = MaterialHeadSchema.make({
  artifactHash: contentRecord.change.artifactHash,
  compilerConfigHash: publicationPayload.compilerConfigHash,
  contentKey: contentRecord.change.contentKey,
  delivery: contentRecord.change.delivery,
  family: "material",
  locale: contentRecord.change.locale,
  projectionHash: hashContentProjection(projection),
  publicPath: projection.publicPath,
  rendererDomain: contentRecord.change.rendererDomain,
  sourceHash: publicationPayload.sourceHash,
  sourcePath: contentRecord.change.sourcePath,
});
export const record = {
  prior: {
    contentKey: contentRecord.change.contentKey,
    family: "material",
    locale: contentRecord.change.locale,
    state: "absent" as const,
  },
  record: contentRecord,
};

/** Prepares one real publisher input through the only public constructor. */
export async function makeRelease(
  releaseId: string,
  records: () => Stream.Stream<unknown> = () => Stream.make(record),
  sha = "a".repeat(40)
) {
  const prepared = await Effect.runPromise(
    prepareContentRelease({
      aksaraSha: GitCommitShaSchema.make(sha),
      baseManifestHash: null,
      baseReleaseId: null,
      baseResultCount: 0,
      baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
      previousSnapshots: null,
      records,
      releaseId: ReleaseIdSchema.make(releaseId),
      rendererManifest,
      result: () => Stream.make(head),
      routes: () =>
        Stream.make({
          current: {
            contentKey: contentRecord.change.contentKey,
            locale: contentRecord.change.locale,
          },
          next: {
            contentKey: contentRecord.change.contentKey,
            locale: contentRecord.change.locale,
            publicPath: projection.publicPath,
          },
        }),
      ...emptySnapshotSources,
    })
  );
  return { manifest: prepared.manifest, prepared };
}
