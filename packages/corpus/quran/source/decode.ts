import { Effect } from "effect";
import { QuranSourceFileError } from "#corpus/quran/source/failure";

/** Decodes one source without replacing invalid UTF-8 bytes. */
export function decodeSource(name: string, bytes: Uint8Array) {
  return Effect.try({
    catch: () =>
      new QuranSourceFileError({
        detail: `Pinned source is not valid UTF-8: ${name}.`,
      }),
    try: () => new TextDecoder("utf-8", { fatal: true }).decode(bytes),
  });
}
