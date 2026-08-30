import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
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
          isCorrect: true,
          label:
            "nachweislich aus der angegebenen Quelle oder Erfahrung stammend",
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
          isCorrect: true,
          label: "genuinely originating from the stated source or experience",
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
          isCorrect: true,
          label:
            "benar-benar berasal dari sumber atau pengalaman yang dinyatakan",
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
