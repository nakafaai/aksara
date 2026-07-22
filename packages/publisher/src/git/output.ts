import { TextDecoder } from "node:util";
import { Effect, Stream } from "effect";

interface ByteAccumulator {
  readonly byteLength: number;
  readonly chunks: readonly Uint8Array[];
}

/** Copies bounded chunks into one exact-size byte array. */
function joinBytes(accumulator: ByteAccumulator) {
  const bytes = new Uint8Array(accumulator.byteLength);
  let offset = 0;
  for (const chunk of accumulator.chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return bytes;
}

/** Collects stream bytes while failing before retained data exceeds the limit. */
export function collectBoundedBytes<StreamError, LimitError>(
  stream: Stream.Stream<Uint8Array, StreamError>,
  maxBytes: number,
  onOverflow: (actualBytes: number) => LimitError
) {
  const initial: ByteAccumulator = { byteLength: 0, chunks: [] };
  return stream.pipe(
    Stream.runFoldEffect(initial, (current, chunk) => {
      const byteLength = current.byteLength + chunk.byteLength;
      if (byteLength > maxBytes) {
        return Effect.fail(onOverflow(byteLength));
      }
      return Effect.succeed({
        byteLength,
        chunks: [...current.chunks, Uint8Array.from(chunk)],
      });
    }),
    Effect.map(joinBytes)
  );
}

/** Drains a stream while retaining no more than its diagnostic byte limit. */
export function collectErrorBytes<StreamError>(
  stream: Stream.Stream<Uint8Array, StreamError>,
  maxBytes: number
) {
  const initial: ByteAccumulator = { byteLength: 0, chunks: [] };
  return stream.pipe(
    Stream.runFold(initial, (current, chunk) => {
      const remaining = maxBytes - current.byteLength;
      if (remaining <= 0) {
        return current;
      }
      const retained = chunk.slice(0, remaining);
      return {
        byteLength: current.byteLength + retained.byteLength,
        chunks: [...current.chunks, retained],
      };
    }),
    Effect.map(joinBytes)
  );
}

/** Fatally decodes UTF-8 bytes and maps decoder failures into typed data. */
export function decodeUtf8<DecodeError>(
  bytes: Uint8Array,
  onFailure: (cause: unknown) => DecodeError
) {
  return Effect.try({
    catch: onFailure,
    try: () => new TextDecoder("utf-8", { fatal: true }).decode(bytes),
  });
}
