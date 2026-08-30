import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "nach denselben Grundsätzen ohne Widerspruch",
        },
        {
          isCorrect: false,
          label: "für mehr als eine Deutung offen",
        },
        {
          isCorrect: false,
          label: "durch verlässliche Belege gestützt",
        },
        {
          isCorrect: false,
          label: "fähig, sich an veränderte Bedingungen anzupassen",
        },
        {
          isCorrect: false,
          label: "dem Umfang des Problems angemessen",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "following the same principles without contradiction",
        },
        {
          isCorrect: false,
          label: "open to more than one interpretation",
        },
        {
          isCorrect: false,
          label: "supported by dependable evidence",
        },
        {
          isCorrect: false,
          label: "able to adjust to changing conditions",
        },
        {
          isCorrect: false,
          label: "appropriate to the scale of the problem",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "mengikuti prinsip yang sama tanpa pertentangan",
        },
        {
          isCorrect: false,
          label: "terbuka terhadap lebih dari satu penafsiran",
        },
        {
          isCorrect: false,
          label: "didukung oleh bukti yang dapat dipercaya",
        },
        {
          isCorrect: false,
          label: "mampu menyesuaikan diri dengan kondisi yang berubah",
        },
        {
          isCorrect: false,
          label: "sepadan dengan skala masalah",
        },
      ],
    },
  },
};

export default item;
