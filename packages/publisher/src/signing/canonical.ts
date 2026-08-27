import { Buffer } from "node:buffer";
import { type KeyObject, sign as signBytes } from "node:crypto";

import { Ed25519SignatureSchema } from "@nakafa/aksara-contracts/ids";
import { Effect } from "effect";

import { ContentSigningError } from "#publisher/signing/error";

type SigningStage = Exclude<ContentSigningError["stage"], "configuration">;

/** Signs one domain-separated canonical message with an Ed25519 key. */
export function signCanonicalInput(
  privateKey: KeyObject,
  message: string,
  stage: SigningStage
) {
  return Effect.try({
    catch: () =>
      new ContentSigningError({
        message: `Ed25519 ${stage} signing failed.`,
        stage,
      }),
    try: () =>
      Ed25519SignatureSchema.make(
        signBytes(null, Buffer.from(message, "utf8"), privateKey).toString(
          "base64url"
        )
      ),
  });
}
