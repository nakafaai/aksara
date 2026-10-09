import { Array as Arr, Effect, FileSystem, Schema } from "effect";
import { runEntry } from "#scripts/entry";
import { SigstoreProvenanceBundleVerifierLive } from "#scripts/provenance/bundle";
import {
  CliArgumentsSchema,
  ProvenanceVerificationError,
} from "#scripts/provenance/schema";
import { verifyProvenance } from "#scripts/provenance/verify";

/** Runs certificate-bound npm provenance verification at the Node boundary. */
export const runProvenanceMain = Effect.fn("AksaraProvenance.runMain")(
  function* (arguments_: readonly string[]) {
    const args = yield* Schema.decodeUnknownEffect(CliArgumentsSchema)(
      arguments_
    ).pipe(
      Effect.mapError(
        (cause) =>
          new ProvenanceVerificationError({
            cause,
            message: "Provenance verification arguments are invalid.",
          })
      )
    );
    const [
      auditPath,
      packageName,
      packageVersion,
      packageSha512,
      repository,
      workflow,
      ref,
      sourceSha,
      environment,
    ] = args;
    const fileSystem = yield* FileSystem.FileSystem;
    const source = yield* fileSystem.readFileString(auditPath).pipe(
      Effect.mapError(
        (cause) =>
          new ProvenanceVerificationError({
            cause,
            message: "Unable to read the npm signature audit.",
          })
      )
    );
    yield* verifyProvenance(source, {
      environment,
      packageName,
      packageSha512,
      packageVersion,
      ref,
      repository,
      sourceSha,
      workflow,
    });
    yield* Effect.log(
      `Verified ${packageName}@${packageVersion} with exact trusted-publisher provenance.`
    );
  }
);

runEntry(
  import.meta.main,
  runProvenanceMain(Arr.drop(process.argv, 2)).pipe(
    Effect.provide(SigstoreProvenanceBundleVerifierLive)
  ),
  { failureStream: "stdout" }
);
