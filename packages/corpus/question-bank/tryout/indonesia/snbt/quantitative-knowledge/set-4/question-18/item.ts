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
          isCorrect: true,
          label: "$$P < Q$$",
        },
        {
          isCorrect: false,
          label: "$$P = 2Q$$",
        },
        {
          isCorrect: false,
          label: "Kann nicht bestimmt werden",
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
          isCorrect: true,
          label: "$$P < Q$$",
        },
        {
          isCorrect: false,
          label: "$$P = 2Q$$",
        },
        {
          isCorrect: false,
          label: "Cannot be determined",
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
          isCorrect: true,
          label: "$$P < Q$$",
        },
        {
          isCorrect: false,
          label: "$$P = 2Q$$",
        },
        {
          isCorrect: false,
          label: "Tidak dapat ditentukan",
        },
      ],
    },
  },
};

export default item;
