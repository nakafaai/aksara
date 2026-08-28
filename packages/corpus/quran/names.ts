import { QuranSurahNumberSchema } from "@nakafa/aksara-contracts/quran/spec";
import { QuranMeaningfulTextSchema } from "@nakafa/aksara-contracts/quran/text";
import { Effect, Schema } from "effect";

import { quranGenerationFailure } from "#corpus/quran/source/error";

const SupplementalNameSchema = Schema.Tuple([
  QuranSurahNumberSchema,
  QuranMeaningfulTextSchema,
  QuranMeaningfulTextSchema,
]);

const SupplementalNamesSchema = Schema.Array(SupplementalNameSchema).pipe(
  Schema.check(
    Schema.makeFilter(
      (rows) =>
        rows.length === 114 &&
        rows.every(([number], index) => number === index + 1),
      { message: "Expected all 114 supplemental Quran surah names in order." }
    )
  )
);
type SupplementalNames = typeof SupplementalNamesSchema.Encoded;

/**
 * Reviewed Indonesian and German surah-name meanings.
 *
 * Indonesian values are transcribed from LPMQ's official 2019 translation,
 * archive version 4. German values follow the official Bubenheim and Elyas
 * edition, including its untranslated proper-name headings. English remains
 * owned by the pinned Tanzil metadata and is checked when the sources merge.
 */
const SUPPLEMENTAL_NAMES = [
  [1, "Pembuka", "Die Eröffnende"],
  [2, "Sapi", "Die Kuh"],
  [3, "Keluarga Imran", "Die Sippe Imrans"],
  [4, "Perempuan", "Die Frauen"],
  [5, "Hidangan", "Der Tisch"],
  [6, "Binatang Ternak", "Das Vieh"],
  [7, "Tempat Tertinggi", "Die Höhen"],
  [8, "Rampasan Perang", "Die Beute"],
  [9, "Pengampunan", "Die Reue"],
  [10, "Yunus", "Yunus"],
  [11, "Hud", "Hud"],
  [12, "Yusuf", "Yusuf"],
  [13, "Guruh", "Der Donner"],
  [14, "Ibrahim", "Ibrahim"],
  [15, "Hijr", "al-Higr"],
  [16, "Lebah", "Die Bienen"],
  [17, "Memperjalankan pada Malam Hari", "Die Nachtreise"],
  [18, "Gua", "Die Höhle"],
  [19, "Maryam", "Maryam"],
  [20, "Taha", "Ta-Ha"],
  [21, "Para Nabi", "Die Propheten"],
  [22, "Haji", "Die Pilgerfahrt"],
  [23, "Orang-orang Mukmin", "Die Gläubigen"],
  [24, "Cahaya", "Das Licht"],
  [25, "Pembeda", "Die Unterscheidung"],
  [26, "Para Penyair", "Die Dichter"],
  [27, "Semut", "Die Ameisen"],
  [28, "Kisah", "Die Geschichten"],
  [29, "Laba-laba", "Die Spinne"],
  [30, "Romawi", "Die Römer"],
  [31, "Luqman", "Luqman"],
  [32, "Sajdah", "Die Niederwerfung"],
  [33, "Golongan yang Bersekutu", "Die Gruppierungen"],
  [34, "Saba’", "Die Sabaer"],
  [35, "Pencipta", "Der Erschaffer"],
  [36, "Yasin", "Ya-Sin"],
  [37, "Yang Berbaris-baris", "Die sich Reihenden"],
  [38, "Ṣād", "Sad"],
  [39, "Rombongan", "Die Scharen"],
  [40, "Maha Pengampun", "Der Vergebende"],
  [41, "Dijelaskan", "Ausführlich dargelegt"],
  [42, "Musyawarah", "Die Beratung"],
  [43, "Perhiasan dari Emas", "Die Zierde"],
  [44, "Kabut Asap", "Der Rauch"],
  [45, "Berlutut", "Die Kniende"],
  [46, "Ahqaf", "Die Dünen"],
  [47, "Nabi Muhammad", "Muhammad"],
  [48, "Kemenangan", "Der Sieg"],
  [49, "Kamar-kamar", "Die Gemächer"],
  [50, "Qaf", "Qaf"],
  [51, "Yang Menerbangkan", "Die Zerstreuenden"],
  [52, "Gunung", "Der Berg"],
  [53, "Bintang", "Der Stern"],
  [54, "Bulan", "Der Mond"],
  [55, "Yang Maha Pengasih", "Der Allerbarmer"],
  [56, "Hari Kiamat yang Pasti Terjadi", "Die eintreffen wird"],
  [57, "Besi", "Das Eisen"],
  [58, "Gugatan", "Die Streitende"],
  [59, "Pengusiran", "Die Versammlung"],
  [60, "Wanita yang Diuji", "Die Geprüfte"],
  [61, "Barisan", "Die Reihe"],
  [62, "Jumat", "Der Freitag"],
  [63, "Orang-orang Munafik", "Die Heuchler"],
  [64, "Pengungkapan Kesalahan", "Die Übervorteilung"],
  [65, "Talak", "Die Scheidung"],
  [66, "Pengharaman", "Das Verbieten"],
  [67, "Kerajaan", "Die Herrschaft"],
  [68, "Pena", "Das Schreibrohr"],
  [69, "Hari Kiamat yang Pasti Datang", "Die fällig Werdende"],
  [70, "Tempat-tempat Naik", "Die Aufstiegswege"],
  [71, "Nuh", "Nuh"],
  [72, "Jin", "Die Ginn"],
  [73, "Orang Berkelumun", "Der Eingehüllte"],
  [74, "Orang Berselimut", "Der Zugedeckte"],
  [75, "Hari Kiamat", "Die Auferstehung"],
  [76, "Manusia", "Der Mensch"],
  [77, "Malaikat yang Diutus", "Die Entsandten"],
  [78, "Berita", "Die Kunde"],
  [79, "Yang Mencabut dengan Keras", "Die Entreißenden"],
  [80, "Berwajah Masam", "Er blickte düster"],
  [81, "Penggulungan", "Das Umschlingen"],
  [82, "Terbelah", "Das Zerbrechen"],
  [83, "Orang-orang yang Curang", "Die das Maß Kürzenden"],
  [84, "Terbelah", "Das Sichspalten"],
  [85, "Gugusan Bintang", "Die Türme"],
  [86, "Yang Datang pada Malam Hari", "Der Pochende"],
  [87, "Yang Mahatinggi", "Der Höchste"],
  [88, "Hari Kiamat yang Menghilangkan Kesadaran", "Die Überdeckende"],
  [89, "Fajar", "Die Morgendämmerung"],
  [90, "Negeri", "Die Ortschaft"],
  [91, "Matahari", "Die Sonne"],
  [92, "Malam", "Die Nacht"],
  [93, "Duha", "Die Morgenhelle"],
  [94, "Pelapangan", "Das Auftun"],
  [95, "Buah Tin", "Die Feige"],
  [96, "Segumpal Darah", "Das Anhängsel"],
  [97, "Al-Qadar", "Die Bestimmung"],
  [98, "Bukti Nyata", "Der klare Beweis"],
  [99, "Guncangan", "Das Beben"],
  [100, "Kuda Perang yang Berlari Kencang", "Die Rennenden"],
  [101, "Hari Kiamat yang Menggetarkan", "Das Verhängnis"],
  [102, "Berbangga-bangga dalam Memperbanyak Dunia", "Die Vermehrung"],
  [103, "Masa", "Das Zeitalter"],
  [104, "Pengumpat", "Der Stichler"],
  [105, "Gajah", "Der Elefant"],
  [106, "Orang Quraisy", "Qurais"],
  [107, "Bantuan", "Die Hilfeleistung"],
  [108, "Nikmat yang Banyak", "Die Fülle"],
  [109, "Orang-orang Kafir", "Die Ungläubigen"],
  [110, "Pertolongan", "Die Hilfe"],
  [111, "Gejolak Api", "Die Palmfasern"],
  [112, "Ikhlas", "Die Aufrichtigkeit"],
  [113, "Fajar", "Der Tagesanbruch"],
  [114, "Manusia", "Die Menschen"],
] as const;

/** Decodes one complete reviewed supplemental surah-name inventory. */
export const decodeQuranSurahNames = Effect.fn(
  "AksaraCorpus.decodeQuranSurahNames"
)((source: SupplementalNames) =>
  Schema.decodeEffect(SupplementalNamesSchema)(source).pipe(
    Effect.map(
      (rows) =>
        new Map(rows.map(([number, id, de]) => [number, { de, id }] as const))
    ),
    Effect.mapError(() =>
      quranGenerationFailure(
        "Supplemental Quran surah-name inventory is incomplete."
      )
    )
  )
);

/** Reads every reviewed supplemental name before Quran source generation. */
export const readQuranSurahNames = Effect.fn(
  "AksaraCorpus.readQuranSurahNames"
)(() => decodeQuranSurahNames(SUPPLEMENTAL_NAMES));
