import {
  type Sha256Hash,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  ENGLISH_APP_LOCALE_CODE,
  INDONESIAN_APP_LOCALE_CODE,
} from "@nakafa/aksara-contracts/locale";
import {
  type TryoutRuntimeBundlePayload,
  TryoutRuntimeBundlePayloadSchema,
} from "@nakafa/aksara-contracts/tryout/runtime/spec";
import { Schema } from "effect";

/** Expected content address for the one retained genesis runtime payload. */
export const GENESIS_RUNTIME_BUNDLE_HASH: Sha256Hash = Sha256HashSchema.make(
  "sha256:6613c0fe37c6fbc94bc88fa59bacf20d664f6568f8da4dab8347396685573bd1"
);

/** Exact production facts recovered from the authenticated genesis release. */
export const genesisRuntimePayload: TryoutRuntimeBundlePayload =
  Schema.decodeSync(TryoutRuntimeBundlePayloadSchema)({
    format: "signed-tryout-runtime-bundle",
    rendererManifestHash:
      "sha256:e06c5326020aeb0c43c0c565948b18a111a4df009ff3b3fe5cd827f35f9275e7",
    snapshot: {
      activeAppLocales: [ENGLISH_APP_LOCALE_CODE, INDONESIAN_APP_LOCALE_CODE],
      catalogDigest:
        "sha256:4a4528d39855367f1a2338e0cdfb1767aa17f22195817c3351ab6814acd027d5",
      counts: {
        country: 2,
        exam: 4,
        section: 34,
        set: 10,
        track: 4,
      },
      format: "localized-tryout-snapshot",
      placementCount: 840,
      placementDigest:
        "sha256:8cb74256608c47cf10c0b0146fb07343cc20a392a88d6d54a5f678791b589a9c",
      routeCount: 48,
      snapshotId:
        "sha256:8947def031cc7046d2d488dac2d9058d13de8bb3aad2f76584f96fe5bd5fc813",
    },
    sourceGitSha: "e3a7f1e05bc64e1439e54084f50f2ad6ce22cd79",
    sourceManifestHash:
      "sha256:bee5d6e2bd95d8088596766f9e5c138c2e2558d0db7bbc16b97e93868c388ede",
    sourceReleaseId: "genesis-six-scope-v013-20260814-e3a7f1e",
  });
