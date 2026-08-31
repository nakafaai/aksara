import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$P < Q$$",
        },
        {
          isCorrect: false,
          label: "$$P = Q$$",
        },
        {
          isCorrect: false,
          label: "$$PQ = 32$$",
        },
        {
          isCorrect: false,
          label: "Kann nicht bestimmt werden",
        },
        {
          isCorrect: true,
          label: "$$P > Q$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$P < Q$$",
        },
        {
          isCorrect: false,
          label: "$$P = Q$$",
        },
        {
          isCorrect: false,
          label: "$$PQ = 32$$",
        },
        {
          isCorrect: false,
          label: "Cannot be determined",
        },
        {
          isCorrect: true,
          label: "$$P > Q$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$P < Q$$",
        },
        {
          isCorrect: false,
          label: "$$P = Q$$",
        },
        {
          isCorrect: false,
          label: "$$PQ = 32$$",
        },
        {
          isCorrect: false,
          label: "Tidak dapat ditentukan",
        },
        {
          isCorrect: true,
          label: "$$P > Q$$",
        },
      ],
    },
  },
};

export default item;
