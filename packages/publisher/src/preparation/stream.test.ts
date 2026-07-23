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
  MaterialKeySchema,
  MaterialLessonProjectionSchema,
  MaterialSectionSchema,
} from "@nakafa/aksara-contracts/projection/material";
import { ContentUpsertSchema } from "@nakafa/aksara-contracts/release";
import { rendererDomains } from "@nakafa/aksara-contracts/renderer/contract";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect, Stream } from "effect";
import { describe, expect, it } from "vitest";
import type { PreparedContentUpsert } from "#publisher/preparation/spec";
import { derivePreparedRecords } from "#publisher/preparation/stream";

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
  contentKey: ContentKeySchema.make("test:stream:a"),
  locale: "en",
  rawMdx: "export const metadata = {}\n\nTest protocol.",
  rendererDomain: "mathematics",
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
    rendererDomain: source.rendererDomain,
    sourcePath: source.sourcePath,
  }),
  payload,
  projection,
  source,
};
const releaseId = ReleaseIdSchema.make("test-stream-release");

/** Pairs one candidate record with an explicit prior absence proof. */
function transition(
  record: unknown,
  identity: PreparedContentUpsert["change"] = baseRecord.change
) {
  return {
    prior: {
      contentKey: identity.contentKey,
      locale: identity.locale,
      state: "absent",
    },
    record,
  };
}

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
  (record: PreparedContentUpsert) => unknown,
])[];

describe("derivePreparedRecords", () => {
  it.each(mismatchCases)("rejects %s incoherence", async (field, mutate) => {
    const error = await Effect.runPromise(
      derive(() => Stream.make(transition(mutate(baseRecord)))).pipe(
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
      derive(() =>
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
      derive(() => Stream.make(transition({ change: {} }))).pipe(Effect.flip)
    );
    const order = await Effect.runPromise(
      derive(() =>
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
        contentKey: ContentKeySchema.make("test:another-head"),
        locale: baseRecord.change.locale,
        state: "absent",
      },
      record: baseRecord,
    },
    {
      prior: {
        contentKey: baseRecord.change.contentKey,
        locale: baseRecord.change.locale,
        state: "absent",
      },
      record: {
        change: {
          contentKey: baseRecord.change.contentKey,
          locale: baseRecord.change.locale,
          operation: "delete",
        },
      },
    },
  ])("rejects a contradictory prior-state proof", async (record) => {
    const error = await Effect.runPromise(
      derive(() => Stream.make(record)).pipe(Effect.flip)
    );
    expect(error).toMatchObject({
      _tag: "PreparedContentCoherenceError",
      field: "priorState",
    });
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
