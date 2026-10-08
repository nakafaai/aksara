import { Effect } from "effect";
import { ContentKeySchema, CorpusSourcePathSchema } from "#contracts/ids";
import { verifyProtectedContentRuntimeExchange } from "#contracts/runtime/protected/verify";
import { ContentVerificationKeyResolver } from "#contracts/signature/spec";
import { rendererManifest } from "#contracts/test/request";
import {
  createSignedArtifact,
  protectedSnapshotId,
  runtimeBundle,
  trustedResolver,
} from "#contracts/test/runtime/fixture";

const protectedQuestionKey =
  "question-bank/tryout/test/runtime/protected/set-1/question-1";
export const protectedContentKey = ContentKeySchema.make(
  `${protectedQuestionKey}/question`
);
export const protectedArtifact = createSignedArtifact(protectedContentKey);
export const protectedAnswerContentKey = ContentKeySchema.make(
  `${protectedQuestionKey}/answer`
);
export const protectedAnswerArtifact = createSignedArtifact(
  protectedAnswerContentKey
);
export const protectedExpandedArtifact = createSignedArtifact(
  protectedContentKey,
  ["InlineMath"]
);
export const protectedSelector = {
  artifactHash: protectedArtifact.artifactHash,
  contentKey: protectedContentKey,
  delivery: "authenticated",
} as const;
export const protectedAnswerSelector = {
  artifactHash: protectedAnswerArtifact.artifactHash,
  contentKey: protectedAnswerContentKey,
  delivery: "entitled",
} as const;
export const protectedRequest = {
  bundleHash: runtimeBundle.bundleHash,
  selectors: [protectedSelector],
  snapshotId: protectedSnapshotId,
} as const;
export const protectedAnswerRequest = {
  ...protectedRequest,
  selectors: [protectedAnswerSelector],
} as const;
export const protectedFound = {
  bundle: runtimeBundle,
  items: [
    {
      artifact: protectedArtifact,
      delivery: "authenticated",
      sourcePath: CorpusSourcePathSchema.make(
        `packages/corpus/${protectedQuestionKey}/question.en.mdx`
      ),
    },
  ],
  kind: "found",
  rendererManifest,
} as const;

/** Verifies one protected runtime exchange with the fixture key. */
export const verifyProtectedExchange = Effect.fn(
  "AksaraContractsTest.verifyProtectedExchange"
)(
  (input: {
    readonly rendererManifest?: unknown;
    readonly request?: unknown;
    readonly response: unknown;
  }) =>
    verifyProtectedContentRuntimeExchange({
      rendererManifest: input.rendererManifest ?? rendererManifest,
      request: input.request ?? protectedRequest,
      response: input.response,
    }).pipe(
      Effect.provideService(ContentVerificationKeyResolver, trustedResolver)
    )
);

/** Public SPKI of the test-only key that signed the pinned protected bundle. */
export const pinnedPublicKey =
  "-----BEGIN PUBLIC KEY-----\nMCowBQYDK2VwAyEAshnRfXvqhr4lSN5ZrTy3Zi1Xn80aLpkYuGEt44UGhFA=\n-----END PUBLIC KEY-----\n";

export const pinnedArtifactMessage =
  'nakafa.aksara.content-artifact\nsha256:0fa8a0f311411536cf59447bc884c380045fbdf1509a7060149b5a53fb287a49\n{"artifactLocale":"en","byteLength":1,"compiledCode":"x","compilerConfigHash":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","compilerVersion":"0.1.0","contentKey":"question-bank/tryout/test/runtime/protected/set-1/question-1/question","format":"mdx-function-body","mdxCompilerVersion":"3.1.1","plainText":"Pecahan Ñandú café","rawMdx":"x","rendererDomain":"mathematics","requiredComponents":["BlockMath"],"sourceHash":"sha256:2d711642b726b04401627ca9fbac32f5c8530fb1903cc4db02258717921a4881"}';

export const pinnedBundleMessage =
  'nakafa.aksara.tryout-runtime-bundle\nsha256:ace5a7fcb3bbb4973b0a6d28bc3bdcd54cd9cbf420195bd997ae05460eb7107d\n{"format":"signed-tryout-runtime-bundle","rendererManifestHash":"sha256:92672cbd7915b85fc78ad2b8ed7f1b415fd9bac5a9bc4b204a561200f9bf26a3","snapshot":{"activeAppLocales":["en","id","de"],"catalogDigest":"sha256:bc3c268d148dad9d403a66b652fe5e0f50dd6d601c1d51663aaaf1a40e208c2e","counts":{"country":1,"exam":1,"section":1,"set":1,"track":1},"format":"localized-tryout-snapshot","placementCount":1,"placementDigest":"sha256:b7025981aa571ef4d7333d337e5c854fbf7b279e21f4d2f346ea23c93b8de108","routeCount":5,"snapshotId":"sha256:29440470fba79dbcf9c4b642213e59e55b9be8dddf5bd1c5c155a908edafa182"},"sourceGitSha":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","sourceManifestHash":"sha256:a0c43e4733cbaf7361e61a9a99179310845ea9a2273dceb8c43f958bfed73871","sourceReleaseId":"test-transport"}';

export const pinnedRequest = {
  bundleHash:
    "sha256:ace5a7fcb3bbb4973b0a6d28bc3bdcd54cd9cbf420195bd997ae05460eb7107d",
  selectors: [
    {
      artifactHash:
        "sha256:0fa8a0f311411536cf59447bc884c380045fbdf1509a7060149b5a53fb287a49",
      contentKey:
        "question-bank/tryout/test/runtime/protected/set-1/question-1/question",
      delivery: "authenticated",
    },
  ],
  snapshotId:
    "sha256:29440470fba79dbcf9c4b642213e59e55b9be8dddf5bd1c5c155a908edafa182",
};

export const pinnedFound = {
  bundle: {
    bundleHash:
      "sha256:ace5a7fcb3bbb4973b0a6d28bc3bdcd54cd9cbf420195bd997ae05460eb7107d",
    keyId: "test-runtime-key",
    payload: {
      format: "signed-tryout-runtime-bundle",
      rendererManifestHash:
        "sha256:92672cbd7915b85fc78ad2b8ed7f1b415fd9bac5a9bc4b204a561200f9bf26a3",
      snapshot: {
        activeAppLocales: ["en", "id", "de"],
        catalogDigest:
          "sha256:bc3c268d148dad9d403a66b652fe5e0f50dd6d601c1d51663aaaf1a40e208c2e",
        counts: { country: 1, exam: 1, section: 1, set: 1, track: 1 },
        format: "localized-tryout-snapshot",
        placementCount: 1,
        placementDigest:
          "sha256:b7025981aa571ef4d7333d337e5c854fbf7b279e21f4d2f346ea23c93b8de108",
        routeCount: 5,
        snapshotId:
          "sha256:29440470fba79dbcf9c4b642213e59e55b9be8dddf5bd1c5c155a908edafa182",
      },
      sourceGitSha: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      sourceManifestHash:
        "sha256:a0c43e4733cbaf7361e61a9a99179310845ea9a2273dceb8c43f958bfed73871",
      sourceReleaseId: "test-transport",
    },
    // Record again: create a key, sign the same input, and replace the public key and signature literals.
    signature:
      "82im7ZWPnRyjHMr4F3VvnL_3IHSKIG2Zju9i3gGNb6CDqAX61w9ND3omasZQLI8_DxCvwSA3ERE8EsR-5bDcCg",
  },
  items: [
    {
      artifact: {
        artifactHash:
          "sha256:0fa8a0f311411536cf59447bc884c380045fbdf1509a7060149b5a53fb287a49",
        keyId: "test-runtime-key",
        payload: {
          artifactLocale: "en",
          byteLength: 1,
          compiledCode: "x",
          compilerConfigHash:
            "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          compilerVersion: "0.1.0",
          contentKey:
            "question-bank/tryout/test/runtime/protected/set-1/question-1/question",
          format: "mdx-function-body",
          mdxCompilerVersion: "3.1.1",
          plainText: "Pecahan Ñandú café",
          rawMdx: "x",
          rendererDomain: "mathematics",
          requiredComponents: ["BlockMath"],
          sourceHash:
            "sha256:2d711642b726b04401627ca9fbac32f5c8530fb1903cc4db02258717921a4881",
        },
        // Record again: create a key, sign the same input, and replace the public key and signature literals.
        signature:
          "mkCGeTLshYWb9PcxwsdzsBnexp4W9ZCfPG9zTCS8Ntf21tKnutk7jeQrKu8r5hiI395VVmhOc2UIcF29bFlzCg",
      },
      delivery: "authenticated",
      sourcePath:
        "packages/corpus/question-bank/tryout/test/runtime/protected/set-1/question-1/question.en.mdx",
    },
  ],
  kind: "found",
  rendererManifest: {
    base: ["BlockMath"],
    domains: [
      { components: [], name: "ai-ds" },
      { components: [], name: "biology" },
      { components: [], name: "chemistry" },
      { components: [], name: "mathematics" },
      { components: [], name: "physics" },
      { components: [], name: "politics" },
      { components: [], name: "site" },
      { components: [], name: "snbt-general" },
      { components: [], name: "snbt-math" },
      { components: [], name: "snbt-plain" },
      { components: [], name: "snbt-quant" },
      { components: [], name: "tka-math" },
    ],
    format: "nakafa-mdx-renderer",
    hash: "sha256:92672cbd7915b85fc78ad2b8ed7f1b415fd9bac5a9bc4b204a561200f9bf26a3",
    publishedDomains: ["mathematics"],
  },
};
