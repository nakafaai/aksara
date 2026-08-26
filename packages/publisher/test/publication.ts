import { createHash } from "node:crypto";
import { NodeServices } from "@effect/platform-node";
import { compileContent } from "@nakafa/aksara-compiler/compile";
import { hashCompiledContentPayload } from "@nakafa/aksara-contracts/artifact/integrity";
import { CompileDocumentSourceSchema } from "@nakafa/aksara-contracts/content";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  GitCommitShaSchema,
  PublicPathSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  AppLocaleSchema,
  ArtifactLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { hashContentProjection } from "@nakafa/aksara-contracts/projection/hash";
import {
  MaterialKeySchema,
  MaterialLessonProjectionSchema,
  MaterialSectionSchema,
} from "@nakafa/aksara-contracts/projection/material";
import { ContentUpsertSchema } from "@nakafa/aksara-contracts/release";
import { MaterialHeadSchema } from "@nakafa/aksara-contracts/release/head";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result/spec";
import { PublicationScopeSchema } from "@nakafa/aksara-contracts/release/snapshot/scope";
import { canonicalizeRendererManifestContract } from "@nakafa/aksara-contracts/renderer/contract";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect, Stream } from "effect";
import { prepareContentRelease } from "#publisher/preparation";
import { materialGraph } from "#test/graph";
import { testRendererDomains } from "#test/renderer";
import { emptySnapshotSources, snapshotPolicyBase } from "#test/snapshot";

export const rendererManifest = await Effect.runPromise(
  createRendererManifest({
    base: {
      authoringComponents: [{ name: "BlockMath", version: 1 }],
      supportedComponents: [{ name: "BlockMath", version: 1 }],
    },
    domains: testRendererDomains({
      chemistry: [{ name: "AtomShellLab", version: 1 }],
      mathematics: [{ name: "FunctionMachine", version: 1 }],
    }),
    publishedDomains: ["mathematics"],
  })
);

/** Builds one authenticated historical subset that cannot drive publication. */
export function historicalRendererManifest() {
  const domains = rendererManifest.domains.slice(0, -1);
  const contract = {
    base: rendererManifest.base,
    domains,
    publishedDomains: rendererManifest.publishedDomains,
  };
  return {
    ...rendererManifest,
    domains,
    hash: Sha256HashSchema.make(
      `sha256:${createHash("sha256")
        .update(canonicalizeRendererManifestContract(contract))
        .digest("hex")}`
    ),
  };
}

export const publicationSource = CompileDocumentSourceSchema.make({
  artifactLocale: ArtifactLocaleSchema.make("en"),
  contentKey: ContentKeySchema.make("test:publication"),
  rawMdx: 'export const metadata = {}\n\n<BlockMath math="x" />',
  rendererDomain: "mathematics",
  sourcePath: CorpusSourcePathSchema.make(
    "packages/corpus/test/publication/en.mdx"
  ),
});

export const { payload: publicationPayload } = await Effect.runPromise(
  compileContent({ ...publicationSource, rendererManifest })
);

const publicationAppLocale = AppLocaleSchema.make("en");

export const projection = MaterialLessonProjectionSchema.make({
  appLocale: publicationAppLocale,
  artifactLocale: publicationSource.artifactLocale,
  contentKey: publicationSource.contentKey,
  graph: materialGraph(publicationAppLocale, "material", "test-lesson"),
  kind: "subject-lesson",
  materialKey: MaterialKeySchema.make("lesson.test.material"),
  metadata: {
    authors: [],
    datePublished: "2026-01-01",
    title: "Test protocol",
  },
  order: 1,
  parentPath: PublicPathSchema.make("subjects/test/material"),
  publicPath: PublicPathSchema.make("subjects/test/material/lesson"),
  sectionKey: MaterialSectionSchema.make("test-lesson"),
  sitemap: true,
  topicTitle: "Test Material",
});
export const contentRecord = {
  change: ContentUpsertSchema.make({
    artifactHash: hashCompiledContentPayload(publicationPayload),
    artifactLocale: publicationPayload.artifactLocale,
    contentKey: publicationPayload.contentKey,
    delivery: "public",
    family: "material",
    operation: "upsert",
    rendererDomain: publicationPayload.rendererDomain,
    sourcePath: publicationSource.sourcePath,
  }),
  payload: publicationPayload,
  projection,
  source: publicationSource,
};
export const publicationScope = PublicationScopeSchema.make({
  families: ["material"],
  snapshots: [],
});
export const head = MaterialHeadSchema.make({
  artifactHash: contentRecord.change.artifactHash,
  artifactLocale: contentRecord.change.artifactLocale,
  compilerConfigHash: publicationPayload.compilerConfigHash,
  contentKey: contentRecord.change.contentKey,
  delivery: contentRecord.change.delivery,
  family: "material",
  projectionHash: hashContentProjection(projection),
  publicPath: projection.publicPath,
  rendererDomain: contentRecord.change.rendererDomain,
  sourceHash: publicationPayload.sourceHash,
  sourcePath: contentRecord.change.sourcePath,
});
export const record = {
  prior: {
    artifactLocale: contentRecord.change.artifactLocale,
    contentKey: contentRecord.change.contentKey,
    family: "material",
    state: "absent" as const,
  },
  record: contentRecord,
};

/** Prepares one real publisher input through the only public constructor. */
export async function makeRelease(
  releaseId: string,
  records: Stream.Stream<unknown> = Stream.make(record),
  sha = "a".repeat(40)
) {
  const prepared = await Effect.runPromise(
    prepareContentRelease({
      aksaraSha: GitCommitShaSchema.make(sha),
      baseResultCount: 0,
      baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
      records,
      releaseId: ReleaseIdSchema.make(releaseId),
      rendererManifest,
      result: Stream.make(head),
      routes: Stream.make({
        current: {
          appLocale: projection.appLocale,
          contentKey: contentRecord.change.contentKey,
        },
        next: {
          appLocale: projection.appLocale,
          contentKey: contentRecord.change.contentKey,
          publicPath: projection.publicPath,
        },
      }),
      scope: publicationScope,
      ...snapshotPolicyBase(`${releaseId}-base`),
      ...emptySnapshotSources,
    }).pipe(Effect.provide(NodeServices.layer))
  );
  return { manifest: prepared.manifest, prepared };
}
