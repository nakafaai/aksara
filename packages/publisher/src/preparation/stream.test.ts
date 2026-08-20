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
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Stream } from "effect";
import type { PreparedContentUpsert } from "#publisher/preparation/spec";
import { derivePreparedRecords } from "#publisher/preparation/stream";
import { materialGraph } from "#test/graph";
import { testRendererDomains } from "#test/renderer";

const rendererManifest = await Effect.runPromise(
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
const source = CompileDocumentSourceSchema.make({
  artifactLocale: ArtifactLocaleSchema.make("en"),
  contentKey: ContentKeySchema.make("test:stream:a"),
  rawMdx: "export const metadata = {}\n\nTest protocol.",
  rendererDomain: "mathematics",
  sourcePath: CorpusSourcePathSchema.make("packages/corpus/test/a/en.mdx"),
});
const { payload } = await Effect.runPromise(
  compileContent({ ...source, rendererManifest })
);
const projection = MaterialLessonProjectionSchema.make({
  appLocale: AppLocaleSchema.make("en"),
  artifactLocale: source.artifactLocale,
  contentKey: source.contentKey,
  graph: materialGraph(AppLocaleSchema.make("en"), "material", "test-a"),
  kind: "subject-lesson",
  materialKey: MaterialKeySchema.make("lesson.test.material"),
  metadata: { authors: [], date: "2026-01-01", title: "Test protocol" },
  order: 1,
  parentPath: PublicPathSchema.make("subjects/test/material"),
  publicPath: PublicPathSchema.make("subjects/test/material/a"),
  sectionKey: MaterialSectionSchema.make("test-a"),
  sitemap: true,
  topicTitle: "Test Material",
});
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
const releaseId = ReleaseIdSchema.make("test-stream-release");

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
function transition(record: unknown, identity = baseRecord.change) {
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
function relocateRecord(contentKey: string, publicPath: string) {
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
    "family",
    (value: PreparedContentUpsert) => ({
      ...value,
      change: { ...value.change, family: "article" },
    }),
  ],
  [
    "artifactLocale",
    (value: PreparedContentUpsert) => ({
      ...value,
      source: {
        ...value.source,
        artifactLocale: ArtifactLocaleSchema.make("id"),
      },
    }),
  ],
  [
    "rendererDomain",
    (value: PreparedContentUpsert) => ({
      ...value,
      source: { ...value.source, rendererDomain: "chemistry" },
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
] satisfies readonly (readonly [
  string,
  (record: PreparedContentUpsert) => PreparedContentUpsert,
])[];
describe("derivePreparedRecords", () => {
  it.each(mismatchCases)("rejects %s incoherence", async (field, mutate) => {
    const candidate = mutate(baseRecord);
    const error = await Effect.runPromise(
      derive(Stream.make(transition(candidate, candidate.change))).pipe(
        Effect.flip
      )
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
      derive(
        Stream.make(
          transition({
            ...baseRecord,
            change: {
              ...baseRecord.change,
              artifactHash: hashCompiledContentPayload(badPayload),
            },
            payload: badPayload,
          })
        )
      ).pipe(Effect.flip)
    );
    expect(error).toMatchObject({ _tag: "ArtifactSourceHashMismatchError" });
  });

  it("rejects malformed and out-of-order records", async () => {
    const first = relocateRecord("test:stream:a", "subjects/test/shared");
    const second = relocateRecord("test:stream:b", "subjects/test/shared");
    const malformed = await Effect.runPromise(
      derive(Stream.make(transition({ change: {} }))).pipe(Effect.flip)
    );
    const order = await Effect.runPromise(
      derive(
        Stream.make(
          transition(second, second.change),
          transition(first, first.change)
        )
      ).pipe(Effect.flip)
    );
    expect(malformed).toMatchObject({ _tag: "PreparedContentDecodeError" });
    expect(order).toMatchObject({ _tag: "PreparedContentOrderError" });
  });

  it.each([
    {
      prior: {
        ...absentHead(baseRecord.change),
        contentKey: ContentKeySchema.make("test:another-head"),
      },
      record: baseRecord,
    },
    {
      prior: {
        ...absentHead(baseRecord.change),
        family: "article",
      },
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
  ])("rejects a contradictory prior-state proof", async (record) => {
    const error = await Effect.runPromise(
      derive(Stream.make(record)).pipe(Effect.flip)
    );
    expect(error).toMatchObject({
      _tag: "PreparedContentCoherenceError",
      field: "priorState",
    });
  });

  it("preserves source stream failures", async () => {
    const sourceFailure = await Effect.runPromise(
      derive(Stream.fail("test-source-failure")).pipe(Effect.flip)
    );
    expect(sourceFailure).toBe("test-source-failure");
  });
});
