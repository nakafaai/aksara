import { describe, expect, it } from "@effect/vitest";
import { hashTryoutRuntimeBundlePayload } from "@nakafa/aksara-contracts/tryout/runtime/hash";
import { makeTryoutSnapshot } from "@nakafa/aksara-contracts/tryout/snapshot/hash";
import { Effect } from "effect";

import {
  GENESIS_RUNTIME_BUNDLE_HASH,
  genesisRuntimePayload,
} from "#cli/genesis/spec";

describe("genesis runtime specification", () => {
  it.effect(
    "binds the recovered snapshot facts to one permanent bundle hash",
    () =>
      Effect.gen(function* () {
        const bundleHash = yield* hashTryoutRuntimeBundlePayload(
          genesisRuntimePayload
        );
        const snapshot = makeTryoutSnapshot(genesisRuntimePayload.snapshot);

        expect(bundleHash).toBe(GENESIS_RUNTIME_BUNDLE_HASH);
        expect(snapshot.snapshotId).toBe(
          genesisRuntimePayload.snapshot.snapshotId
        );
        expect(genesisRuntimePayload).toMatchObject({
          rendererManifestHash:
            "sha256:e06c5326020aeb0c43c0c565948b18a111a4df009ff3b3fe5cd827f35f9275e7",
          sourceGitSha: "e3a7f1e05bc64e1439e54084f50f2ad6ce22cd79",
          sourceManifestHash:
            "sha256:bee5d6e2bd95d8088596766f9e5c138c2e2558d0db7bbc16b97e93868c388ede",
          sourceReleaseId: "genesis-six-scope-v013-20260814-e3a7f1e",
        });
      })
  );
});
