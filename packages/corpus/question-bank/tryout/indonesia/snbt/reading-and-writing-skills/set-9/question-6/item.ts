import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Etiketten waren nachweislich die einzige Ursache des höheren Werts.",
        },
        {
          isCorrect: false,
          label: "Alle Helfenden verbesserten sich im selben Umfang.",
        },
        {
          isCorrect: false,
          label: "Ausgangs- und Vergleichswert waren gleich.",
        },
        {
          isCorrect: false,
          label:
            "Der Versuch belegte das langfristige Ergebnis für alle Baumschulen.",
        },
        {
          isCorrect: true,
          label:
            "Der Versuchswert ohne Umleitung angekommener Setzlinge lag über dem Ausgangs- und dem Vergleichswert.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Labels were proved to be the sole cause of the higher value.",
        },
        {
          isCorrect: false,
          label: "Every volunteer improved by the same amount.",
        },
        {
          isCorrect: false,
          label: "The baseline and comparison values were identical.",
        },
        {
          isCorrect: false,
          label:
            "The trial established the long-term result for every nursery.",
        },
        {
          isCorrect: true,
          label:
            "The trial value for seedlings arriving without redirection exceeded the baseline and comparison values.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Label terbukti menjadi satu-satunya penyebab nilai yang lebih tinggi.",
        },
        {
          isCorrect: false,
          label: "Setiap relawan mengalami peningkatan yang sama.",
        },
        {
          isCorrect: false,
          label: "Nilai awal dan pembanding sama.",
        },
        {
          isCorrect: false,
          label:
            "Uji tersebut menetapkan hasil jangka panjang untuk seluruh pembibitan.",
        },
        {
          isCorrect: true,
          label:
            "Nilai bibit yang sampai tanpa dialihkan pada hari uji melebihi nilai awal dan pembanding.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
