import { QuranSurahNumberSchema } from "@nakafa/aksara-contracts/quran/spec";
import { QuranMeaningfulTextSchema } from "@nakafa/aksara-contracts/quran/text";
import { Array as Arr, Effect, MutableHashMap, Schema } from "effect";

import { quranGenerationFailure } from "#corpus/quran/source/error";

const SupplementalNameSchema = Schema.Tuple([
  QuranSurahNumberSchema,
  QuranMeaningfulTextSchema,
  QuranMeaningfulTextSchema,
  QuranMeaningfulTextSchema,
]);

const SupplementalNamesSchema = Schema.Array(SupplementalNameSchema).pipe(
  Schema.check(
    Schema.makeFilter(
      (rows) =>
        rows.length === 114 &&
        Arr.every(rows, ([number], index) => number === index + 1),
      { message: "Expected all 114 supplemental Quran surah names in order." }
    )
  )
);
type SupplementalNames = typeof SupplementalNamesSchema.Encoded;

/**
 * Reviewed Indonesian, German and Malay surah-name meanings.
 *
 * Indonesian values are transcribed from LPMQ's official 2019 translation,
 * archive version 4. German values follow the official Bubenheim and Elyas
 * edition, including its untranslated proper-name headings. No official
 * Malaysian edition publishes all 114 meanings, so the Malay values are written
 * by Nakafa from the Arabic names and reviewed against the LPMQ Indonesian and
 * Tanzil English meanings. English remains owned by the pinned Tanzil metadata
 * and is checked when the sources merge.
 */
const SUPPLEMENTAL_NAMES = [
  [1, "Pembuka", "Die Eröffnende", "Pembukaan"],
  [2, "Sapi", "Die Kuh", "Lembu Betina"],
  [3, "Keluarga Imran", "Die Sippe Imrans", "Keluarga Imran"],
  [4, "Perempuan", "Die Frauen", "Wanita"],
  [5, "Hidangan", "Der Tisch", "Hidangan"],
  [6, "Binatang Ternak", "Das Vieh", "Binatang Ternakan"],
  [7, "Tempat Tertinggi", "Die Höhen", "Tempat yang Tinggi"],
  [8, "Rampasan Perang", "Die Beute", "Harta Rampasan Perang"],
  [9, "Pengampunan", "Die Reue", "Taubat"],
  [10, "Yunus", "Yunus", "Yunus"],
  [11, "Hud", "Hud", "Hud"],
  [12, "Yusuf", "Yusuf", "Yusuf"],
  [13, "Guruh", "Der Donner", "Guruh"],
  [14, "Ibrahim", "Ibrahim", "Ibrahim"],
  [15, "Hijr", "al-Higr", "Hijr"],
  [16, "Lebah", "Die Bienen", "Lebah"],
  [17, "Memperjalankan pada Malam Hari", "Die Nachtreise", "Perjalanan pada Waktu Malam"],
  [18, "Gua", "Die Höhle", "Gua"],
  [19, "Maryam", "Maryam", "Maryam"],
  [20, "Taha", "Ta-Ha", "Taha"],
  [21, "Para Nabi", "Die Propheten", "Para Nabi"],
  [22, "Haji", "Die Pilgerfahrt", "Haji"],
  [23, "Orang-orang Mukmin", "Die Gläubigen", "Orang yang Beriman"],
  [24, "Cahaya", "Das Licht", "Cahaya"],
  [25, "Pembeda", "Die Unterscheidung", "Pembeza"],
  [26, "Para Penyair", "Die Dichter", "Para Penyair"],
  [27, "Semut", "Die Ameisen", "Semut"],
  [28, "Kisah", "Die Geschichten", "Kisah-kisah"],
  [29, "Laba-laba", "Die Spinne", "Labah-labah"],
  [30, "Romawi", "Die Römer", "Rom"],
  [31, "Luqman", "Luqman", "Luqman"],
  [32, "Sajdah", "Die Niederwerfung", "Sujud"],
  [33, "Golongan yang Bersekutu", "Die Gruppierungen", "Golongan yang Bersekutu"],
  [34, "Saba’", "Die Sabaer", "Saba’"],
  [35, "Pencipta", "Der Erschaffer", "Pencipta"],
  [36, "Yasin", "Ya-Sin", "Yasin"],
  [37, "Yang Berbaris-baris", "Die sich Reihenden", "Yang Bersaf-saf"],
  [38, "Ṣād", "Sad", "Sad"],
  [39, "Rombongan", "Die Scharen", "Rombongan"],
  [40, "Maha Pengampun", "Der Vergebende", "Yang Maha Pengampun"],
  [41, "Dijelaskan", "Ausführlich dargelegt", "Yang Dijelaskan"],
  [42, "Musyawarah", "Die Beratung", "Mesyuarat"],
  [43, "Perhiasan dari Emas", "Die Zierde", "Perhiasan Emas"],
  [44, "Kabut Asap", "Der Rauch", "Asap"],
  [45, "Berlutut", "Die Kniende", "Yang Berlutut"],
  [46, "Ahqaf", "Die Dünen", "Bukit-bukit Pasir"],
  [47, "Nabi Muhammad", "Muhammad", "Nabi Muhammad"],
  [48, "Kemenangan", "Der Sieg", "Kemenangan"],
  [49, "Kamar-kamar", "Die Gemächer", "Bilik-bilik"],
  [50, "Qaf", "Qaf", "Qaf"],
  [51, "Yang Menerbangkan", "Die Zerstreuenden", "Angin yang Menerbangkan"],
  [52, "Gunung", "Der Berg", "Bukit Tursina"],
  [53, "Bintang", "Der Stern", "Bintang"],
  [54, "Bulan", "Der Mond", "Bulan"],
  [55, "Yang Maha Pengasih", "Der Allerbarmer", "Yang Maha Pemurah"],
  [56, "Hari Kiamat yang Pasti Terjadi", "Die eintreffen wird", "Hari Kiamat yang Pasti Berlaku"],
  [57, "Besi", "Das Eisen", "Besi"],
  [58, "Gugatan", "Die Streitende", "Wanita yang Mengadu"],
  [59, "Pengusiran", "Die Versammlung", "Pengusiran"],
  [60, "Wanita yang Diuji", "Die Geprüfte", "Wanita yang Diuji"],
  [61, "Barisan", "Die Reihe", "Barisan"],
  [62, "Jumat", "Der Freitag", "Jumaat"],
  [63, "Orang-orang Munafik", "Die Heuchler", "Orang Munafik"],
  [64, "Pengungkapan Kesalahan", "Die Übervorteilung", "Hari Dinampakkan Kesalahan"],
  [65, "Talak", "Die Scheidung", "Talak"],
  [66, "Pengharaman", "Das Verbieten", "Pengharaman"],
  [67, "Kerajaan", "Die Herrschaft", "Kerajaan"],
  [68, "Pena", "Das Schreibrohr", "Pena"],
  [69, "Hari Kiamat yang Pasti Datang", "Die fällig Werdende", "Hari Kiamat yang Pasti Datang"],
  [70, "Tempat-tempat Naik", "Die Aufstiegswege", "Tempat-tempat Naik"],
  [71, "Nuh", "Nuh", "Nuh"],
  [72, "Jin", "Die Ginn", "Jin"],
  [73, "Orang Berkelumun", "Der Eingehüllte", "Orang yang Berselubung"],
  [74, "Orang Berselimut", "Der Zugedeckte", "Orang yang Berselimut"],
  [75, "Hari Kiamat", "Die Auferstehung", "Hari Kiamat"],
  [76, "Manusia", "Der Mensch", "Manusia"],
  [77, "Malaikat yang Diutus", "Die Entsandten", "Malaikat yang Diutus"],
  [78, "Berita", "Die Kunde", "Berita"],
  [79, "Yang Mencabut dengan Keras", "Die Entreißenden", "Malaikat yang Mencabut"],
  [80, "Berwajah Masam", "Er blickte düster", "Dia Bermuka Masam"],
  [81, "Penggulungan", "Das Umschlingen", "Penggulungan"],
  [82, "Terbelah", "Das Zerbrechen", "Terbelah"],
  [83, "Orang-orang yang Curang", "Die das Maß Kürzenden", "Orang yang Curang"],
  [84, "Terbelah", "Das Sichspalten", "Terpecah"],
  [85, "Gugusan Bintang", "Die Türme", "Gugusan Bintang"],
  [86, "Yang Datang pada Malam Hari", "Der Pochende", "Yang Datang pada Waktu Malam"],
  [87, "Yang Mahatinggi", "Der Höchste", "Yang Maha Tinggi"],
  [88, "Hari Kiamat yang Menghilangkan Kesadaran", "Die Überdeckende", "Hari Kiamat yang Menyelubungi"],
  [89, "Fajar", "Die Morgendämmerung", "Fajar"],
  [90, "Negeri", "Die Ortschaft", "Negeri"],
  [91, "Matahari", "Die Sonne", "Matahari"],
  [92, "Malam", "Die Nacht", "Malam"],
  [93, "Duha", "Die Morgenhelle", "Waktu Duha"],
  [94, "Pelapangan", "Das Auftun", "Melapangkan"],
  [95, "Buah Tin", "Die Feige", "Buah Tin"],
  [96, "Segumpal Darah", "Das Anhängsel", "Segumpal Darah"],
  [97, "Al-Qadar", "Die Bestimmung", "Kemuliaan"],
  [98, "Bukti Nyata", "Der klare Beweis", "Bukti yang Nyata"],
  [99, "Guncangan", "Das Beben", "Gempa Bumi"],
  [100, "Kuda Perang yang Berlari Kencang", "Die Rennenden", "Kuda Perang yang Berlari"],
  [101, "Hari Kiamat yang Menggetarkan", "Das Verhängnis", "Hari Kiamat yang Menggemparkan"],
  [102, "Berbangga-bangga dalam Memperbanyak Dunia", "Die Vermehrung", "Bermegah-megah"],
  [103, "Masa", "Das Zeitalter", "Masa"],
  [104, "Pengumpat", "Der Stichler", "Pengumpat"],
  [105, "Gajah", "Der Elefant", "Gajah"],
  [106, "Orang Quraisy", "Qurais", "Kaum Quraisy"],
  [107, "Bantuan", "Die Hilfeleistung", "Barang Keperluan"],
  [108, "Nikmat yang Banyak", "Die Fülle", "Nikmat yang Banyak"],
  [109, "Orang-orang Kafir", "Die Ungläubigen", "Orang Kafir"],
  [110, "Pertolongan", "Die Hilfe", "Pertolongan"],
  [111, "Gejolak Api", "Die Palmfasern", "Tali Sabut"],
  [112, "Ikhlas", "Die Aufrichtigkeit", "Ikhlas"],
  [113, "Fajar", "Der Tagesanbruch", "Waktu Subuh"],
  [114, "Manusia", "Die Menschen", "Manusia"],
] as const;

/** Decodes one complete reviewed supplemental surah-name inventory. */
export const decodeQuranSurahNames = Effect.fn(
  "AksaraCorpus.decodeQuranSurahNames"
)((source: SupplementalNames) =>
  Schema.decodeEffect(SupplementalNamesSchema)(source).pipe(
    Effect.map((rows) =>
      MutableHashMap.fromIterable(
        Arr.map(rows, ([number, id, de, ms]) => [number, { de, id, ms }] as const)
      )
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
