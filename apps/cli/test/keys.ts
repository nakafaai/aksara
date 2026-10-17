import { generateEd25519KeyPem } from "@nakafa/aksara-contracts/signature/key";
import { Effect } from "effect";

/** One Ed25519 key pair for acceptance fixtures, generated once per test process. */
export const acceptanceKeyPair = await Effect.runPromise(
  generateEd25519KeyPem()
);
