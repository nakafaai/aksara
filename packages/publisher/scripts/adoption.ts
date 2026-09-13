import {
  NodeHttpClient,
  NodeRuntime,
  NodeServices,
} from "@effect/platform-node";
import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import {
  ACTIVE_SIGNING_KEY_ID,
  makeTrustedKeyResolver,
  TRUSTED_CONTENT_KEYS,
} from "@nakafa/aksara-contracts/signature/trusted";
import { ExactProcessLive } from "@nakafa/aksara-utilities/process/exact";
import { Config, Effect, FileSystem, Redacted, Schema } from "effect";
import {
  readAdoptionEvidence,
  requireEvidence,
  verifyAdoptionEvidence,
} from "#adoption/evidence";
import { normalizeHistory } from "#adoption/normalize";
import { prepareHistoricalCandidate } from "#adoption/prepare";
import { makeGitBlobLive } from "#publisher/git/blob";
import { PublicationTarget } from "#publisher/publication/spec";
import { stageCandidateRelease } from "#publisher/publication/verification";
import { makeEd25519PublicationSigner } from "#publisher/signing/service";
import { makeHttpPublicationTarget } from "#publisher/target/http";

// Delete this command, its evidence asset, and adoption imports after both
// historical snapshots pass CAS and terminal current-only production checks.
const command = Effect.gen(function* () {
  const mode = yield* Config.schema(
    Schema.Literals(["verify", "stage"]),
    "ADOPTION_MODE"
  );
  const index = yield* Config.schema(
    Schema.Literals(["0", "1"]),
    "ADOPTION_INDEX"
  );
  const path = yield* Config.String("ADOPTION_EVIDENCE");
  const output = yield* Config.String("ADOPTION_REPORT");
  const repositoryRoot = yield* Config.String("ADOPTION_REPOSITORY");
  const evidence = yield* readAdoptionEvidence(path);
  const verified = yield* verifyAdoptionEvidence(evidence, Number(index)).pipe(
    Effect.provide(makeGitBlobLive(repositoryRoot))
  );
  const normalized = yield* normalizeHistory(verified);
  const fs = yield* FileSystem.FileSystem;
  const report = {
    artifactCount: normalized.artifacts.size,
    originalSnapshotId: verified.history.snapshot.manifest.snapshotId,
    originalSourceManifestHash: verified.history.release.manifestHash,
    placementCount: normalized.snapshot.manifest.placementCount,
    snapshot: normalized.snapshot,
    sourceGitSha: verified.sourceGitSha,
  };
  if (mode === "verify") {
    yield* fs.writeFileString(output, JSON.stringify(report));
    return yield* Effect.logInfo(
      "Historical source and normalized snapshot verified.",
      {
        artifactCount: report.artifactCount,
        placementCount: report.placementCount,
        snapshotId: report.snapshot.manifest.snapshotId,
      }
    );
  }
  const endpoint = yield* Config.URL("AKSARA_PUBLICATION_ENDPOINT");
  const token = yield* Config.Redacted("AKSARA_PUBLICATION_TOKEN");
  const keyId = yield* Config.String("AKSARA_SIGNING_KEY_ID");
  const privateKey = yield* Config.Redacted("AKSARA_SIGNING_PRIVATE_KEY");
  yield* requireEvidence(
    keyId === ACTIVE_SIGNING_KEY_ID,
    "The signing key is not the configured active key."
  );
  const signer = yield* makeEd25519PublicationSigner({
    keyId,
    privateKeyPem: Redacted.value(privateKey),
  });
  const target = yield* makeHttpPublicationTarget({
    allowInsecureLoopback: false,
    endpoint,
    timeout: "90 seconds",
    token,
  });
  const releaseId = yield* Config.schema(
    ReleaseIdSchema,
    "ADOPTION_RELEASE_ID"
  );
  const plan = yield* prepareHistoricalCandidate(
    normalized,
    releaseId,
    signer
  ).pipe(Effect.provideService(PublicationTarget, target));
  // This administrative path has no activation operation. The verified result
  // remains invisible while the separately checked learner pointers are adopted.
  const result = yield* stageCandidateRelease(plan);
  yield* requireEvidence(
    result.kind === "verified",
    "Historical adoption must not activate its source candidate."
  );
  yield* fs.writeFileString(
    output,
    JSON.stringify({
      ...report,
      bundle: plan.bundle,
      runtimeBundles: plan.tryoutRuntimeBundles,
    })
  );
  yield* Effect.logInfo("Historical candidate verified without activation.", {
    manifestHash: plan.bundle.release.manifestHash,
    releaseId,
    snapshotId: report.snapshot.manifest.snapshotId,
  });
});

NodeRuntime.runMain(
  command.pipe(
    Effect.scoped,
    Effect.provide([
      NodeServices.layer,
      NodeHttpClient.layerNodeHttp,
      ExactProcessLive,
    ]),
    Effect.provideService(
      ContentVerificationKeyResolver,
      makeTrustedKeyResolver(TRUSTED_CONTENT_KEYS)
    )
  )
);
