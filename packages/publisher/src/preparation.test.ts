import { compileContent } from "@nakafa/aksara-compiler/compile";
import { hashCompiledContentPayload } from "@nakafa/aksara-contracts/artifact/verify";
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
  MaterialKeySchema,
  MaterialLessonProjectionSchema,
  MaterialSectionSchema,
} from "@nakafa/aksara-contracts/projection/material";
import {
  ContentDeleteSchema,
  ContentUpsertSchema,
} from "@nakafa/aksara-contracts/release";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect, Stream } from "effect";
import { describe, expect, it } from "vitest";
import { prepareContentRelease } from "#publisher/preparation";
import type { PreparedContentUpsert } from "#publisher/preparation/spec";
import { rendererDomain } from "#test/renderer";

const rendererManifest = await Effect.runPromise(
  createRendererManifest({
    base: {
      authoringComponents: [{ name: "BlockMath", version: 1 }],
      supportedComponents: [{ name: "BlockMath", version: 1 }],
    },
    domains: [
      rendererDomain("material-chemistry", "AtomShellLab"),
      rendererDomain("material-mathematics", "FunctionMachine"),
    ],
  })
);
const source = CompileDocumentSourceSchema.make({
  contentKey: ContentKeySchema.make("test:prepare:a"),
  locale: "en",
  rawMdx: 'export const metadata = {}\n\n<BlockMath math="x" />',
  rendererDomain: "material-mathematics",
  sourcePath: CorpusSourcePathSchema.make(
    "packages/corpus/test/prepare/a/en.mdx"
  ),
});
const { payload } = await Effect.runPromise(
  compileContent({ ...source, rendererManifest })
);
const projection = MaterialLessonProjectionSchema.make({
  contentKey: source.contentKey,
  kind: "subject-lesson",
  locale: source.locale,
  materialKey: MaterialKeySchema.make("test.material"),
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
    locale: source.locale,
    operation: "upsert",
    publicPath: projection.publicPath,
    rendererDomain: source.rendererDomain,
    sourcePath: source.sourcePath,
  }),
  payload,
  projection,
  source,
};
const aksaraSha = GitCommitShaSchema.make("a".repeat(40));

/** Runs preparation with one replayable in-memory test protocol source. */
function prepare<E, R>(records: () => Stream.Stream<unknown, E, R>) {
  return prepareContentRelease({
    aksaraSha,
    baseReleaseId: null,
    records,
    releaseId: ReleaseIdSchema.make("test-prepare-release"),
    rendererManifest,
  });
}

describe("prepareContentRelease", () => {
  it("derives replayable items and projections from one canonical record source", async () => {
    const deletion = {
      change: ContentDeleteSchema.make({
        contentKey: ContentKeySchema.make("test:prepare:z"),
        locale: "en",
        operation: "delete",
      }),
    };
    const prepared = await Effect.runPromise(
      prepare(() => Stream.make(baseRecord, deletion))
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
        return replayCount === 1 ? Stream.make(baseRecord) : Stream.empty;
      }).pipe(Effect.flip)
    );
    expect(error._tag).toBe("ReleaseItemCountMismatchError");
  });

  it("validates the renderer before invoking the authored source", async () => {
    let invoked = false;
    const error = await Effect.runPromise(
      prepareContentRelease({
        aksaraSha,
        baseReleaseId: null,
        records: () => {
          invoked = true;
          return Stream.make(baseRecord);
        },
        releaseId: ReleaseIdSchema.make("test-invalid-renderer"),
        rendererManifest: {
          ...rendererManifest,
          hash: Sha256HashSchema.make(`sha256:${"9".repeat(64)}`),
        },
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
        baseReleaseId: selfBasedRelease,
        records: () => {
          invoked = true;
          return Stream.make(baseRecord);
        },
        releaseId: selfBasedRelease,
        rendererManifest,
      }).pipe(Effect.flip)
    );

    expect(error).toMatchObject({
      _tag: "PreparedReleaseIdentityError",
      baseReleaseId: selfBasedRelease,
      releaseId: selfBasedRelease,
    });
    expect(invoked).toBe(false);
  });
});
