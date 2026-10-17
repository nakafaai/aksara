import { generateEd25519KeyPem } from "@nakafa/aksara-contracts/signature/key";
import { Effect } from "effect";

/** One Ed25519 key pair generated once per test process, for fixtures that only need a signing key. */
export const testSigningKeyPair = await Effect.runPromise(
  generateEd25519KeyPem()
);
