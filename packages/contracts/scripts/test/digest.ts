import { Effect } from "effect";

/**
 * Makes the next Web Crypto digest of the archive fail while the wrapped
 * program runs, so the typed archive error that it maps to can be observed.
 */
export function withArchiveDigestFailure<A, E, R>(
  program: Effect.Effect<A, E, R>
) {
  return Effect.acquireUseRelease(
    Effect.sync(() =>
      vi
        .spyOn(globalThis.crypto.subtle, "digest")
        .mockRejectedValueOnce(
          new TypeError("Test-only archive digest failure.")
        )
    ),
    () => program,
    (mock) => Effect.sync(() => mock.mockRestore())
  );
}
