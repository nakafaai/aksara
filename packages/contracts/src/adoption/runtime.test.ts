import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { verifyContentRuntimeExchange } from "#contracts/adoption/public";
import {
  live,
  newRelease,
  oldRelease,
  oldRenderer,
  retainedArtifact,
  trust,
} from "#contracts/test/adoption";
import { found, request } from "#contracts/test/runtime/public";

describe("retained adoption exchange", () => {
  it.effect(
    "executes retained public bodies and mixed current release evidence",
    () =>
      Effect.gen(function* () {
        const retainedBody = retainedArtifact(
          1,
          found.artifact.payload.contentKey
        );
        const response = {
          ...found,
          activeManifestHash: oldRelease.manifestHash,
          activeReleaseId: oldRelease.manifest.releaseId,
          artifact: retainedBody,
          release: oldRelease,
          rendererManifest: oldRenderer,
        };
        expect(
          yield* verifyContentRuntimeExchange({
            rendererManifest: live,
            request,
            response,
          }).pipe(trust)
        ).toEqual(response);
        const mixed = {
          ...response,
          activeManifestHash: newRelease.manifestHash,
          activeReleaseId: newRelease.manifest.releaseId,
          release: newRelease,
          rendererManifest: live,
        };
        expect(
          yield* verifyContentRuntimeExchange({
            rendererManifest: live,
            request,
            response: mixed,
          }).pipe(trust)
        ).toEqual(mixed);
      })
  );
});
