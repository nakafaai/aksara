// @vitest-environment node
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { verifySignedContentArtifact } from "#contracts/artifact/verify";
import { Sha256HashSchema } from "#contracts/ids";
import type { RendererComponentName } from "#contracts/renderer/component";
import { createRendererManifest } from "#contracts/renderer/manifest";
import { ContentVerificationKeyResolver } from "#contracts/signature/spec";
import {
  pinnedArtifact,
  pinnedManifest,
  pinnedResolver,
  verifyPinnedSignature,
} from "#contracts/test/artifact";
import { withDigestFailureFor } from "#contracts/test/digest";
import { testRendererDomains } from "#contracts/test/renderer";
import {
  basePayload,
  chemistryArtifact,
  makePayload,
  mathematicsArtifact,
  missingComponentArtifact,
  tamperedArtifact,
  trustedResolver,
  validArtifact,
} from "#contracts/test/signed";
import { encodeJsonText } from "#contracts/text/json";

const rendererComponents = ["BlockMath", "InlineMath"] as const;

/** Builds one exact base plus real route-domain renderer contract. */
function manifestInput(extraComponent?: RendererComponentName) {
  const components = extraComponent
    ? [...rendererComponents, extraComponent]
    : rendererComponents;
  return {
    base: components,
    domains: testRendererDomains({
      chemistry: ["AtomShellLab"],
      mathematics: ["FunctionMachine"],
    }),
    publishedDomains: ["mathematics"] as const,
  };
}

const rendererManifest = createRendererManifest(manifestInput());
const invalidRendererManifest = rendererManifest.pipe(
  Effect.map((manifest) => ({
    ...manifest,
    hash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
  }))
);

/** Builds one artifact verification request with overridable boundaries. */
function request(artifact: unknown, manifest: unknown) {
  return { artifact, rendererManifest: manifest };
}

/** Builds artifact verification with the trusted test resolver. */
function artifactProgram(input: unknown) {
  return verifySignedContentArtifact(input).pipe(
    Effect.provideService(ContentVerificationKeyResolver, trustedResolver)
  );
}

/** Returns an expected typed artifact verification failure. */
function reject(input: unknown) {
  return artifactProgram(input).pipe(Effect.flip);
}

/** Rejects an artifact against a renderer-manifest program. */
function rejectArtifact(artifact: unknown, manifestProgram = rendererManifest) {
  return manifestProgram.pipe(
    Effect.flatMap((manifest) => reject(request(artifact, manifest)))
  );
}

describe("server-only artifact verification", () => {
  it.effect("authenticates canonical content across a renderer expansion", () =>
    Effect.gen(function* () {
      const expandedManifest = yield* createRendererManifest(
        manifestInput("Mermaid")
      );
      expect(
        yield* artifactProgram(request(validArtifact, expandedManifest))
      ).toMatchObject({ payload: basePayload });
    })
  );

  it.effect("separates authoring support from deployed route support", () =>
    Effect.gen(function* () {
      const authoringOnly = yield* createRendererManifest({
        ...manifestInput(),
        publishedDomains: ["chemistry"],
      });
      const error = yield* reject(request(validArtifact, authoringOnly));
      expect(error).toMatchObject({
        _tag: "ArtifactRendererDomainUnpublishedError",
        contentKey: basePayload.contentKey,
        rendererDomain: "mathematics",
      });
    })
  );

  it.effect.each([
    {
      expectedTag: "ArtifactHashMismatchError",
      program: rejectArtifact({
        ...validArtifact,
        payload: makePayload({ compiledCode: "return { changed: true };" }),
      }),
    },
    {
      expectedTag: "ArtifactHashMismatchError",
      program: rejectArtifact({
        ...validArtifact,
        artifactHash: `sha256:${"f".repeat(64)}`,
      }),
    },
    {
      expectedTag: "SignatureInvalidError",
      program: rejectArtifact(tamperedArtifact),
    },
    {
      expectedTag: "SignatureInvalidError",
      program: rejectArtifact(tamperedArtifact, invalidRendererManifest),
    },
    {
      expectedTag: "RendererManifestHashMismatchError",
      program: rejectArtifact(validArtifact, invalidRendererManifest),
    },
    {
      expectedTag: "ArtifactRendererComponentMissingError",
      program: rejectArtifact(missingComponentArtifact),
    },
    {
      expectedTag: "ArtifactHashComputationError",
      program: withDigestFailureFor(
        "hash:payload",
        rejectArtifact({
          ...validArtifact,
          payload: { ...validArtifact.payload, contentKey: "hash:payload" },
        })
      ),
    },
  ] as const)(
    "rejects invalid artifact state with $expectedTag",
    ({ expectedTag, program }) =>
      program.pipe(Effect.map((error) => expect(error._tag).toBe(expectedTag)))
  );

  it.effect("rejects requirements from a different route-domain registry", () =>
    Effect.gen(function* () {
      const crossDomainManifest = yield* createRendererManifest({
        ...manifestInput(),
        publishedDomains: ["chemistry", "mathematics"],
      });
      expect(
        yield* artifactProgram(
          request(mathematicsArtifact, crossDomainManifest)
        )
      ).toEqual(mathematicsArtifact);
      const error = yield* reject(
        request(chemistryArtifact, crossDomainManifest)
      );
      expect(error._tag).toBe("ArtifactRendererComponentMissingError");
    })
  );

  it.effect("rejects excess top-level and nested wire properties", () =>
    Effect.gen(function* () {
      const privateSourceMarker = "must-not-appear-in-decode-errors";
      const [topLevel, nested] = yield* Effect.all([
        rendererManifest.pipe(
          Effect.map((manifest) => ({
            ...request(validArtifact, manifest),
            unexpected: true,
          })),
          Effect.flatMap((input) => reject(input))
        ),
        rejectArtifact({
          ...validArtifact,
          payload: { ...basePayload, rawMdx: privateSourceMarker },
          unexpected: true,
        }),
      ]);
      expect(topLevel._tag).toBe("ArtifactVerificationDecodeError");
      expect(nested._tag).toBe("ArtifactVerificationDecodeError");
      expect(encodeJsonText(nested)).not.toContain(privateSourceMarker);
    })
  );
});

describe("pinned renderer verification", () => {
  it.effect("authenticates pinned bytes under the pinned renderer", () =>
    verifySignedContentArtifact(request(pinnedArtifact, pinnedManifest)).pipe(
      Effect.provideService(ContentVerificationKeyResolver, pinnedResolver),
      Effect.map((artifact) => expect(artifact).toEqual(pinnedArtifact))
    )
  );

  it.effect(
    "verifies the pinned signature over the exact canonical bytes",
    () =>
      Effect.gen(function* () {
        expect(yield* verifyPinnedSignature()).toEqual([true, false]);
      })
  );
});
