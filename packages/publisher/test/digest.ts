import { Effect } from "effect";

/** Makes the next Web Crypto digest fail while the wrapped program runs. */
export function withNextDigestFailure<A, E, R>(
  program: Effect.Effect<A, E, R>
) {
  return Effect.acquireUseRelease(
    Effect.sync(() =>
      vi
        .spyOn(globalThis.crypto.subtle, "digest")
        .mockRejectedValueOnce(new TypeError("Test-only digest failure."))
    ),
    () => program,
    (mock) => Effect.sync(() => mock.mockRestore())
  );
}
