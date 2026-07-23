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
import { hashContentProjection } from "@nakafa/aksara-contracts/projection/hash";
import {
  MaterialKeySchema,
  MaterialLessonProjectionSchema,
  MaterialSectionSchema,
} from "@nakafa/aksara-contracts/projection/material";
import {
  ContentDeleteSchema,
  ContentUpsertSchema,
} from "@nakafa/aksara-contracts/release";
import { MaterialHeadSchema } from "@nakafa/aksara-contracts/release/head";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result";
import { rendererDomains } from "@nakafa/aksara-contracts/renderer/contract";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect, Stream } from "effect";
import { describe, expect, it } from "vitest";
import { prepareContentRelease } from "#publisher/preparation";
import type { PreparedContentUpsert } from "#publisher/preparation/spec";
import { materialGraph } from "#test/graph";

const rendererManifest = await Effect.runPromise(
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
const source = CompileDocumentSourceSchema.make({
  contentKey: ContentKeySchema.make("test:prepare:a"),
  locale: "en",
  rawMdx: 'export const metadata = {}\n\n<BlockMath math="x" />',
  rendererDomain: "mathematics",
  sourcePath: CorpusSourcePathSchema.make(
    "packages/corpus/test/prepare/a/en.mdx"
  ),
});
const { payload } = await Effect.runPromise(
  compileContent({ ...source, rendererManifest })
);
const projection = MaterialLessonProjectionSchema.make({
  contentKey: source.contentKey,
  graph: materialGraph(source.locale, "material", "test-a"),
  kind: "subject-lesson",
  locale: source.locale,
  materialKey: MaterialKeySchema.make("lesson.test.material"),
  metadata: { authors: [], date: "2026-01-01", title: "Test protocol" },
  order: 1,
  parentPath: PublicPathSchema.make("subjects/test/material"),
  publicPath: PublicPathSchema.make("subjects/test/material/a"),
  sectionKey: MaterialSectionSchema.make("test-a"),
  sitemap: true,
});
const baseRecord: PreparedContentUpsert = {
  change: ContentUpsertSchema.make({
    artifactHash: hashCompiledContentPayload(payload),
    contentKey: source.contentKey,
    delivery: "public",
    family: "material",
    locale: source.locale,
    operation: "upsert",
    rendererDomain: source.rendererDomain,
    sourcePath: source.sourcePath,
  }),
  payload,
  projection,
  source,
};
const aksaraSha = GitCommitShaSchema.make("a".repeat(40));
const resultHead = MaterialHeadSchema.make({
  artifactHash: baseRecord.change.artifactHash,
  compilerConfigHash: payload.compilerConfigHash,
  contentKey: baseRecord.change.contentKey,
  delivery: baseRecord.change.delivery,
  family: "material",
  locale: baseRecord.change.locale,
  projectionHash: hashContentProjection(projection),
  publicPath: projection.publicPath,
  rendererDomain: baseRecord.change.rendererDomain,
  sourceHash: payload.sourceHash,
  sourcePath: baseRecord.change.sourcePath,
});
const baseTransition = {
  prior: {
    contentKey: baseRecord.change.contentKey,
    family: "material",
    locale: baseRecord.change.locale,
    state: "absent" as const,
  },
  record: baseRecord,
};

/** Runs preparation with one replayable in-memory test protocol source. */
function prepare<E, R>(records: () => Stream.Stream<unknown, E, R>) {
  return prepareContentRelease({
    aksaraSha,
    baseManifestHash: null,
    baseReleaseId: null,
    baseResultCount: 0,
    baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
    records,
    releaseId: ReleaseIdSchema.make("test-prepare-release"),
    rendererManifest,
    result: () => Stream.make(resultHead),
    routes: () => Stream.empty,
  });
}

describe("prepareContentRelease", () => {
  it("derives replayable items and projections from one canonical record source", async () => {
    const deletion = {
      prior: {
        head: {
          ...resultHead,
          contentKey: ContentKeySchema.make("test:prepare:z"),
        },
        state: "material" as const,
      },
      record: {
        change: ContentDeleteSchema.make({
          contentKey: ContentKeySchema.make("test:prepare:z"),
          family: "material",
          locale: "en",
          operation: "delete",
        }),
      },
    };
    const prepared = await Effect.runPromise(
      prepare(() => Stream.make(baseTransition, deletion))
    );
    const [items, projections] = await Effect.runPromise(
      Effect.all([
        prepared.items().pipe(Stream.runCollect),
        prepared.projections().pipe(Stream.runCollect),
      ])
    );
    expect(prepared.manifest).toMatchObject({
      itemCount: 2,
      projectionCount: 1,
    });
    expect([...items].map(({ index }) => index)).toEqual([0, 1]);
    expect([...projections]).toEqual([projection]);
    expect(prepared.rendererManifest).toEqual(rendererManifest);
  });

  it("self-verifies every replay against its derived signed digests", async () => {
    let replayCount = 0;
    const error = await Effect.runPromise(
      prepare(() => {
        replayCount += 1;
        return replayCount === 1 ? Stream.make(baseTransition) : Stream.empty;
      }).pipe(Effect.flip)
    );
    expect(error._tag).toBe("ReleaseItemCountMismatchError");
  });

  it("validates the renderer before invoking the authored source", async () => {
    let invoked = false;
    const error = await Effect.runPromise(
      prepareContentRelease({
        aksaraSha,
        baseManifestHash: null,
        baseReleaseId: null,
        baseResultCount: 0,
        baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
        records: () => {
          invoked = true;
          return Stream.make(baseTransition);
        },
        releaseId: ReleaseIdSchema.make("test-invalid-renderer"),
        rendererManifest: {
          ...rendererManifest,
          hash: Sha256HashSchema.make(`sha256:${"9".repeat(64)}`),
        },
        result: () => Stream.make(resultHead),
        routes: () => Stream.empty,
      }).pipe(Effect.flip)
    );
    expect(error._tag).toBe("RendererManifestHashMismatchError");
    expect(invoked).toBe(false);
  });

  it("rejects reuse of the base release identity before reading records", async () => {
    const selfBasedRelease = ReleaseIdSchema.make("test-self-based-release");
    let invoked = false;
    const error = await Effect.runPromise(
      prepareContentRelease({
        aksaraSha,
        baseManifestHash: Sha256HashSchema.make(`sha256:${"8".repeat(64)}`),
        baseReleaseId: selfBasedRelease,
        baseResultCount: 1,
        baseResultDigest: resultHead.projectionHash,
        records: () => {
          invoked = true;
          return Stream.make(baseTransition);
        },
        releaseId: selfBasedRelease,
        rendererManifest,
        result: () => Stream.make(resultHead),
        routes: () => Stream.empty,
      }).pipe(Effect.flip)
    );

    expect(error).toMatchObject({
      _tag: "PreparedReleaseIdentityError",
      baseReleaseId: selfBasedRelease,
      releaseId: selfBasedRelease,
    });
    expect(invoked).toBe(false);
  });

  it.each([
    {
      baseManifestHash: Sha256HashSchema.make(`sha256:${"7".repeat(64)}`),
      baseReleaseId: null,
    },
    {
      baseManifestHash: null,
      baseReleaseId: ReleaseIdSchema.make("test-unpaired-base"),
    },
  ])("rejects an unpaired exact base identity", async (base) => {
    const error = await Effect.runPromise(
      prepareContentRelease({
        aksaraSha,
        ...base,
        baseResultCount: 0,
        baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
        records: () => Stream.make(baseTransition),
        releaseId: ReleaseIdSchema.make("test-invalid-base-pair"),
        rendererManifest,
        result: () => Stream.make(resultHead),
        routes: () => Stream.empty,
      }).pipe(Effect.flip)
    );

    expect(error).toMatchObject({ _tag: "PreparedReleaseBaseIdentityError" });
  });
});
