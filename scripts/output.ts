import { Stream } from "effect";
import type { PlatformError } from "effect/PlatformError";

/** Collects one child-process output stream as UTF-8 text. */
export function collectText(stream: Stream.Stream<Uint8Array, PlatformError>) {
  return stream.pipe(
    Stream.decodeText(),
    Stream.runFold(
      () => "",
      (output, chunk) => output + chunk
    )
  );
}
