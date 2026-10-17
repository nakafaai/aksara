import { Effect } from "effect";
import { Sha256HashSchema } from "#contracts/ids";
import { ACTIVE_APP_LOCALES } from "#contracts/locale";
import { generateEd25519KeyPem } from "#contracts/signature/key";
import { makeTryoutSnapshot } from "#contracts/tryout/snapshot/hash";

/** One Ed25519 key pair for the try-out runtime bundle fixtures, generated once per test process. */
export const tryoutRuntimeKeys = await Effect.runPromise(
  generateEd25519KeyPem()
);

/** Permanent try-out snapshot that the runtime bundle fixtures pin. */
export const tryoutRuntimeSnapshot = await Effect.runPromise(
  makeTryoutSnapshot({
    activeAppLocales: ACTIVE_APP_LOCALES,
    catalogDigest: Sha256HashSchema.make(`sha256:${"a".repeat(64)}`),
    counts: { country: 1, exam: 1, section: 1, set: 1, track: 1 },
    placementCount: 2,
    placementDigest: Sha256HashSchema.make(`sha256:${"b".repeat(64)}`),
    routeCount: 5,
  })
);
