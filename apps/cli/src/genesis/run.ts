import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import {
  ACTIVE_SIGNING_KEY_ID,
  makeTrustedKeyResolver,
  TRUSTED_CONTENT_KEYS,
} from "@nakafa/aksara-contracts/signature/trusted";
import { makeEd25519PublicationSigner } from "@nakafa/aksara-publisher/signing/service";
import {
  Effect,
  Equal,
  type FileSystem,
  type Path,
  Redacted,
  Schema,
} from "effect";

import { readSigningEnvironment } from "#cli/environment/read";
import { mapProductionError, type ProductionError } from "#cli/failure";
import { writeGenesisBundle } from "#cli/genesis/file";
import {
  GENESIS_RUNTIME_BUNDLE_HASH,
  genesisRuntimePayload,
} from "#cli/genesis/spec";
import { verifySigningKey } from "#cli/keys";
import type { GenesisArguments } from "#cli/production/arguments";

/** Signing produced bytes outside the single reviewed genesis identity. */
export class GenesisBundleIdentityError extends Schema.TaggedError<GenesisBundleIdentityError>()(
  "GenesisBundleIdentityError",
  {}
) {}

type GenesisCommand = Effect.Effect<
  void,
  ProductionError,
  FileSystem.FileSystem | Path.Path
>;

/** Signs and exports only the reviewed historical genesis runtime payload. */
export const runGenesisCommand: (args: GenesisArguments) => GenesisCommand =
  Effect.fn("AksaraCli.runGenesisCommand")((args) =>
    Effect.gen(function* () {
      const environment = yield* readSigningEnvironment().pipe(
        Effect.mapError(mapProductionError("environment"))
      );
      const keyResolver = makeTrustedKeyResolver(TRUSTED_CONTENT_KEYS);
      yield* verifySigningKey({
        activeKeyId: ACTIVE_SIGNING_KEY_ID,
        derivedPublicKeyPem: environment.derivedPublicKeyPem,
        keyId: environment.keyId,
      }).pipe(
        Effect.provideService(ContentVerificationKeyResolver, keyResolver),
        Effect.mapError(mapProductionError("keys"))
      );
      const signer = yield* makeEd25519PublicationSigner({
        keyId: environment.keyId,
        privateKeyPem: Redacted.value(environment.privateKeyPem),
      }).pipe(Effect.mapError(mapProductionError("migration")));
      const bundle = yield* signer
        .signTryoutRuntimeBundle(genesisRuntimePayload)
        .pipe(Effect.mapError(mapProductionError("migration")));
      if (
        bundle.bundleHash !== GENESIS_RUNTIME_BUNDLE_HASH ||
        bundle.keyId !== environment.keyId ||
        !Equal.equals(bundle.payload, genesisRuntimePayload)
      ) {
        return yield* Effect.fail(new GenesisBundleIdentityError()).pipe(
          Effect.mapError(mapProductionError("migration"))
        );
      }
      yield* writeGenesisBundle(args.bundlePath, bundle).pipe(
        Effect.mapError(mapProductionError("migration"))
      );
      yield* Effect.logInfo("Genesis try-out runtime bundle sealed.").pipe(
        Effect.annotateLogs({
          bundleHash: bundle.bundleHash,
          snapshotId: bundle.payload.snapshot.snapshotId,
          sourceReleaseId: bundle.payload.sourceReleaseId,
        })
      );
    })
  );
