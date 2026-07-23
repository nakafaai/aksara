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
import { MaterialLessonProjectionSchema } from "@nakafa/aksara-contracts/projection/material";
import {
  RollbackDeleteStateSchema,
  type RollbackPageRequest,
  RollbackPageSchema,
  type RollbackRecord,
  RollbackRecordSchema,
  RollbackUpsertStateSchema,
} from "@nakafa/aksara-contracts/release/rollback";
import { Effect, Schema, Stream } from "effect";
import { describe, expect, it, vi } from "vitest";
import { PublicationTarget } from "#publisher/publication/spec";
import {
  MAX_ROLLBACK_PAGE_BYTES,
  streamRollbackRecords,
} from "#publisher/rollback/stream";
import { PublicationTargetTransportError } from "#publisher/target/errors";
import { makePublicationTarget } from "#test/target";

const rollbackOf = ReleaseIdSchema.make("test-rollback-source");
const rollbackOfManifestHash = Sha256HashSchema.make(
  `sha256:${"d".repeat(64)}`
);

/** Creates one body-free protocol record at an exact source index. */
function deletion(index: number) {
  const state = RollbackDeleteStateSchema.make({
    change: {
      contentKey: ContentKeySchema.make(`test:rollback-delete-${index}`),
      locale: "en",
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
  const compiledCode = "x".repeat(MAX_ROLLBACK_PAGE_BYTES);
  const artifactHash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
  const payload = Schema.decodeUnknownSync(CompiledContentPayloadSchema)({
    byteLength: Buffer.byteLength(compiledCode, "utf8"),
    compiledCode,
    compilerConfigHash: `sha256:${"b".repeat(64)}`,
    compilerVersion: "0.1.0",
    contentKey: "test:rollback-large",
    format: "mdx-function-body-v1",
    locale: "en",
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
  const projection = Schema.decodeUnknownSync(MaterialLessonProjectionSchema)({
    contentKey: payload.contentKey,
    kind: "subject-lesson",
    locale: payload.locale,
    materialKey: "test.rollback",
    metadata: { authors: [], date: "2026-01-01", title: "Test protocol" },
    order: 1,
    parentPath: "subjects/test/rollback",
    publicPath: "subjects/test/rollback/large",
    sectionKey: "test-large",
    sitemap: true,
  });
  const state = RollbackUpsertStateSchema.make({
    artifact,
    change: {
      artifactHash,
      contentKey: payload.contentKey,
      delivery: "public",
      locale: payload.locale,
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

/** Builds the complete target service around one rollback page loader. */
function targetWith(
  rollbackPage: (
    request: RollbackPageRequest
  ) => ReturnType<(typeof PublicationTarget.Service)["rollbackPage"]>
) {
  return makePublicationTarget({ rollbackPage });
}

/** Collects one complete rollback replay with the supplied target. */
function collect(target: typeof PublicationTarget.Service, expectedTotal = 3) {
  return Effect.runPromise(
    streamRollbackRecords(
      rollbackOf,
      rollbackOfManifestHash,
      expectedTotal
    ).pipe(Stream.runCollect, Effect.provideService(PublicationTarget, target))
  );
}

/** Returns the typed failure from one complete rollback replay. */
function reject(target: typeof PublicationTarget.Service, expectedTotal = 3) {
  return Effect.runPromise(
    streamRollbackRecords(
      rollbackOf,
      rollbackOfManifestHash,
      expectedTotal
    ).pipe(
      Stream.runCollect,
      Effect.provideService(PublicationTarget, target),
      Effect.flip
    )
  );
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
    const records = await collect(targetWith(rollbackPage));

    expect([...records].map(({ index }) => index)).toEqual([0, 1, 2]);
    expect(
      rollbackPage.mock.calls.map(([request]) => request.afterIndex)
    ).toEqual([-1, 0, 1]);
    expect(rollbackPage.mock.calls[0]?.[0]).toEqual({
      afterIndex: -1,
      limit: 8,
      rollbackOf,
      rollbackOfManifestHash,
    });
  });

  it("accepts the one canonical empty final page", async () => {
    const records = await collect(
      targetWith(() =>
        Effect.succeed(
          page({ done: true, nextIndex: -1, records: [], total: 0 })
        )
      ),
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
    ],
    [
      "cursor",
      () =>
        page({ done: true, nextIndex: 1, records: [deletion(1)], total: 2 }),
      "RollbackPageCursorError",
    ],
    ["bytes", oversizedPage, "RollbackPageByteLimitError"],
  ])("rejects an invalid %s page", async (_label, source, expectedTag) => {
    let expectedTotal = 0;
    if (expectedTag === "RollbackPageByteLimitError") {
      expectedTotal = 1;
    }
    if (expectedTag === "RollbackPageCursorError") {
      expectedTotal = 2;
    }
    const error = await reject(
      targetWith(() => Effect.succeed(source())),
      expectedTotal
    );
    expect(error._tag).toBe(expectedTag);
  });

  it("rejects a total that changes after cursor progress", async () => {
    const target = targetWith((request) =>
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
      )
    );
    const error = await reject(target);
    expect(error._tag).toBe("RollbackPageTotalError");
  });

  it("preserves typed target transport failures", async () => {
    const transport = new PublicationTargetTransportError({
      detail: { reason: "network" },
      stage: "rollback",
    });
    const error = await reject(targetWith(() => Effect.fail(transport)));
    expect(error).toEqual(transport);
  });
});
