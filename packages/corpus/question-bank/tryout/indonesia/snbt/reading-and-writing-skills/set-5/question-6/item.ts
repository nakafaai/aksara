import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Beispielfotos waren nachweislich die einzige Ursache der höheren mittleren Übereinstimmung.",
        },
        {
          isCorrect: false,
          label:
            "Jedes Beobachtungspaar verbesserte seine Übereinstimmung im selben Umfang.",
        },
        {
          isCorrect: false,
          label: "Ausgangs- und Vergleichswert waren gleich.",
        },
        {
          isCorrect: false,
          label:
            "Der Versuch belegte die langfristige Höhe der Übereinstimmung.",
        },
        {
          isCorrect: true,
          label:
            "Die mittlere Übereinstimmung lag im Versuch über dem Ausgangs- und dem Vergleichswert.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Sample photographs were proved to be the sole cause of the higher mean agreement.",
        },
        {
          isCorrect: false,
          label:
            "Every observer pair improved its agreement by the same amount.",
        },
        {
          isCorrect: false,
          label: "The baseline and comparison means were identical.",
        },
        {
          isCorrect: false,
          label: "The trial established the long-term level of agreement.",
        },
        {
          isCorrect: true,
          label:
            "Mean agreement in trial sessions exceeded both the baseline and comparison means.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Contoh foto terbukti menjadi satu-satunya penyebab rata-rata kesepakatan yang lebih tinggi.",
        },
        {
          isCorrect: false,
          label:
            "Setiap pasangan pencatat mengalami peningkatan kesepakatan yang sama.",
        },
        {
          isCorrect: false,
          label: "Nilai awal dan nilai sesi pembanding sama.",
        },
        {
          isCorrect: false,
          label: "Uji tersebut menetapkan tingkat kesepakatan jangka panjang.",
        },
        {
          isCorrect: true,
          label:
            "Rata-rata kesepakatan pada sesi uji lebih tinggi daripada nilai awal dan nilai sesi pembanding.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
