import { describe, expect, it } from "@effect/vitest";
import { compileContent } from "@nakafa/aksara-compiler/compile";
import { hashCompiledContentPayload } from "@nakafa/aksara-contracts/artifact/integrity";
import { CompileDocumentSourceSchema } from "@nakafa/aksara-contracts/content";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  PublicPathSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  AppLocaleSchema,
  ArtifactLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import {
  MaterialKeySchema,
  MaterialLessonProjectionSchema,
  MaterialSectionSchema,
} from "@nakafa/aksara-contracts/projection/material";
import { ContentUpsertSchema } from "@nakafa/aksara-contracts/release";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect, Stream } from "effect";
import type { PreparedContentUpsert } from "#publisher/preparation/spec";
import { derivePreparedRecords } from "#publisher/preparation/stream";
import { materialGraph } from "#test/graph";
import { testRendererDomains } from "#test/renderer";

const source = CompileDocumentSourceSchema.make({
  artifactLocale: ArtifactLocaleSchema.make("en"),
  contentKey: ContentKeySchema.make("test:stream:a"),
  rawMdx: "export const metadata = {}\n\nTest protocol.",
  rendererDomain: "mathematics",
  sourcePath: CorpusSourcePathSchema.make("packages/corpus/test/a/en.mdx"),
});
const projection = MaterialLessonProjectionSchema.make({
  appLocale: AppLocaleSchema.make("en"),
  artifactLocale: source.artifactLocale,
  contentKey: source.contentKey,
  graph: materialGraph(AppLocaleSchema.make("en"), "material", "test-a"),
  kind: "subject-lesson",
  materialKey: MaterialKeySchema.make("lesson.test.material"),
  metadata: {
    authors: [],
    datePublished: "2026-01-01",
    title: "Test protocol",
  },
  order: 1,
  parentPath: PublicPathSchema.make("subjects/test/material"),
  publicPath: PublicPathSchema.make("subjects/test/material/a"),
  sectionKey: MaterialSectionSchema.make("test-a"),
  sitemap: true,
  topicTitle: "Test Material",
});
const releaseId = ReleaseIdSchema.make("test-stream-release");

/** Compiles the valid baseline record inside the native test runtime. */
const makeFixture = Effect.fn("PublisherTest.makePreparedRecord")(function* () {
  const rendererManifest = yield* createRendererManifest({
    base: {
      authoringComponents: [{ name: "BlockMath", version: 1 }],
      supportedComponents: [{ name: "BlockMath", version: 1 }],
    },
    domains: testRendererDomains({
      chemistry: [{ name: "AtomShellLab", version: 1 }],
      mathematics: [{ name: "FunctionMachine", version: 1 }],
    }),
    publishedDomains: ["mathematics"],
  });
  const { payload } = yield* compileContent({ ...source, rendererManifest });
  const baseRecord: PreparedContentUpsert = {
    change: ContentUpsertSchema.make({
      artifactHash: hashCompiledContentPayload(payload),
      artifactLocale: source.artifactLocale,
      contentKey: source.contentKey,
      delivery: "public",
      family: "material",
      operation: "upsert",
      rendererDomain: source.rendererDomain,
      sourcePath: source.sourcePath,
    }),
    payload,
    projection,
    source,
  };
  return { baseRecord, payload };
});

/** Projects one upsert identity into its explicit prior absence proof. */
function absentHead(identity: PreparedContentUpsert["change"]) {
  return {
    artifactLocale: identity.artifactLocale,
    contentKey: identity.contentKey,
    family: identity.family,
    state: "absent" as const,
  };
}

/** Pairs one candidate record with an explicit prior absence proof. */
function transition(
  record: unknown,
  identity: PreparedContentUpsert["change"]
) {
  return {
    prior: absentHead(identity),
    record,
  };
}

/** Runs one replayable source through the canonical derived stream. */
function derive<E, R>(records: Stream.Stream<unknown, E, R>) {
  return derivePreparedRecords({ records, releaseId }).pipe(Stream.runCollect);
}

/** Moves one complete record while preserving every bound identity. */
function relocateRecord(
  fixture: Effect.Success<ReturnType<typeof makeFixture>>,
  contentKey: string,
  publicPath: string
) {
  const { baseRecord, payload } = fixture;
  const nextKey = ContentKeySchema.make(contentKey);
  const parentPath = PublicPathSchema.make(
    publicPath.slice(0, publicPath.lastIndexOf("/"))
  );
  const nextPayload = { ...payload, contentKey: nextKey };
  return {
    change: ContentUpsertSchema.make({
      ...baseRecord.change,
      artifactHash: hashCompiledContentPayload(nextPayload),
      contentKey: nextKey,
    }),
    payload: nextPayload,
    projection: {
      ...projection,
      contentKey: nextKey,
      parentPath,
      publicPath: PublicPathSchema.make(publicPath),
    },
    source: { ...source, contentKey: nextKey },
  };
}

/** Replaces one source field while preserving the complete prepared record. */
function modifySource(
  value: PreparedContentUpsert,
  changed: Partial<PreparedContentUpsert["source"]>
) {
  return { ...value, source: { ...value.source, ...changed } };
}

const mismatchCases = {
  artifactHash: (value: PreparedContentUpsert) => ({
    ...value,
    change: {
      ...value.change,
      artifactHash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
    },
  }),
  artifactLocale: (value: PreparedContentUpsert) =>
    modifySource(value, { artifactLocale: ArtifactLocaleSchema.make("id") }),
  contentKey: (value: PreparedContentUpsert) =>
    modifySource(value, { contentKey: ContentKeySchema.make("test:wrong") }),
  family: (value: PreparedContentUpsert) => ({
    ...value,
    change: { ...value.change, family: "article" },
  }),
  rawMdx: (value: PreparedContentUpsert) =>
    modifySource(value, { rawMdx: "test mismatch" }),
  rendererDomain: (value: PreparedContentUpsert) =>
    modifySource(value, { rendererDomain: "chemistry" }),
  sourcePath: (value: PreparedContentUpsert) =>
    modifySource(value, {
      sourcePath: CorpusSourcePathSchema.make(
        "packages/corpus/test/stream/wrong/en.mdx"
      ),
    }),
} satisfies Readonly<
  Record<string, (record: PreparedContentUpsert) => PreparedContentUpsert>
>;

describe("derivePreparedRecords", () => {
  it.effect.each(Object.entries(mismatchCases))(
    "rejects %s incoherence",
    ([field, mutate]) =>
      Effect.gen(function* () {
        const { baseRecord } = yield* makeFixture();
        const candidate = mutate(baseRecord);
        const error = yield* derive(
          Stream.make(transition(candidate, candidate.change))
        ).pipe(Effect.flip);
        expect(error).toMatchObject({
          _tag: "PreparedContentCoherenceError",
          field,
        });
      })
  );

  it.effect("rejects a source-hash mismatch", () =>
    Effect.gen(function* () {
      const { baseRecord, payload } = yield* makeFixture();
      const badPayload = {
        ...payload,
        sourceHash: Sha256HashSchema.make(`sha256:${"e".repeat(64)}`),
      };
      const candidate = {
        ...baseRecord,
        change: {
          ...baseRecord.change,
          artifactHash: hashCompiledContentPayload(badPayload),
        },
        payload: badPayload,
      };
      const error = yield* derive(
        Stream.make(transition(candidate, baseRecord.change))
      ).pipe(Effect.flip);
      expect(error).toMatchObject({ _tag: "ArtifactSourceHashMismatchError" });
    })
  );

  it.effect("rejects malformed and out-of-order records", () =>
    Effect.gen(function* () {
      const fixture = yield* makeFixture();
      const first = relocateRecord(
        fixture,
        "test:stream:a",
        "subjects/test/shared"
      );
      const second = relocateRecord(
        fixture,
        "test:stream:b",
        "subjects/test/shared"
      );
      const malformed = yield* derive(
        Stream.make(transition({ change: {} }, fixture.baseRecord.change))
      ).pipe(Effect.flip);
      const order = yield* derive(
        Stream.make(
          transition(second, second.change),
          transition(first, first.change)
        )
      ).pipe(Effect.flip);
      expect(malformed).toMatchObject({ _tag: "PreparedContentDecodeError" });
      expect(order).toMatchObject({ _tag: "PreparedContentOrderError" });
    })
  );

  it.effect("rejects contradictory prior-state proofs", () =>
    Effect.gen(function* () {
      const { baseRecord } = yield* makeFixture();
      const records = [
        {
          prior: {
            ...absentHead(baseRecord.change),
            contentKey: ContentKeySchema.make("test:another-head"),
          },
          record: baseRecord,
        },
        {
          prior: { ...absentHead(baseRecord.change), family: "article" },
          record: baseRecord,
        },
        {
          prior: absentHead(baseRecord.change),
          record: {
            change: {
              artifactLocale: baseRecord.change.artifactLocale,
              contentKey: baseRecord.change.contentKey,
              family: "material",
              operation: "delete",
            },
          },
        },
      ];
      const errors = yield* Effect.forEach(records, (record) =>
        derive(Stream.make(record)).pipe(Effect.flip)
      );
      expect(errors).toMatchObject(
        records.map(() => ({
          _tag: "PreparedContentCoherenceError",
          field: "priorState",
        }))
      );
    })
  );

  it.effect("preserves source stream failures", () =>
    Effect.gen(function* () {
      const failure = yield* derive(Stream.fail("test-source-failure")).pipe(
        Effect.flip
      );
      expect(failure).toBe("test-source-failure");
    })
  );
});
