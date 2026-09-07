import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Fotoetiketten verursachten nachweislich den höheren Mittelwert der richtigen Rückgaben.",
        },
        {
          isCorrect: false,
          label: "Alle Ausleihenden verbesserten sich um denselben Wert.",
        },
        {
          isCorrect: true,
          label:
            "Die mittlere Zahl richtiger Rückgaben lag im Versuch über dem Ausgangs- und Vergleichswert.",
        },
        {
          isCorrect: false,
          label: "Ausgangs- und Vergleichsmittelwert waren identisch.",
        },
        {
          isCorrect: false,
          label: "Der kurze Versuch belegte das langfristige Ergebnis.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Photo labels were proved to cause the higher mean number of correct returns.",
        },
        {
          isCorrect: false,
          label: "Every borrower improved by the same amount.",
        },
        {
          isCorrect: true,
          label:
            "The mean number of correct returns in trial sessions exceeded the baseline and comparison means.",
        },
        {
          isCorrect: false,
          label: "The baseline and comparison means were identical.",
        },
        {
          isCorrect: false,
          label: "The short trial established the long-term result.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Label foto terbukti menyebabkan kenaikan rata-rata alat yang dikembalikan dengan tepat.",
        },
        {
          isCorrect: false,
          label: "Setiap peminjam mengalami peningkatan yang sama.",
        },
        {
          isCorrect: true,
          label:
            "Rata-rata pengembalian yang tepat pada sesi uji melebihi rata-rata awal dan sesi pembanding.",
        },
        {
          isCorrect: false,
          label: "Rata-rata awal dan rata-rata sesi pembanding sama.",
        },
        {
          isCorrect: false,
          label: "Uji singkat memastikan hasil jangka panjang.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
