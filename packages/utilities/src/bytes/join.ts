/** Joins already-bounded byte chunks into one exact-size buffer. */
export function joinBytes(chunks: Iterable<Uint8Array>, size: number) {
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return bytes;
}
