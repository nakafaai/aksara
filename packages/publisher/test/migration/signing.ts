import { generateKeyPairSync } from "node:crypto";

import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect, Redacted } from "effect";

import { PublicationSigningKey } from "#publisher/publication/spec";
import { makeEd25519PublicationSigner } from "#publisher/signing/service";

const keys = generateKeyPairSync("ed25519");
const privateKeyPem = keys.privateKey
  .export({ format: "pem", type: "pkcs8" })
  .toString();

export const migrationSigningKey = PublicationSigningKey.of({
  keyId: "current-migration-key",
  privateKeyPem: Redacted.make(privateKeyPem),
});
export const migrationVerificationResolver = ContentVerificationKeyResolver.of({
  resolve: () =>
    Effect.succeed(
      keys.publicKey.export({ format: "pem", type: "spki" }).toString()
    ),
});
export const migrationSigner = await Effect.runPromise(
  makeEd25519PublicationSigner({
    keyId: migrationSigningKey.keyId,
    privateKeyPem,
  })
);
