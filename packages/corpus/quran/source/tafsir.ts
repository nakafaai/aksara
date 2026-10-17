import { Effect, type FileSystem, MutableList, type Path } from "effect";
import { bundleParts, digestBundle } from "#corpus/quran/source/bundle";
import { decodeSource } from "#corpus/quran/source/decode";
import { QuranSourceFileError } from "#corpus/quran/source/failure";
import {
  QURAN_SOURCE_POLICY,
  QURAN_TAFSIR_BUNDLE_DOMAIN,
} from "#corpus/quran/source/policy";

/** Reads the exact 114 QuranEnc responses and authenticates their bundle. */
export const readTafsirSources = Effect.fn(
  "AksaraCorpus.readPinnedQuranTafsir"
)(function* (
  fileSystem: FileSystem.FileSystem,
  path: Path.Path,
  sourceRoot: string
) {
  const parts = MutableList.make<Uint8Array>();
  MutableList.append(
    parts,
    new TextEncoder().encode(`${QURAN_TAFSIR_BUNDLE_DOMAIN}\n`)
  );
  const sourceBytes = MutableList.make<Uint8Array>();
  const sources = MutableList.make<string>();
  let byteCount = 0;
  for (let number = 1; number <= 114; number += 1) {
    const name = `${number}.json`;
    const bytes = yield* Effect.mapError(
      fileSystem.readFile(
        path.join(sourceRoot, QURAN_SOURCE_POLICY.tafsir.directory, name)
      ),
      () =>
        new QuranSourceFileError({
          detail: `Could not read QuranEnc Tafsir source ${name}.`,
        })
    );
    const text = yield* decodeSource(name, bytes);
    for (const part of bundleParts(name, bytes)) {
      MutableList.append(parts, part);
    }
    byteCount += bytes.byteLength;
    MutableList.append(sourceBytes, bytes);
    MutableList.append(sources, text);
  }
  const expected = QURAN_SOURCE_POLICY.tafsir.artifact;
  const digest = yield* digestBundle(MutableList.toArray(parts));
  if (
    byteCount !== expected.byteCount ||
    digest !== expected.digest.slice("sha256:".length)
  ) {
    return yield* new QuranSourceFileError({
      detail: "Pinned QuranEnc Tafsir bundle drifted.",
    });
  }
  return {
    sourceBytes: MutableList.toArray(sourceBytes),
    sources: MutableList.toArray(sources),
  };
});
