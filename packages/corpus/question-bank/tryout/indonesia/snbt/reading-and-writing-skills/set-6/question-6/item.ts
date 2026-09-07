import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Die mittlere Zahl abgeschlossener Rundgänge lag im Versuch über dem Ausgangs- und dem Vergleichswert.",
        },
        {
          isCorrect: false,
          label:
            "Pfeile waren nachweislich die einzige Ursache des höheren Mittelwerts.",
        },
        {
          isCorrect: false,
          label: "Jede besuchende Person verbesserte sich im selben Umfang.",
        },
        {
          isCorrect: false,
          label: "Ausgangs- und Vergleichswert waren gleich.",
        },
        {
          isCorrect: false,
          label:
            "Der Versuch belegte das langfristige Ergebnis für alle Ausstellungen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Mean route completion in trial sessions exceeded both the baseline and comparison means.",
        },
        {
          isCorrect: false,
          label:
            "Arrows were proved to be the sole cause of the higher completion mean.",
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
            "The trial established the long-term result for every exhibition.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Rata-rata penyelesaian rute pada sesi uji lebih tinggi daripada rata-rata awal dan pembanding.",
        },
        {
          isCorrect: false,
          label:
            "Panah terbukti menjadi satu-satunya penyebab rata-rata penyelesaian yang lebih tinggi.",
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
            "Uji tersebut menetapkan hasil jangka panjang untuk semua pameran.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
