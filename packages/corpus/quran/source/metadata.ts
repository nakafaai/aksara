import { QuranSajdaSchema } from "@nakafa/aksara-contracts/quran/snapshot/row";
import {
  Array as Arr,
  Effect,
  HashMap,
  MutableHashMap,
  MutableList,
  Option,
  Schema,
} from "effect";

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
  return Arr.map(
    [...source.matchAll(new RegExp(`<${tag} [^>]+/>`, "g"))],
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
  const markerRows = MutableList.make<Marker>();
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
    MutableList.append(markerRows, { index, position });
  }
  const markers = MutableList.toArray(markerRows);
  if (markers.length === 0 || markers[0]?.position !== 1) {
    return yield* quranGenerationFailure(`Missing first Tanzil ${tag} marker.`);
  }
  return markers;
});

/** Parses exact Tanzil surah, partition, and sajda metadata. */
export const parseQuranMetadata = Effect.fn("AksaraCorpus.parseQuranMetadata")(
  function* (source: string) {
    const localizedNames = yield* readQuranSurahNames();
    const surahRows = MutableList.make<SurahMetadata>();
    for (const row of xmlRows(source, "sura")) {
      const name = attribute(row, "name");
      const meaning = attribute(row, "ename");
      const transliteration = attribute(row, "tname");
      const place = attribute(row, "type");
      const number = Number(attribute(row, "index"));
      const numberOfVerses = Number(attribute(row, "ayas"));
      const order = Number(attribute(row, "order"));
      const start = Number(attribute(row, "start"));
      const localizedName = Option.getOrUndefined(
        MutableHashMap.get(localizedNames, number)
      );
      if (
        !(name && meaning && transliteration && localizedName) ||
        (place !== "Meccan" && place !== "Medinan") ||
        !Arr.every([number, numberOfVerses, order, start], Number.isInteger)
      ) {
        return yield* quranGenerationFailure(
          `Invalid Tanzil surah metadata: ${row}`
        );
      }
      MutableList.append<SurahMetadata>(surahRows, {
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
    const surahs = MutableList.toArray(surahRows);
    if (
      surahs.length !== EXPECTED_SURAHS ||
      Arr.some(surahs, ({ number }, index) => number !== index + 1) ||
      Arr.reduce(
        surahs,
        0,
        (count, { numberOfVerses }) => count + numberOfVerses
      ) !== EXPECTED_VERSES
    ) {
      return yield* quranGenerationFailure(
        "Tanzil surah inventory is incomplete."
      );
    }

    const sajdaEntries =
      MutableList.make<readonly [number, typeof QuranSajdaSchema.Type]>();
    for (const row of xmlRows(source, "sajda")) {
      const surah = Number(attribute(row, "sura"));
      const aya = Number(attribute(row, "aya"));
      const type = attribute(row, "type");
      const position = globalPosition(surahs, surah, aya);
      if (!(position && Schema.is(QuranSajdaSchema)(type))) {
        return yield* quranGenerationFailure(
          `Invalid Tanzil sajda marker: ${row}`
        );
      }
      MutableList.append(sajdaEntries, [position, type]);
    }

    return {
      hizbQuarters: yield* parseMarkers(source, "quarter", surahs),
      juzs: yield* parseMarkers(source, "juz", surahs),
      manzils: yield* parseMarkers(source, "manzil", surahs),
      pages: yield* parseMarkers(source, "page", surahs),
      rukus: yield* parseMarkers(source, "ruku", surahs),
      sajdas: HashMap.fromIterable(MutableList.toArray(sajdaEntries)),
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
