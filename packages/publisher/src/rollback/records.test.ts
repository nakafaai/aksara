import { Buffer } from "node:buffer";
import { createHash } from "node:crypto";
import { CompiledContentPayloadSchema } from "@nakafa/aksara-contracts/content";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { MaterialLessonProjectionSchema } from "@nakafa/aksara-contracts/projection/material";
import {
  type RollbackRecord,
  RollbackRecordSchema,
  RollbackUpsertStateSchema,
} from "@nakafa/aksara-contracts/release/rollback";
import { Effect, Schema, Stream } from "effect";
import { describe, expect, it } from "vitest";
import {
  encodeReplayRecord,
  MAX_REPLAY_RECORD_BYTES,
} from "#publisher/replay/record";
import { isDerivedRollbackUpsert } from "#publisher/rollback/records";
import {
  collectRollbackRecords,
  currentRollbackReleaseId,
  incompatibleRollbackArtifact,
  incompatibleRollbackUpsert,
  matchingRollbackDeletion,
  priorRollbackReleaseId,
  rejectRollbackRecords,
  rollbackArtifact,
  rollbackDeletion,
  rollbackDeletionRecord,
  rollbackProjection,
  rollbackRendererManifest,
  rollbackUpsert,
  rollbackUpsertRecord,
  signRollbackPayload,
  tamperRollbackSignature,
} from "#test/rollback-authentication";

describe("deriveRollbackRecords", () => {
  it("authenticates upserts and preserves body-free deletes", async () => {
    const records = await collectRollbackRecords(
      Stream.make(rollbackUpsertRecord, rollbackDeletionRecord)
    );
    const [derivedUpsert, derivedDelete] = records;

    expect(derivedUpsert).toMatchObject({
      current: {
        artifact: rollbackArtifact,
        item: {
          change: rollbackUpsert.change,
          index: 0,
          releaseId: currentRollbackReleaseId,
        },
        kind: "upsert",
        projection: rollbackProjection,
      },
      prior: {
        artifact: rollbackArtifact,
        item: {
          change: rollbackUpsert.change,
          index: 0,
          releaseId: priorRollbackReleaseId,
        },
        kind: "upsert",
        projection: rollbackProjection,
      },
    });
    expect(derivedDelete).toEqual({
      current: {
        item: {
          change: rollbackDeletion.change,
          index: 1,
          releaseId: currentRollbackReleaseId,
        },
        kind: "delete",
      },
      prior: {
        item: {
          change: rollbackDeletion.change,
          index: 1,
          releaseId: priorRollbackReleaseId,
        },
        kind: "delete",
      },
    });
    expect(
      derivedUpsert && isDerivedRollbackUpsert(derivedUpsert.current)
    ).toBe(true);
    expect(
      derivedDelete && isDerivedRollbackUpsert(derivedDelete.current)
    ).toBe(false);
  });

  it("spools a valid rollback transition containing two near-limit bodies", async () => {
    const compiledCode = `/*${"x".repeat(240 * 1024)}*/\nreturn {};`;
    const rawMdx = `{/*${"m".repeat(90 * 1024)}*/}`;
    const largePayload = Schema.decodeUnknownSync(CompiledContentPayloadSchema)(
      {
        ...rollbackArtifact.payload,
        byteLength: Buffer.byteLength(compiledCode, "utf8"),
        compiledCode,
        plainText: "p".repeat(90 * 1024),
        rawMdx,
        sourceHash: `sha256:${createHash("sha256").update(rawMdx).digest("hex")}`,
      }
    );
    const artifact = signRollbackPayload(largePayload);
    const projection = MaterialLessonProjectionSchema.make({
      ...rollbackProjection,
      metadata: {
        ...rollbackProjection.metadata,
        description: "d".repeat(100 * 1024),
      },
    });
    const upsert = RollbackUpsertStateSchema.make({
      artifact,
      change: {
        ...rollbackUpsert.change,
        artifactHash: artifact.artifactHash,
      },
      projection,
    });
    const [derived] = await collectRollbackRecords(
      Stream.make(
        RollbackRecordSchema.make({ current: upsert, index: 0, prior: upsert })
      )
    );
    expect(derived).toBeDefined();
    const encoded = await Effect.runPromise(encodeReplayRecord(derived, 0));

    expect(encoded.bytes).toBeGreaterThan(1024 * 1024);
    expect(encoded.bytes).toBeLessThanOrEqual(MAX_REPLAY_RECORD_BYTES);
  });

  it("rejects a signature that no longer authenticates the old envelope", async () => {
    const tampered = RollbackUpsertStateSchema.make({
      ...rollbackUpsert,
      artifact: {
        ...rollbackArtifact,
        signature: tamperRollbackSignature(rollbackArtifact.signature),
      },
    });
    const error = await rejectRollbackRecords(
      Stream.make(
        RollbackRecordSchema.make({
          current: tampered,
          index: 0,
          prior: rollbackUpsert,
        })
      )
    );
    expect(error._tag).toBe("SignatureInvalidError");
  });

  it("rejects an authenticated artifact paired with another item hash", async () => {
    const mismatched: RollbackRecord = {
      current: {
        artifact: rollbackArtifact,
        change: {
          ...rollbackUpsert.change,
          artifactHash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
        },
        projection: rollbackProjection,
      },
      index: 0,
      prior: rollbackUpsert,
    };
    const error = await rejectRollbackRecords(Stream.make(mismatched));
    expect(error._tag).toBe("ReleaseArtifactMismatchError");
  });

  it("authenticates recovery current state without candidate compatibility", async () => {
    const record = RollbackRecordSchema.make({
      current: incompatibleRollbackUpsert,
      index: 0,
      prior: matchingRollbackDeletion,
    });
    const records = await collectRollbackRecords(Stream.make(record), {
      currentPolicy: { kind: "integrity" },
      priorPolicy: {
        kind: "compatible",
        rendererManifest: rollbackRendererManifest,
      },
    });
    const [derived] = records;

    expect(derived?.current).toMatchObject({
      artifact: incompatibleRollbackArtifact,
      kind: "upsert",
    });
  });

  it("rejects tampered recovery current state under integrity-only verification", async () => {
    const tampered = RollbackUpsertStateSchema.make({
      ...incompatibleRollbackUpsert,
      artifact: {
        ...incompatibleRollbackArtifact,
        signature: tamperRollbackSignature(
          incompatibleRollbackArtifact.signature
        ),
      },
    });
    const error = await rejectRollbackRecords(
      Stream.make(
        RollbackRecordSchema.make({
          current: tampered,
          index: 0,
          prior: matchingRollbackDeletion,
        })
      ),
      {
        currentPolicy: { kind: "integrity" },
        priorPolicy: {
          kind: "compatible",
          rendererManifest: rollbackRendererManifest,
        },
      }
    );

    expect(error._tag).toBe("SignatureInvalidError");
  });

  it("rejects a restored prior artifact incompatible with the candidate", async () => {
    const error = await rejectRollbackRecords(
      Stream.make(
        RollbackRecordSchema.make({
          current: matchingRollbackDeletion,
          index: 0,
          prior: incompatibleRollbackUpsert,
        })
      ),
      {
        currentPolicy: { kind: "integrity" },
        priorPolicy: {
          kind: "compatible",
          rendererManifest: rollbackRendererManifest,
        },
      }
    );

    expect(error._tag).toBe("ArtifactRendererComponentMissingError");
  });

  it("rejects source current state incompatible with its proof renderer", async () => {
    const error = await rejectRollbackRecords(
      Stream.make(
        RollbackRecordSchema.make({
          current: incompatibleRollbackUpsert,
          index: 0,
          prior: matchingRollbackDeletion,
        })
      )
    );

    expect(error._tag).toBe("ArtifactRendererComponentMissingError");
  });
});
