/** One range of a text whose numbers stay text. */
export interface TextSpan {
  readonly end: number;
  readonly start: number;
}

/** Month names and unambiguous abbreviations in id, en, de, and ms. */
const MONTH =
  "(?:Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember|January|February|March|May|June|July|August|October|December|Januar|Februar|März|Mai|Dezember|Mac|Julai|Ogos|Disember|Jan|Feb|Apr|Jun|Jul|Agu|Agt|Ags|Aug|Sept|Sep|Okt|Oct|Nov|Des|Dec|Dez)\\.?(?![\\p{L}])";

/**
 * The words that name a document part, an exam, or a course stage, so the
 * number after them is a label: `Soal 3`, `Kelas 10`, `Step 2`, `Klasse 9`,
 * `Bab 4`, `Gambar 1`, `persamaan (2)`. A count before a noun (`3 soal`)
 * stays a quantity.
 */
const LABEL =
  "(?:set|paket|soal|soalan|nomor|nombor|no\\.|nr\\.|bab|subbab|kelas|tingkatan|darjah|tingkat|fase|semester|langkah|tahap|contoh|latihan|bagian|bahagian|gambar|rajah|tabel|jadual|grafik|diagram|persamaan|teorema|definisi|lemma|sifat|kasus|kes|cara|metode|kaedah|sesi|modul|pernyataan|opsi|pilihan|versi|kurikulum|halaman|ayat|surah|surat|qs|juz|pasal|level|unit|pertanyaan|kegiatan|aktivitas|aktiviti|eksperimen|percobaan|questions?|chapters?|grades?|steps?|examples?|exercises?|parts?|sections?|figures?|fig\\.|tables?|equations?|theorems?|definitions?|propert(?:y|ies)|cases?|methods?|sessions?|modules?|statements?|options?|versions?|curriculum|pages?|verses?|activit(?:y|ies)|lessons?|problems?|tasks?|items?|stages?|phases?|aufgaben?|fragen?|kapitel|klassen?|jahrgangsstufen?|stufen?|schritte?|beispiele?|übung(?:en)?|teile?|abschnitte?|abbildung(?:en)?|abb\\.|tabellen?|gleichung(?:en)?|satz|sätze|eigenschaft(?:en)?|fall|fälle|methoden?|sitzung(?:en)?|aussagen?|seiten?|verse|lektion(?:en)?|aktivität(?:en)?|pasal|artikel|articles?|absatz|absätze|paragraphs?|paragraf|perkara|verfahren|putusan|lösung(?:en)?|pembahasan|penyelesaian|jawaban|jawapan|solutions?|answers?|antwort(?:en)?|hinweis|petunjuk|hints?|kumpulan|kelompok|groups?|gruppen?|uu|perpres|permendikbud|pkpu|tap mpr)";

/**
 * The German nouns that close a compound label, so `Einordnungsaufgabe 1` and
 * `Übungsbeispiel 2` are labels like `Aufgabe 1` and `Beispiel 2`.
 */
const COMPOUND =
  "(?:aufgaben?|fragen?|beispiele?|übung(?:en)?|gleichung(?:en)?|abbildung(?:en)?|tabellen?)";

/** One label word, alone or as the end of a German compound. */
const LABEL_WORD = `(?:${LABEL}|\\p{L}+${COMPOUND})`;

/**
 * One label number: `3`, `4.1`, `2b`, `1(2)`, `(2)`, or a primed equation
 * label such as `(2')`.
 */
const LABEL_ITEM =
  "(?:\\(\\d+['′]{0,2}\\)|\\d+(?:\\.\\d+)*[a-z]?(?:\\(\\d+\\))*)";

/**
 * A label number with its range or list: `1–5`, `1 sampai 5`, `1 dan 2`, or
 * `1, 2, dan 3`. A comma joins only a list that a conjunction closes, so a
 * quantity after a label and a comma stays a quantity.
 */
const LABEL_NUMBER = `${LABEL_ITEM}(?:(?:\\s*,\\s*${LABEL_ITEM})*\\s*,?\\s+(?:dan|atau|serta|and|or|und|oder)\\s+${LABEL_ITEM}|\\s*(?:[-–]|\\s(?:bis|to|sampai|hingga|s/d)\\s)\\s*${LABEL_ITEM})?`;

/**
 * Patterns whose numbers stay text: dates, years, document and exam labels,
 * list and citation markers, and dotted section numbers.
 */
const TEXT_PATTERNS = [
  // 13 November 2026, 13. November, 1–3 Mei 2026
  new RegExp(
    `\\d{1,2}(?:\\s*[-–]\\s*\\d{1,2})?\\.?\\s+${MONTH}(?:\\s+\\d{4})?`,
    "gu"
  ),
  // November 13, 2026 and November 2026
  new RegExp(`${MONTH}\\s+\\d{1,4}(?:,\\s*\\d{4})?`, "gu"),
  // 13/11/2026, 13.11.2026, 2026-11-13
  /\d{1,2}[./-]\d{1,2}[./-]\d{2,4}|\d{4}-\d{2}-\d{2}/gu,
  // 1945 M, 300 SM, 44 BC, AD 79, 1445 H
  /\d{1,4}\s*(?:M|SM|Masehi|BC|BCE|AD|CE|H|v\. Chr\.|n\. Chr\.)(?![\p{L}])|\bAD\s+\d{1,4}/gu,
  // abad ke-19, abad 19, 19. Jahrhundert, 19th century
  /abad\s+(?:ke-)?\d{1,2}|\d{1,2}\.\s*Jahrhundert/giu,
  // Soal 3, Kelas 10, Langkah 1 dan 2, Gleichung (2), Bab 4.1
  new RegExp(
    `(?<![\\p{L}])${LABEL_WORD}\\s*(?:(?:nomor|no\\.|nr\\.|ke-)\\s*)?${LABEL_NUMBER}(?!\\s?%)`,
    "giu"
  ),
  // Soal identifikasi 4, Punca bagi soalan pengembangan 3: a whole text that titles one item
  new RegExp(
    `^(?:[\\p{L}-]+\\s+){0,3}${LABEL_WORD}(?:\\s+[\\p{L}-]+){1,3}\\s+${LABEL_NUMBER}$`,
    "giu"
  ),
  // Python 3.6, ES2020 parts, HTML5 parts, Android 14: software versions
  /(?:Python|Java|JavaScript|ECMAScript|TypeScript|HTML|CSS|Node(?:\.js)?|NumPy|pandas|PHP|Ubuntu|Windows|macOS|iOS|Android|Excel|Unicode|Bluetooth|Wi-Fi|USB)\s*v?\d+(?:\.\d+)*/gu,
  // Law Number 39, Nummer 4, Nr. 3
  /(?:Number|Nummer|Nr\.)\s*\d+/gu,
  // (1), (2'), [12], and (2019) markers and citations
  /(?<![\p{L}\p{N}])\(\d{1,2}['′]{0,2}\)|\[\d{1,3}(?:[,–-]\s*\d{1,3})*\]|\(\p{L}[^()]*?,?\s*\d{4}[a-z]?\)|\(\d{4}[a-z]?\)/gu,
  // 1.2 or 2.3.1 section numbers that open a title, not 10.00 g of zinc
  /^\s*\d+(?:\.\d+)+(?=\s+\p{Lu})/gu,
];

/** Returns every range of one text whose numbers stay text. */
export function textSpans(text: string): TextSpan[] {
  return TEXT_PATTERNS.flatMap((pattern) =>
    [...text.matchAll(pattern)].map((match) => ({
      end: match.index + match[0].length,
      start: match.index,
    }))
  );
}
