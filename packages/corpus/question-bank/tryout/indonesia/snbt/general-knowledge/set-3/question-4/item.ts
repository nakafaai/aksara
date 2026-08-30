import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "durch verlässliche Belege gestützt",
        },
        {
          isCorrect: true,
          label: "klar und unmittelbar ausgedrückt",
        },
        {
          isCorrect: false,
          label: "fähig, sich an veränderte Bedingungen anzupassen",
        },
        {
          isCorrect: false,
          label: "dem Umfang des Problems angemessen",
        },
        {
          isCorrect: false,
          label: "deutlich genug, um beachtet zu werden",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "supported by dependable evidence",
        },
        {
          isCorrect: true,
          label: "stated clearly and directly",
        },
        {
          isCorrect: false,
          label: "able to adjust to changing conditions",
        },
        {
          isCorrect: false,
          label: "appropriate to the scale of the problem",
        },
        {
          isCorrect: false,
          label: "large or important enough to deserve attention",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "didukung oleh bukti yang dapat dipercaya",
        },
        {
          isCorrect: true,
          label: "dinyatakan secara jelas dan langsung",
        },
        {
          isCorrect: false,
          label: "mampu menyesuaikan diri dengan kondisi yang berubah",
        },
        {
          isCorrect: false,
          label: "sepadan dengan skala masalah",
        },
        {
          isCorrect: false,
          label: "cukup besar atau penting untuk diperhatikan",
        },
      ],
    },
  },
};

export default item;
