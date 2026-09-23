import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Zwei Vorschläge lösen eine Debatte über Authentizität aus, und die Materialprüfung führt zum minimalen Eingriff.",
        },
        {
          isCorrect: false,
          label:
            "Der erste Teil wählt ein Bezugsjahr, der folgende bestimmt eine Einheitsfarbe zur Wiederherstellung dieses Zustands.",
        },
        {
          isCorrect: false,
          label:
            "Der erste Teil entscheidet sich für vollständigen Ersatz, der folgende erstellt nur Unterlagen zur Rechtfertigung.",
        },
        {
          isCorrect: false,
          label:
            "Der erste Teil behandelt Belege mehrerer Zeiten, der folgende lehnt Materialprüfungen ab, weil Fotos genügen.",
        },
        {
          isCorrect: false,
          label:
            "Der erste Teil bewertet die Attraktivität für Besucher, der folgende bestimmt die Reparaturen durch eine Abstimmung.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Two proposals raise a debate about authenticity, and material investigation guides the minimum-intervention choice.",
        },
        {
          isCorrect: false,
          label:
            "The first part selects a reference year, and the later part chooses one colour to restore that year’s appearance.",
        },
        {
          isCorrect: false,
          label:
            "The first part chooses total replacement, and the later part merely prepares records to justify that decision.",
        },
        {
          isCorrect: false,
          label:
            "The first part discusses evidence from several periods, and the later part rejects material testing as photographs suffice.",
        },
        {
          isCorrect: false,
          label:
            "The first part assesses visitor appeal, and the later part determines repairs through a public vote.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Dua usulan memunculkan perdebatan tentang keaslian, lalu pemeriksaan material mengarahkan pilihan intervensi minimum.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menetapkan satu tahun acuan, lalu bagian berikutnya memilih warna seragam untuk mengembalikan keadaan tahun itu.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal memilih penggantian menyeluruh, lalu bagian berikutnya hanya menyusun catatan untuk membenarkan keputusan tersebut.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal membahas bukti beberapa masa, lalu bagian berikutnya menolak pemeriksaan material karena foto dianggap sudah cukup.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menilai daya tarik bangunan bagi pengunjung, lalu bagian berikutnya menentukan perbaikan melalui pemungutan suara.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
