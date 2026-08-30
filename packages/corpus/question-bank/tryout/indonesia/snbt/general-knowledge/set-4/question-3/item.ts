import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "klar und unmittelbar ausgedrückt",
        },
        {
          isCorrect: true,
          label: "fähig, sich an veränderte Bedingungen anzupassen",
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
          label: "dem Umfang des Problems angemessen",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "stated clearly and directly",
        },
        {
          isCorrect: true,
          label: "able to adjust to changing conditions",
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
          label: "appropriate to the scale of the problem",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "dinyatakan secara jelas dan langsung",
        },
        {
          isCorrect: true,
          label: "mampu menyesuaikan diri dengan kondisi yang berubah",
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
          label: "sepadan dengan skala masalah",
        },
      ],
    },
  },
};

export default item;
