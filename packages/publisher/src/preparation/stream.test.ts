import { compileContent } from "@nakafa/aksara-compiler/compile";
import { hashCompiledContentPayload } from "@nakafa/aksara-contracts/artifact/verify";
import { CompileDocumentSourceSchema } from "@nakafa/aksara-contracts/content";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  PublicPathSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  MaterialKeySchema,
  MaterialLessonProjectionSchema,
  MaterialSectionSchema,
} from "@nakafa/aksara-contracts/projection/material";
import { ContentUpsertSchema } from "@nakafa/aksara-contracts/release";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect, Stream } from "effect";
import { describe, expect, it } from "vitest";
import type { PreparedContentUpsert } from "#publisher/preparation/spec";
import { derivePreparedRecords } from "#publisher/preparation/stream";
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
  contentKey: ContentKeySchema.make("test:stream:a"),
  locale: "en",
  rawMdx: "export const metadata = {}\n\nTest protocol.",
  rendererDomain: "material-mathematics",
  sourcePath: CorpusSourcePathSchema.make(
    "packages/corpus/test/stream/a/en.mdx"
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
const releaseId = ReleaseIdSchema.make("test-stream-release");

/** Runs one replay factory through the canonical derived stream. */
function derive<E, R>(records: () => Stream.Stream<unknown, E, R>) {
  return derivePreparedRecords({ records, releaseId }).pipe(Stream.runCollect);
}

/** Moves one complete record while preserving every bound identity. */
function relocateRecord(
  contentKey: string,
  publicPath: string
): PreparedContentUpsert {
  const nextKey = ContentKeySchema.make(contentKey);
  const nextPath = PublicPathSchema.make(publicPath);
  const parentPath = PublicPathSchema.make(
    publicPath.slice(0, publicPath.lastIndexOf("/"))
  );
  const nextPayload = { ...payload, contentKey: nextKey };
  return {
    change: ContentUpsertSchema.make({
      ...baseRecord.change,
      artifactHash: hashCompiledContentPayload(nextPayload),
      contentKey: nextKey,
      publicPath: nextPath,
    }),
    payload: nextPayload,
    projection: {
      ...projection,
      contentKey: nextKey,
      parentPath,
      publicPath: nextPath,
    },
    source: { ...source, contentKey: nextKey },
  };
}

const mismatchCases = [
  [
    "artifactHash",
    (value: PreparedContentUpsert) => ({
      ...value,
      change: {
        ...value.change,
        artifactHash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
      },
    }),
  ],
  [
    "contentKey",
    (value: PreparedContentUpsert) => ({
      ...value,
      source: {
        ...value.source,
        contentKey: ContentKeySchema.make("test:wrong"),
      },
    }),
  ],
  [
    "locale",
    (value: PreparedContentUpsert) => ({
      ...value,
      source: { ...value.source, locale: "id" },
    }),
  ],
  [
    "rendererDomain",
    (value: PreparedContentUpsert) => ({
      ...value,
      source: { ...value.source, rendererDomain: "material-chemistry" },
    }),
  ],
  [
    "sourcePath",
    (value: PreparedContentUpsert) => ({
      ...value,
      source: {
        ...value.source,
        sourcePath: CorpusSourcePathSchema.make(
          "packages/corpus/test/stream/wrong/en.mdx"
        ),
      },
    }),
  ],
  [
    "rawMdx",
    (value: PreparedContentUpsert) => ({
      ...value,
      source: { ...value.source, rawMdx: "test mismatch" },
    }),
  ],
  [
    "publicPath",
    (value: PreparedContentUpsert) => ({
      ...value,
      projection: {
        ...value.projection,
        publicPath: PublicPathSchema.make("subjects/test/material/wrong"),
      },
    }),
  ],
] satisfies readonly (readonly [
  string,
  (record: PreparedContentUpsert) => unknown,
])[];

describe("derivePreparedRecords", () => {
  it.each(mismatchCases)("rejects %s incoherence", async (field, mutate) => {
    const error = await Effect.runPromise(
      derive(() => Stream.make(mutate(baseRecord))).pipe(Effect.flip)
    );
    expect(error).toMatchObject({
      _tag: "PreparedContentCoherenceError",
      field,
    });
  });

  it("rejects a source-hash mismatch", async () => {
    const badPayload = {
      ...payload,
      sourceHash: Sha256HashSchema.make(`sha256:${"e".repeat(64)}`),
    };
    const error = await Effect.runPromise(
      derive(() =>
        Stream.make({
          ...baseRecord,
          change: {
            ...baseRecord.change,
            artifactHash: hashCompiledContentPayload(badPayload),
          },
          payload: badPayload,
        })
      ).pipe(Effect.flip)
    );
    expect(error).toMatchObject({ _tag: "ArtifactSourceHashMismatchError" });
  });

  it("rejects malformed, out-of-order, and route-colliding records", async () => {
    const first = relocateRecord("test:stream:a", "subjects/test/shared");
    const second = relocateRecord("test:stream:b", "subjects/test/shared");
    const malformed = await Effect.runPromise(
      derive(() => Stream.make({ change: {} })).pipe(Effect.flip)
    );
    const order = await Effect.runPromise(
      derive(() => Stream.make(second, first)).pipe(Effect.flip)
    );
    const route = await Effect.runPromise(
      derive(() => Stream.make(first, second)).pipe(Effect.flip)
    );
    expect(malformed).toMatchObject({ _tag: "PreparedContentDecodeError" });
    expect(order).toMatchObject({ _tag: "PreparedContentOrderError" });
    expect(route).toMatchObject({ _tag: "PreparedContentRouteError" });
  });

  it("maps replay throws and preserves source stream failures", async () => {
    /** Reproduces a replay factory that fails before producing its stream. */
    const throwingRecords: () => Stream.Stream<unknown> = () => {
      throw new Error("test replay failure");
    };
    const replay = await Effect.runPromise(
      derive(throwingRecords).pipe(Effect.flip)
    );
    const sourceFailure = await Effect.runPromise(
      derive(() => Stream.fail("test-source-failure")).pipe(Effect.flip)
    );
    expect(replay).toMatchObject({ _tag: "PreparedContentReplayError" });
    expect(sourceFailure).toBe("test-source-failure");
  });
});
