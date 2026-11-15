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
  "(?:set|paket|soal|soalan|nomor|nombor|no\\.|nr\\.|bab|subbab|kelas|years?|tingkatan|darjah|tingkat|fase|semester|langkah|tahap|contoh|latihan|bagian|bahagian|gambar|rajah|tabel|jadual|grafik|diagram|persamaan|teorema|definisi|lemma|sifat|kasus|kes|cara|metode|kaedah|sesi|modul|pernyataan|opsi|pilihan|versi|kurikulum|halaman|ayat|surah|surat|qs|juz|pasal|level|unit|pertanyaan|kegiatan|aktivitas|aktiviti|eksperimen|percobaan|questions?|chapters?|grades?|steps?|examples?|exercises?|parts?|sections?|figures?|fig\\.|tables?|equations?|theorems?|definitions?|propert(?:y|ies)|cases?|methods?|sessions?|modules?|statements?|options?|versions?|curriculum|pages?|verses?|activit(?:y|ies)|lessons?|problems?|tasks?|items?|stages?|phases?|aufgaben?|fragen?|kapitel|klassen?|jahrgangsstufen?|stufen?|schritte?|beispiele?|übung(?:en)?|teile?|abschnitte?|abbildung(?:en)?|abb\\.|tabellen?|gleichung(?:en)?|satz|sätze|eigenschaft(?:en)?|fall|fälle|methoden?|sitzung(?:en)?|aussagen?|seiten?|verse|lektion(?:en)?|aktivität(?:en)?|pasal|artikel|articles?|absatz|absätzen?|paragraphs?|paragraf|perkara|verfahren|putusan|lösung(?:en)?|pembahasan|penyelesaian|jawaban|jawapan|solutions?|answers?|antwort(?:en)?|hinweis|petunjuk|hints?|kumpulan|kelompok|groups?|gruppen?|uu|perpres|permendikbud|pkpu|tap mpr)";

/**
 * The words that name a numbered reference an item or a solution points back
 * to, so `syarat 1`, `rule 2`, `Bedingung 3`, `Teks 2`, `Angabe 4`, and
 * `Simpulan 2` are labels like `Soal 3`.
 */
const REFERENCE =
  "(?:syarat|ketentuan|aturan|peraturan|keterangan|premis|fakta|kalimat|perenggan|petikan|teks|keadaan|rules?|conditions?|premises?|facts?|clues?|sentences?|text(?:e|s)?|passages?|regeln?|bedingung(?:en)?|angaben?|prämissen?|fakten|hinweise|simpulan|kesimpulan|conclusions?|schluss|schlüsse|susunan|orders?|arrangements?|reihenfolgen?|anordnung(?:en)?|kemungkinan|possibilit(?:y|ies)|möglichkeit(?:en)?|tindakan|actions?|handlung(?:en)?|ciri|features?|merkmale?|situations?|lage|assignments?|einteilung(?:en)?|bernomor|numbered|nummeriert)";

/**
 * The words that name one numbered place or slot, so the number is its name,
 * not a count: a running lane (`jalur 3`, `lane 3`, `Bahn 3`, `lorong 3`), a
 * floor, a seat, a box, a plot, a stand, a turn, a figure of a pattern, a
 * socket such as `AUX 2`, or a state school such as `SMA Negeri 2`.
 * A count before the noun (`3 kursi`) stays a quantity, and the bare ordinal
 * `ke-3` stays math.
 */
const PLACE =
  "(?:lanes?|jalur|lintasan|lajur|lorong|bahn(?:en)?|floors?|lantai|stockwerke?|etagen?|kursi|kerusi|chairs?|seats?|stuhl|stühle|kotak|box(?:es)?|kisten?|petak|parzellen?|plots?|meja|stand|stände|stalls?|booths?|platz|plätzen?|places?|columns?|spalten?|kolom|bus|buses|busse|parcels?|pakete?|juri|judges?|juroren|golongan|urutan|giliran|turns?|rounds?|runden?|patterns?|muster|pola|figur(?:en)?|aux|negeri)";

/**
 * The German nouns that close a compound label, so `Einordnungsaufgabe 1` and
 * `Übungsbeispiel 2` are labels like `Aufgabe 1` and `Beispiel 2`.
 */
const COMPOUND =
  "(?:aufgaben?|fragen?|beispiele?|übung(?:en)?|gleichung(?:en)?|abbildung(?:en)?|tabellen?)";

/** One label word, alone or as the end of a German compound. */
const LABEL_WORD = `(?:${LABEL}|${REFERENCE}|${PLACE}|\\p{L}+${COMPOUND})`;

/**
 * One label number: `3`, `4.1`, `2b`, `1(2)`, `(2)`, a primed equation label
 * such as `(2')`, or an ordinal that continues a labelled range, as in
 * `urutan ke-1 sampai ke-6`.
 */
const LABEL_ITEM =
  "(?:\\(\\d+['′]{0,2}\\)|(?:ke-)?\\d+(?:\\.\\d+)*[a-z]?(?:\\(\\d+\\))*)";

/**
 * A label number with its range or list: `1–5`, `1 sampai 5`, `1 dan 2`, or
 * `1, 2, dan 3`. A comma joins only a list that a conjunction closes, so a
 * quantity after a label and a comma stays a quantity.
 */
const LABEL_NUMBER = `${LABEL_ITEM}(?:(?:\\s*,\\s*${LABEL_ITEM})*\\s*,?\\s+(?:dan|atau|serta|and|or|und|oder)\\s+${LABEL_ITEM}|\\s*(?:[-–]|\\s(?:bis|to|sampai|hingga|s/d)\\s)\\s*${LABEL_ITEM})?`;

/** An hour of the clock, with or without its minutes: `6`, `18`, `6:30`, `6.30`. */
const CLOCK = "(?:[01]?\\d|2[0-4])(?:[.:][0-5]\\d)?";

/** A clock time with its minutes: `6:30`, `06.30`, `18:45`. */
const CLOCK_MINUTES = "(?:[01]?\\d|2[0-4])[.:][0-5]\\d";

/** The words that join the two ends of a time range. */
const CLOCK_RANGE =
  "\\s*(?:[-–]|\\s(?:bis|hingga|sampai|to|until|till)\\s)\\s*";

/**
 * Patterns whose numbers stay text: dates, years, clock times, document and
 * exam labels, numbered references and places, list and citation markers, and
 * dotted section numbers.
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
  // pukul 6, pukul 6:30, jam 8.00 sampai 9.00: a time its clock word names;
  // jam also follows a count (7 jam), so after jam the minutes are required
  new RegExp(
    `(?<![\\p{L}])(?:pukul\\s+${CLOCK}|jam\\s+${CLOCK_MINUTES})(?:${CLOCK_RANGE}${CLOCK})?`,
    "giu"
  ),
  // 18 Uhr, 6:30 Uhr, 7 a.m., 6 bis 18 Uhr: an hour with or without minutes
  new RegExp(
    `(?<![\\p{N}.,:])${CLOCK}(?:${CLOCK_RANGE}${CLOCK})?\\s*(?:Uhr|a\\.m\\.|p\\.m\\.|o'clock)(?![\\p{L}])`,
    "gu"
  ),
  // 6:00 pagi, 6:20 hingga 6:25 pagi, 6:00 petang, 7:30 pm: these clock words
  // also follow a count (3 malam is three nights), so the minutes are required
  new RegExp(
    `(?<![\\p{N}.,:])${CLOCK_MINUTES}(?:${CLOCK_RANGE}${CLOCK_MINUTES})?\\s*(?:pagi|siang|sore|petang|malam|subuh|am|pm|WIB|WITA|WIT)(?![\\p{L}])`,
    "giu"
  ),
  // abad ke-19, abad 19, 19. Jahrhundert, 19th century
  /abad\s+(?:ke-)?\d{1,2}|\d{1,2}\.\s*Jahrhundert/giu,
  // Soal 3, Kelas 10, Langkah 1 dan 2, Gleichung (2), Bab 4.1
  new RegExp(
    `(?<![\\p{L}])${LABEL_WORD}\\s*(?:(?:nomor|no\\.|nr\\.|ke-)\\s*)?${LABEL_NUMBER}(?![\\d.,]?\\d|\\s?%)`,
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
