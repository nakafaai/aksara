import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Zutatenordnung machte die Zählung rechtzeitig fertiger Gerichte überflüssig.",
        },
        {
          isCorrect: false,
          label:
            "Die Zutatenordnung erlaubte die gleichzeitige Änderung mehrerer Kursmerkmale.",
        },
        {
          isCorrect: false,
          label:
            "Die Anordnung wurde gewählt, weil bereits alle Vergleichswerte nachweislich gleich waren.",
        },
        {
          isCorrect: true,
          label:
            "Zutaten nach Rezeptschritten zu ordnen könnte die Suche beim Wechsel zum nächsten Schritt verkürzen.",
        },
        {
          isCorrect: false,
          label:
            "Die Anordnung wurde gewählt, weil das endgültige Testergebnis bereits feststand.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Grouping ingredients made it unnecessary to count dishes finished before the deadline.",
        },
        {
          isCorrect: false,
          label:
            "Grouping ingredients allowed several class features to change at once.",
        },
        {
          isCorrect: false,
          label:
            "The layout was chosen because all comparison values had proved equal.",
        },
        {
          isCorrect: true,
          label:
            "Grouping ingredients by recipe stage could shorten the search when groups moved to the next stage.",
        },
        {
          isCorrect: false,
          label:
            "The layout was chosen because the final test result was already certain.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pengelompokan bahan membuat penyelesaian hidangan sebelum batas waktu tidak perlu diukur.",
        },
        {
          isCorrect: false,
          label:
            "Pengelompokan bahan memungkinkan beberapa unsur kelas diubah sekaligus.",
        },
        {
          isCorrect: false,
          label:
            "Pengelompokan bahan dipilih karena semua nilai pembanding sudah terbukti sama.",
        },
        {
          isCorrect: true,
          label:
            "Pengelompokan bahan menurut tahap resep dapat mempersingkat pencarian saat kelompok berpindah tahap.",
        },
        {
          isCorrect: false,
          label:
            "Pengelompokan bahan dipilih karena hasil akhir pengujiannya sudah pasti.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
