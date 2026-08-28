import { Effect } from "effect";

import { readQuranSurahNames } from "#corpus/quran/names";
import { quranGenerationFailure } from "#corpus/quran/source/error";
import type {
  Marker,
  ParsedMetadata,
  SurahMetadata,
} from "#corpus/quran/source/model";

const EXPECTED_SURAHS = 114;
const EXPECTED_VERSES = 6236;

/** Extracts one exact XML attribute without decoding or normalizing it. */
function attribute(row: string, name: string) {
  return row.match(new RegExp(`${name}="([^"]*)"`))?.[1];
}

/** Lists all exact self-closing XML rows for one Tanzil metadata tag. */
function xmlRows(source: string, tag: string) {
  return [...source.matchAll(new RegExp(`<${tag} [^>]+/>`, "g"))].map(
    ([row]) => row
  );
}

/** Resolves one Tanzil surah and verse pair to its global one-based position. */
function globalPosition(
  surahs: readonly SurahMetadata[],
  surahNumber: number,
  verseNumber: number
) {
  const surah = surahs[surahNumber - 1];
  if (!surah || verseNumber < 1 || verseNumber > surah.numberOfVerses) {
    return;
  }
  return surah.start + verseNumber;
}

/** Parses one ordered Tanzil partition marker collection. */
const parseMarkers = Effect.fn("AksaraCorpus.parseQuranMarkers")(function* (
  source: string,
  tag: string,
  surahs: readonly SurahMetadata[]
) {
  const markers: Marker[] = [];
  for (const row of xmlRows(source, tag)) {
    const index = Number(attribute(row, "index"));
    const surah = Number(attribute(row, "sura"));
    const aya = Number(attribute(row, "aya"));
    const position = globalPosition(surahs, surah, aya);
    if (!(Number.isInteger(index) && position)) {
      return yield* quranGenerationFailure(
        `Invalid Tanzil ${tag} marker: ${row}`
      );
    }
    markers.push({ index, position });
  }
  if (markers.length === 0 || markers[0]?.position !== 1) {
    return yield* quranGenerationFailure(`Missing first Tanzil ${tag} marker.`);
  }
  return markers;
});

/** Parses exact Tanzil surah, partition, and sajda metadata. */
export const parseQuranMetadata = Effect.fn("AksaraCorpus.parseQuranMetadata")(
  function* (source: string) {
    const localizedNames = yield* readQuranSurahNames();
    const surahs: SurahMetadata[] = [];
    for (const row of xmlRows(source, "sura")) {
      const name = attribute(row, "name");
      const meaning = attribute(row, "ename");
      const transliteration = attribute(row, "tname");
      const place = attribute(row, "type");
      const number = Number(attribute(row, "index"));
      const numberOfVerses = Number(attribute(row, "ayas"));
      const order = Number(attribute(row, "order"));
      const start = Number(attribute(row, "start"));
      const localizedName = localizedNames.get(number);
      if (
        !(name && meaning && transliteration && localizedName) ||
        (place !== "Meccan" && place !== "Medinan") ||
        ![number, numberOfVerses, order, start].every(Number.isInteger)
      ) {
        return yield* quranGenerationFailure(
          `Invalid Tanzil surah metadata: ${row}`
        );
      }
      surahs.push({
        name: {
          arabic: name,
          meaning: { de: localizedName.de, en: meaning, id: localizedName.id },
          transliteration,
        },
        number,
        numberOfVerses,
        revelation: { order, place },
        start,
      });
    }
    if (
      surahs.length !== EXPECTED_SURAHS ||
      surahs.some(({ number }, index) => number !== index + 1) ||
      surahs.reduce(
        (count, { numberOfVerses }) => count + numberOfVerses,
        0
      ) !== EXPECTED_VERSES
    ) {
      return yield* quranGenerationFailure(
        "Tanzil surah inventory is incomplete."
      );
    }

    const sajdas = new Map<number, "obligatory" | "recommended">();
    for (const row of xmlRows(source, "sajda")) {
      const surah = Number(attribute(row, "sura"));
      const aya = Number(attribute(row, "aya"));
      const type = attribute(row, "type");
      const position = globalPosition(surahs, surah, aya);
      if (!position || (type !== "obligatory" && type !== "recommended")) {
        return yield* quranGenerationFailure(
          `Invalid Tanzil sajda marker: ${row}`
        );
      }
      sajdas.set(position, type);
    }

    return {
      hizbQuarters: yield* parseMarkers(source, "quarter", surahs),
      juzs: yield* parseMarkers(source, "juz", surahs),
      manzils: yield* parseMarkers(source, "manzil", surahs),
      pages: yield* parseMarkers(source, "page", surahs),
      rukus: yield* parseMarkers(source, "ruku", surahs),
      sajdas,
      surahs,
    } satisfies ParsedMetadata;
  }
);

/** Resolves the active ordered partition marker for one global verse. */
export function quranMarkerAt(markers: readonly Marker[], position: number) {
  let current: number | undefined;
  for (const marker of markers) {
    if (marker.position > position) {
      break;
    }
    current = marker.index;
  }
  return current;
}
