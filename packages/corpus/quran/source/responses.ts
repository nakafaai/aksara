import { Effect, type FileSystem, MutableList, type Path } from "effect";
import { bundleParts, digestBundle } from "#corpus/quran/source/bundle";
import { decodeSource } from "#corpus/quran/source/decode";
import { QuranSourceFileError } from "#corpus/quran/source/failure";
import {
  type QuranApiBundle,
  QURANENC_BUNDLE_DOMAIN,
} from "#corpus/quran/source/policy";

/**
 * Reads the exact 114 QuranEnc responses of one pinned bundle (the Indonesian
 * Tafsir, the Malay translation) and authenticates them as one identity.
 */
export const readQuranEncResponses = Effect.fn(
  "AksaraCorpus.readPinnedQuranEncResponses"
)(function* (
  fileSystem: FileSystem.FileSystem,
  path: Path.Path,
  sourceRoot: string,
  bundle: QuranApiBundle,
  label: string
) {
  const parts = MutableList.make<Uint8Array>();
  MutableList.append(
    parts,
    new TextEncoder().encode(`${QURANENC_BUNDLE_DOMAIN}\n`)
  );
  const sourceBytes = MutableList.make<Uint8Array>();
  const sources = MutableList.make<string>();
  let byteCount = 0;
  for (let number = 1; number <= 114; number += 1) {
    const name = `${number}.json`;
    const bytes = yield* Effect.mapError(
      fileSystem.readFile(path.join(sourceRoot, bundle.directory, name)),
      () =>
        new QuranSourceFileError({
          detail: `Could not read QuranEnc ${label} source ${name}.`,
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
  const digest = yield* digestBundle(MutableList.toArray(parts));
  if (
    byteCount !== bundle.artifact.byteCount ||
    digest !== bundle.artifact.digest.slice("sha256:".length)
  ) {
    return yield* new QuranSourceFileError({
      detail: `Pinned QuranEnc ${label} bundle drifted.`,
    });
  }
  return {
    sourceBytes: MutableList.toArray(sourceBytes),
    sources: MutableList.toArray(sources),
  };
});
