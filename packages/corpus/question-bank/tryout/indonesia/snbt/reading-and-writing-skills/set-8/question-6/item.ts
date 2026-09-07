import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Fragekarten waren nachweislich die einzige Ursache des höheren Mittelwerts.",
        },
        {
          isCorrect: false,
          label: "Alle Besuchenden verbesserten sich im selben Umfang.",
        },
        {
          isCorrect: false,
          label: "Ausgangs- und Vergleichswert waren gleich.",
        },
        {
          isCorrect: false,
          label:
            "Der Versuch belegte das langfristige Ergebnis für alle Laborführungen.",
        },
        {
          isCorrect: true,
          label:
            "Der Mittelwert fragender Besuchender lag im Versuch über dem Ausgangs- und dem Vergleichswert.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Question cards were proved to be the sole cause of the higher mean.",
        },
        {
          isCorrect: false,
          label: "Every visitor improved by the same amount.",
        },
        {
          isCorrect: false,
          label: "The baseline and comparison means were identical.",
        },
        {
          isCorrect: false,
          label:
            "The trial established the long-term result for every laboratory tour.",
        },
        {
          isCorrect: true,
          label:
            "The trial mean for visitors asking a question exceeded the baseline and comparison means.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Kartu pertanyaan terbukti menjadi satu-satunya penyebab rata-rata yang lebih tinggi.",
        },
        {
          isCorrect: false,
          label: "Setiap pengunjung mengalami peningkatan yang sama.",
        },
        {
          isCorrect: false,
          label: "Rata-rata awal dan pembanding sama.",
        },
        {
          isCorrect: false,
          label:
            "Uji tersebut menetapkan hasil jangka panjang untuk seluruh tur laboratorium.",
        },
        {
          isCorrect: true,
          label:
            "Rata-rata pengunjung yang bertanya pada sesi uji melebihi rata-rata awal dan pembanding.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
