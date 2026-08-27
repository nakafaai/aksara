import { describe, expect, it } from "@effect/vitest";
import {
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { Effect } from "effect";
import { selectRollbackProof } from "#publisher/rollback/proof";
import { makeRollbackRelease, makeSignedBundle } from "#test/publication/run";

describe("rollback proof selection", () => {
  it.effect(
    "selects source and recovery orientation from exact signed identities",
    () =>
      Effect.gen(function* () {
        const source = yield* Effect.tryPromise(() =>
          makeSignedBundle("test-proof-source")
        );
        const recovery = yield* Effect.tryPromise(() =>
          makeRollbackRelease("test-proof-recovery")
        );

        expect(
          yield* selectRollbackProof(
            source.release,
            ReleaseIdSchema.make("test-proof-new"),
            source.release.manifest.releaseId
          )
        ).toEqual({ kind: "source" });
        expect(
          yield* selectRollbackProof(
            recovery.release,
            recovery.release.manifest.releaseId,
            recovery.release.manifest.baseReleaseId ??
              ReleaseIdSchema.make("unreachable-base")
          )
        ).toMatchObject({
          baseManifestHash: recovery.release.manifest.baseManifestHash,
          baseReleaseId: recovery.release.manifest.baseReleaseId,
          kind: "recovery",
        });
      })
  );

  it.effect.each(["git", "wrong-base"] as const)(
    "rejects a candidate-shaped %s proof without rollback provenance",
    (kind) =>
      Effect.gen(function* () {
        const source = yield* Effect.tryPromise(() =>
          makeSignedBundle("test-proof-invalid")
        );
        const { release } = source;
        const { releaseId } = release.manifest;
        const rollbackOf = ReleaseIdSchema.make("test-proof-active");
        const base = {
          ...release,
          manifest: {
            ...release.manifest,
            baseManifestHash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
            baseReleaseId: ReleaseIdSchema.make("test-proof-other-base"),
          },
        };
        const proof =
          kind === "git"
            ? base
            : {
                ...base,
                manifest: {
                  ...base.manifest,
                  origin: {
                    kind: "rollback" as const,
                    releaseId: base.manifest.baseReleaseId,
                  },
                },
              };
        const error = yield* selectRollbackProof(
          proof,
          releaseId,
          rollbackOf
        ).pipe(Effect.flip);

        expect(error).toMatchObject({ _tag: "RollbackProofIdentityError" });
      })
  );
});
