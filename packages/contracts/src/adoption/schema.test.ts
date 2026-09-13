import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema } from "effect";
import {
  ActiveRollbackContentReleaseSchema,
  ContentReleaseCurrentSchema,
  canonicalizeRollbackPage,
  isRollbackUpsert,
  RollbackPageSchema,
  StagedRollbackContentReleaseSchema,
} from "#contracts/adoption/schema";
import {
  decodePublicationRequest,
  decodePublicationResponse,
} from "#contracts/adoption/transport";
import {
  artifact,
  live,
  newHash,
  newManifest,
  newRelease,
  oldArtifact,
  oldRelease,
  oldRenderer,
} from "#contracts/test/adoption";
import {
  recoveryRelease as rollbackRelease,
  projection as unsignedProjection,
} from "#contracts/test/request";
import { receiptFor } from "#contracts/test/response";

describe("retained adoption schema", () => {
  it.effect(
    "retains exact old inverse bodies inside the current transport",
    () =>
      Effect.gen(function* () {
        const projection = {
          ...unsignedProjection,
          contentKey: oldArtifact.payload.contentKey,
        };
        const change = {
          artifactHash: artifact.artifactHash,
          artifactLocale: artifact.payload.artifactLocale,
          contentKey: artifact.payload.contentKey,
          delivery: "public",
          family: "material",
          operation: "upsert",
          rendererDomain: artifact.payload.rendererDomain,
          sourcePath: "packages/corpus/test/adoption/en.mdx",
        };
        const page = yield* Schema.decodeUnknownEffect(RollbackPageSchema)({
          done: true,
          nextIndex: 0,
          records: [
            {
              current: { artifact, change, projection },
              index: 0,
              prior: {
                artifact: oldArtifact,
                change: { ...change, artifactHash: oldArtifact.artifactHash },
                projection,
              },
            },
          ],
          rollbackOf: newRelease.manifest.releaseId,
          rollbackOfManifestHash: newRelease.manifestHash,
          total: 1,
        });
        const serialized = canonicalizeRollbackPage(page);
        const decoded = yield* Schema.decodeUnknownEffect(
          Schema.fromJsonString(RollbackPageSchema)
        )(serialized);
        const prior = decoded.records[0]?.prior;
        expect(
          prior !== undefined && isRollbackUpsert(prior)
            ? prior.artifact.artifactHash
            : undefined
        ).toBe(oldArtifact.artifactHash);
        expect(
          yield* decodePublicationResponse({
            ok: true,
            operation: "rollbackPage",
            value: decoded,
          })
        ).toMatchObject({ value: decoded });
        const staging = {
          artifacts: [oldArtifact],
          batchIndex: 0,
          operation: "stageArtifactBatch",
          releaseId: newManifest.releaseId,
        };
        expect(yield* decodePublicationRequest(staging)).toEqual(staging);
        const deletion = {
          change: {
            artifactLocale: "en",
            contentKey: artifact.payload.contentKey,
            family: "material",
            operation: "delete",
          },
        };
        const deletedPage = yield* Schema.decodeUnknownEffect(
          RollbackPageSchema
        )({
          ...page,
          records: [{ current: deletion, index: 0, prior: deletion }],
        });
        expect(canonicalizeRollbackPage(deletedPage)).toContain(
          '"operation":"delete"'
        );
        expect(
          yield* decodePublicationRequest({
            ...oldRelease,
            operation: "stageRelease",
            rendererManifest: oldRenderer,
          }).pipe(Effect.flip)
        ).toMatchObject({ _tag: "ContractDecodeError" });
      })
  );
  it("preserves rollback-origin and receipt checks in completed and staged slots", () => {
    const release = {
      ...rollbackRelease,
      manifest: {
        ...rollbackRelease.manifest,
        rendererManifestHash: live.hash,
      },
    };
    const active = {
      receipt: receiptFor(release),
      release,
      rendererManifest: live,
    };
    expect(Schema.is(ActiveRollbackContentReleaseSchema)(active)).toBe(true);
    expect(
      Schema.is(ActiveRollbackContentReleaseSchema)({
        receipt: receiptFor(newRelease),
        release: newRelease,
        rendererManifest: live,
      })
    ).toBe(false);
    expect(
      Schema.is(StagedRollbackContentReleaseSchema)({
        phase: "verified",
        release,
        rendererManifest: live,
      })
    ).toBe(true);
    expect(
      Schema.is(StagedRollbackContentReleaseSchema)({
        phase: "verified",
        release: newRelease,
        rendererManifest: live,
      })
    ).toBe(false);
    expect(
      Schema.is(ActiveRollbackContentReleaseSchema)({
        ...active,
        receipt: { ...active.receipt, stagedItems: 999 },
      })
    ).toBe(false);
  });
  it("accepts mixed slots but rejects a candidate bound to another base", () => {
    const state = {
      active: {
        receipt: receiptFor(oldRelease),
        release: oldRelease,
        rendererManifest: oldRenderer,
      },
      candidate: {
        phase: "staging",
        release: newRelease,
        rendererManifest: live,
      },
      recovery: null,
      tryoutRuntimeBundle: null,
    };
    expect(Schema.is(ContentReleaseCurrentSchema)(state)).toBe(true);
    expect(
      Schema.is(ContentReleaseCurrentSchema)({
        ...state,
        candidate: {
          ...state.candidate,
          release: {
            ...newRelease,
            manifest: { ...newManifest, baseManifestHash: newHash },
          },
        },
      })
    ).toBe(false);
  });
});
