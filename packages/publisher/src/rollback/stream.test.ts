import { Buffer } from "node:buffer";
import {
  CompiledContentPayloadSchema,
  SignedContentArtifactSchema,
} from "@nakafa/aksara-contracts/content";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  Ed25519SignatureSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  AppLocaleSchema,
  ArtifactLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { MaterialLessonProjectionSchema } from "@nakafa/aksara-contracts/projection/material";
import {
  MAX_ROLLBACK_PAGE_BYTES,
  MAX_ROLLBACK_PAGE_RECORDS,
  RollbackDeleteStateSchema,
  type RollbackPageRequest,
  RollbackPageSchema,
  type RollbackRecord,
  RollbackRecordSchema,
  RollbackUpsertStateSchema,
} from "@nakafa/aksara-contracts/release/rollback/spec";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Schema, Stream } from "effect";
import { vi } from "vitest";
import { PublicationTarget } from "#publisher/publication/spec";
import { streamRollbackRecords } from "#publisher/rollback/stream";
import { PublicationTargetTransportError } from "#publisher/target/errors";
import { materialGraph } from "#test/graph";
import { makePublicationTarget } from "#test/target";

const rollbackOf = ReleaseIdSchema.make("test-rollback-source");
const rollbackOfManifestHash = Sha256HashSchema.make(
  `sha256:${"d".repeat(64)}`
);

/** Creates one body-free protocol record at an exact source index. */
function deletion(index: number) {
  const state = RollbackDeleteStateSchema.make({
    change: {
      artifactLocale: ArtifactLocaleSchema.make("en"),
      contentKey: ContentKeySchema.make(`test:rollback-delete-${index}`),
      family: "material",
      operation: "delete",
    },
  });
  return RollbackRecordSchema.make({ current: state, index, prior: state });
}

/** Creates one internally coherent page for cursor validation tests. */
function page(input: {
  readonly done: boolean;
  readonly nextIndex: number;
  readonly records: readonly RollbackRecord[];
  readonly rollbackOfManifestHash?: typeof rollbackOfManifestHash;
  readonly rollbackOf?: typeof rollbackOf;
  readonly total: number;
}) {
  return RollbackPageSchema.make({
    ...input,
    rollbackOf: input.rollbackOf ?? rollbackOf,
    rollbackOfManifestHash:
      input.rollbackOfManifestHash ?? rollbackOfManifestHash,
  });
}

/** Creates one schema-valid page whose canonical wire exceeds four MiB. */
function oversizedPage() {
  const appLocale = AppLocaleSchema.make("en");
  const compiledCode = "x".repeat(MAX_ROLLBACK_PAGE_BYTES);
  const artifactHash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
  const payload = Schema.decodeSync(CompiledContentPayloadSchema)({
    artifactLocale: "en",
    byteLength: Buffer.byteLength(compiledCode, "utf8"),
    compiledCode,
    compilerConfigHash: `sha256:${"b".repeat(64)}`,
    compilerVersion: "0.1.0",
    contentKey: "test:rollback-large",
    format: "mdx-function-body",
    mdxCompilerVersion: "3.1.1",
    plainText: "Test protocol",
    rawMdx: "## Test protocol",
    rendererDomain: "mathematics",
    requiredComponents: [],
    sourceHash: `sha256:${"c".repeat(64)}`,
  });
  const artifact = SignedContentArtifactSchema.make({
    artifactHash,
    keyId: SigningKeyIdSchema.make("test-rollback-key"),
    payload,
    signature: Ed25519SignatureSchema.make("A".repeat(86)),
  });
  const projection = Schema.decodeSync(MaterialLessonProjectionSchema)({
    appLocale,
    artifactLocale: payload.artifactLocale,
    contentKey: payload.contentKey,
    graph: materialGraph(appLocale, "rollback", "test-large"),
    kind: "subject-lesson",
    materialKey: "lesson.test.rollback",
    metadata: { authors: [], date: "2026-01-01", title: "Test protocol" },
    order: 1,
    parentPath: "subjects/test/rollback",
    publicPath: "subjects/test/rollback/large",
    sectionKey: "test-large",
    sitemap: true,
    topicTitle: "Test Rollback Topic",
  });
  const state = RollbackUpsertStateSchema.make({
    artifact,
    change: {
      artifactHash,
      artifactLocale: payload.artifactLocale,
      contentKey: payload.contentKey,
      delivery: "public",
      family: "material",
      operation: "upsert",
      rendererDomain: payload.rendererDomain,
      sourcePath: CorpusSourcePathSchema.make(
        "packages/corpus/test/rollback/large.mdx"
      ),
    },
    projection,
  });
  const record = RollbackRecordSchema.make({
    current: state,
    index: 0,
    prior: state,
  });
  return page({ done: true, nextIndex: 0, records: [record], total: 1 });
}

/** Builds one complete rollback replay with the supplied target. */
function replay(target: typeof PublicationTarget.Service, expectedTotal = 3) {
  return streamRollbackRecords(
    rollbackOf,
    rollbackOfManifestHash,
    expectedTotal
  ).pipe(Stream.runCollect, Effect.provideService(PublicationTarget, target));
}

/** Collects one complete rollback replay. */
function collect(target: typeof PublicationTarget.Service, expectedTotal = 3) {
  return Effect.runPromise(replay(target, expectedTotal));
}

/** Returns the typed failure from one complete rollback replay. */
function reject(target: typeof PublicationTarget.Service, expectedTotal = 3) {
  return Effect.runPromise(replay(target, expectedTotal).pipe(Effect.flip));
}

describe("streamRollbackRecords", () => {
  it("replays three bounded pages through exact index cursors", async () => {
    const rollbackPage = vi.fn((request: RollbackPageRequest) => {
      if (request.afterIndex === -1) {
        return Effect.succeed(
          page({ done: false, nextIndex: 0, records: [deletion(0)], total: 3 })
        );
      }
      if (request.afterIndex === 0) {
        return Effect.succeed(
          page({ done: false, nextIndex: 1, records: [deletion(1)], total: 3 })
        );
      }
      return Effect.succeed(
        page({ done: true, nextIndex: 2, records: [deletion(2)], total: 3 })
      );
    });
    const records = await collect(makePublicationTarget({ rollbackPage }));

    expect([...records].map(({ index }) => index)).toEqual([0, 1, 2]);
    expect(
      rollbackPage.mock.calls.map(([request]) => request.afterIndex)
    ).toEqual([-1, 0, 1]);
    expect(rollbackPage.mock.calls[0]?.[0]).toEqual({
      afterIndex: -1,
      limit: MAX_ROLLBACK_PAGE_RECORDS,
      rollbackOf,
      rollbackOfManifestHash,
    });
  });

  it("replays a source larger than one operational page", async () => {
    const recordCount = MAX_ROLLBACK_PAGE_RECORDS + 1;
    const records = Array.from({ length: recordCount }, (_, i) => deletion(i));
    const rollbackPage = vi.fn((request: RollbackPageRequest) => {
      const start = request.afterIndex + 1;
      const selected = records.slice(start, start + request.limit);
      const nextIndex = selected.at(-1)?.index ?? request.afterIndex;
      return Effect.succeed(
        page({
          done: nextIndex === records.length - 1,
          nextIndex,
          records: selected,
          total: records.length,
        })
      );
    });
    const replayed = await collect(
      makePublicationTarget({ rollbackPage }),
      recordCount
    );
    expect([...replayed]).toHaveLength(recordCount);
    expect(rollbackPage).toHaveBeenCalledTimes(2);
  });

  it("accepts the one canonical empty final page", async () => {
    const records = await collect(
      makePublicationTarget({
        rollbackPage: () =>
          Effect.succeed(
            page({ done: true, nextIndex: -1, records: [], total: 0 })
          ),
      }),
      0
    );
    expect([...records]).toEqual([]);
  });

  it.each([
    [
      "decode",
      () => ({
        done: true,
        extra: true,
        nextIndex: -1,
        records: [],
        rollbackOf,
        rollbackOfManifestHash,
        total: 0,
      }),
      "RollbackPageDecodeError",
      0,
    ],
    [
      "identity",
      () =>
        page({
          done: true,
          nextIndex: -1,
          records: [],
          rollbackOf: ReleaseIdSchema.make("test-other-release"),
          total: 0,
        }),
      "RollbackPageIdentityError",
      0,
    ],
    [
      "cursor",
      () =>
        page({ done: true, nextIndex: 1, records: [deletion(1)], total: 2 }),
      "RollbackPageCursorError",
      2,
    ],
    ["bytes", oversizedPage, "RollbackPageByteLimitError", 1],
  ])(
    "rejects an invalid %s page",
    async (_label, source, expectedTag, expectedTotal) => {
      const error = await reject(
        makePublicationTarget({ rollbackPage: () => Effect.succeed(source()) }),
        expectedTotal
      );
      expect(error._tag).toBe(expectedTag);
    }
  );

  it("rejects a total that changes after cursor progress", async () => {
    const target = makePublicationTarget({
      rollbackPage: (request) =>
        Effect.succeed(
          request.afterIndex === -1
            ? page({
                done: false,
                nextIndex: 0,
                records: [deletion(0)],
                total: 3,
              })
            : page({
                done: false,
                nextIndex: 1,
                records: [deletion(1)],
                total: 4,
              })
        ),
    });
    const error = await reject(target);
    expect(error._tag).toBe("RollbackPageTotalError");
  });

  it("preserves typed target transport failures", async () => {
    const transport = new PublicationTargetTransportError({
      detail: { reason: "network" },
      stage: "rollback",
    });
    const error = await reject(
      makePublicationTarget({ rollbackPage: () => Effect.fail(transport) })
    );
    expect(error).toEqual(transport);
  });
});
