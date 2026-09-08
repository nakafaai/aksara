import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die neuen Symbole verursachten nachweislich den höheren Versuchsmittelwert.",
        },
        {
          isCorrect: false,
          label: "Alle Teilnehmenden verbesserten sich um denselben Betrag.",
        },
        {
          isCorrect: false,
          label: "Der kurze Versuch belegte das langfristige Ergebnis.",
        },
        {
          isCorrect: false,
          label: "Der Ausgangs- und der Vergleichsmittelwert waren gleich.",
        },
        {
          isCorrect: true,
          label:
            "Der Versuchsmittelwert lag über dem Ausgangs- und dem Vergleichsmittelwert.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The new symbols were proved to cause the higher trial mean.",
        },
        {
          isCorrect: false,
          label: "Every participant improved by the same amount.",
        },
        {
          isCorrect: false,
          label: "The short trial established the long-term result.",
        },
        {
          isCorrect: false,
          label: "The baseline and comparison means were identical.",
        },
        {
          isCorrect: true,
          label:
            "The trial mean exceeded both the baseline and comparison means.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Simbol baru terbukti menyebabkan rata-rata hasil uji yang lebih tinggi.",
        },
        {
          isCorrect: false,
          label: "Setiap peserta mengalami peningkatan yang sama.",
        },
        {
          isCorrect: false,
          label: "Uji singkat tersebut membuktikan hasil jangka panjang.",
        },
        {
          isCorrect: false,
          label: "Rata-rata awal dan rata-rata pembanding sama.",
        },
        {
          isCorrect: true,
          label:
            "Rata-rata hasil uji lebih tinggi daripada rata-rata awal dan pembanding.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
