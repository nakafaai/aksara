import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Zutatenordnung war nachweislich die einzige Ursache des höheren Werts.",
        },
        {
          isCorrect: true,
          label:
            "Der Versuchswert rechtzeitig fertiger Gruppen lag über dem Ausgangs- und dem Vergleichswert.",
        },
        {
          isCorrect: false,
          label: "Alle Teilnehmenden verbesserten sich im selben Umfang.",
        },
        {
          isCorrect: false,
          label: "Ausgangs- und Vergleichswert waren gleich.",
        },
        {
          isCorrect: false,
          label:
            "Der kurze Versuch belegte das langfristige Ergebnis für alle Kochkurse.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The ingredient layout was proved to be the sole cause of the higher value.",
        },
        {
          isCorrect: true,
          label:
            "The trial value for groups finishing before the deadline exceeded the baseline and comparison values.",
        },
        {
          isCorrect: false,
          label: "Every participant improved by the same amount.",
        },
        {
          isCorrect: false,
          label: "The baseline and comparison values were identical.",
        },
        {
          isCorrect: false,
          label:
            "The short trial established the long-term result for every cooking class.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Susunan bahan terbukti menjadi satu-satunya penyebab nilai yang lebih tinggi.",
        },
        {
          isCorrect: true,
          label:
            "Nilai kelompok yang selesai sebelum batas waktu pada pertemuan uji melebihi nilai awal dan pembanding.",
        },
        {
          isCorrect: false,
          label: "Setiap peserta mengalami peningkatan yang sama.",
        },
        {
          isCorrect: false,
          label: "Nilai awal dan pembanding sama.",
        },
        {
          isCorrect: false,
          label:
            "Uji singkat itu menetapkan hasil jangka panjang bagi semua kelas memasak.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
