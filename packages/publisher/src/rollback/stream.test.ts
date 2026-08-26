import { Buffer } from "node:buffer";
import { describe, expect, it, vi } from "@effect/vitest";
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
import { Effect, Schema, Stream } from "effect";
import { PublicationTarget } from "#publisher/publication/spec";
import { streamRollbackRecords } from "#publisher/rollback/stream";
import { PublicationTargetTransportError } from "#publisher/target/errors";
import { materialGraph } from "#test/graph";
import { makePublicationTarget } from "#test/target";

const datePublished = "2026-01-01";
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

/** Creates one page containing one deletion at its matching cursor. */
function deletionPage(index: number, total: number, done = false) {
  return page({ done, nextIndex: index, records: [deletion(index)], total });
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
    metadata: { authors: [], datePublished, title: "Test protocol" },
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

describe("streamRollbackRecords", () => {
  it.effect("replays three bounded pages through exact index cursors", () => {
    const rollbackPage = vi.fn((request: RollbackPageRequest) => {
      if (request.afterIndex === -1) {
        return Effect.succeed(deletionPage(0, 3));
      }
      if (request.afterIndex === 0) {
        return Effect.succeed(deletionPage(1, 3));
      }
      return Effect.succeed(deletionPage(2, 3, true));
    });
    return replay(makePublicationTarget({ rollbackPage })).pipe(
      Effect.map((records) => {
        expect([...records].map(({ index }) => index)).toEqual([0, 1, 2]);
        expect(
          rollbackPage.mock.calls.map(([request]) => request.afterIndex)
        ).toEqual([-1, 0, 1]);
        return expect(rollbackPage.mock.calls[0]?.[0]).toEqual({
          afterIndex: -1,
          limit: MAX_ROLLBACK_PAGE_RECORDS,
          rollbackOf,
          rollbackOfManifestHash,
        });
      })
    );
  });

  it.effect("replays a source larger than one operational page", () => {
    const recordCount = MAX_ROLLBACK_PAGE_RECORDS + 1;
    const records = Array.from({ length: recordCount }, (_, index) =>
      deletion(index)
    );
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
    return replay(makePublicationTarget({ rollbackPage }), recordCount).pipe(
      Effect.map((replayed) => {
        expect([...replayed]).toHaveLength(recordCount);
        return expect(rollbackPage).toHaveBeenCalledTimes(2);
      })
    );
  });

  it.effect("accepts the one canonical empty final page", () =>
    replay(
      makePublicationTarget({
        rollbackPage: () =>
          Effect.succeed(
            page({ done: true, nextIndex: -1, records: [], total: 0 })
          ),
      }),
      0
    ).pipe(Effect.map((records) => expect([...records]).toEqual([])))
  );

  it.effect.each([
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
    ["cursor", () => deletionPage(1, 2, true), "RollbackPageCursorError", 2],
    ["bytes", oversizedPage, "RollbackPageByteLimitError", 1],
  ] as const)(
    "rejects an invalid %s page",
    ([_label, source, expectedTag, expectedTotal]) =>
      replay(
        makePublicationTarget({ rollbackPage: () => Effect.succeed(source()) }),
        expectedTotal
      ).pipe(
        Effect.flip,
        Effect.map((error) => expect(error._tag).toBe(expectedTag))
      )
  );

  it.effect("rejects a total that changes after cursor progress", () => {
    const target = makePublicationTarget({
      rollbackPage: (request) =>
        Effect.succeed(
          request.afterIndex === -1 ? deletionPage(0, 3) : deletionPage(1, 4)
        ),
    });
    return replay(target).pipe(
      Effect.flip,
      Effect.map((error) => expect(error._tag).toBe("RollbackPageTotalError"))
    );
  });

  it.effect("preserves typed target transport failures", () => {
    const transport = new PublicationTargetTransportError({
      detail: { reason: "network" },
      stage: "rollback",
    });
    return replay(
      makePublicationTarget({ rollbackPage: () => Effect.fail(transport) })
    ).pipe(
      Effect.flip,
      Effect.map((error) => expect(error).toEqual(transport))
    );
  });
});
