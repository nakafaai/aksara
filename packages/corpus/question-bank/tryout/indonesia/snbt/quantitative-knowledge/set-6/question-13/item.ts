import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$P > Q$$",
        },
        {
          isCorrect: false,
          label: "$$P = Q$$",
        },
        {
          isCorrect: false,
          label: "$$P + Q = 3$$",
        },
        {
          isCorrect: false,
          label: "Kann nicht ermittelt werden.",
        },
        {
          isCorrect: true,
          label: "$$P < Q$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$P > Q$$",
        },
        {
          isCorrect: false,
          label: "$$P = Q$$",
        },
        {
          isCorrect: false,
          label: "$$P + Q = 3$$",
        },
        {
          isCorrect: false,
          label: "Cannot be determined.",
        },
        {
          isCorrect: true,
          label: "$$P < Q$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$P > Q$$",
        },
        {
          isCorrect: false,
          label: "$$P = Q$$",
        },
        {
          isCorrect: false,
          label: "$$P + Q = 3$$",
        },
        {
          isCorrect: false,
          label: "Tidak dapat ditentukan.",
        },
        {
          isCorrect: true,
          label: "$$P < Q$$",
        },
      ],
    },
  },
};

export default item;
