import { signEd25519Message } from "@nakafa/aksara-contracts/signature/key";
import { Effect } from "effect";

import { ContentSigningError } from "#publisher/signing/error";

type SigningStage = Exclude<ContentSigningError["stage"], "configuration">;

/** Signs one domain-separated canonical message with an Ed25519 PKCS#8 PEM key. */
export function signCanonicalInput(
  privateKeyPem: string,
  message: string,
  stage: SigningStage
) {
  return signEd25519Message(privateKeyPem, message).pipe(
    Effect.mapError(
      () =>
        new ContentSigningError({
          message: `Ed25519 ${stage} signing failed.`,
          stage,
        })
    )
  );
}
