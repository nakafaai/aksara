import { Effect } from "effect";

/** Makes the next Web Crypto digest fail while the wrapped program runs. */
export function withNextDigestFailure<A, E, R>(
  program: Effect.Effect<A, E, R>
) {
  return Effect.acquireUseRelease(
    Effect.sync(() =>
      vi
        .spyOn(crypto.subtle, "digest")
        .mockRejectedValueOnce(new TypeError("injected digest failure"))
    ),
    () => program,
    (mock) => Effect.sync(() => mock.mockRestore())
  );
}

/**
 * Makes Web Crypto digests of data that contains one marker fail while the
 * wrapped program runs, so a typed hash computation error can be observed.
 */
export function withDigestFailureFor<A, E, R>(
  marker: string,
  program: Effect.Effect<A, E, R>
) {
  return Effect.acquireUseRelease(
    Effect.sync(() => {
      const digest = crypto.subtle.digest.bind(crypto.subtle);
      return vi
        .spyOn(crypto.subtle, "digest")
        .mockImplementation((algorithm, data) => {
          const bytes = new Uint8Array(
            ArrayBuffer.isView(data) ? data.buffer : data
          );
          if (new TextDecoder().decode(bytes).includes(marker)) {
            return Promise.reject(new TypeError("injected digest failure"));
          }
          return digest(algorithm, data);
        });
    }),
    () => program,
    (mock) => Effect.sync(() => mock.mockRestore())
  );
}
