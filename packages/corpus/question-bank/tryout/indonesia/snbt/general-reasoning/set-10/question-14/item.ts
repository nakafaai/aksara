import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "H, D, B, F",
        },
        {
          isCorrect: false,
          label: "B, D, F, H",
        },
        {
          isCorrect: false,
          label: "D, F, B, H",
        },
        {
          isCorrect: false,
          label: "F, D, H, B",
        },
        {
          isCorrect: true,
          label: "D, B, H, F",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "H, D, B, F",
        },
        {
          isCorrect: false,
          label: "B, D, F, H",
        },
        {
          isCorrect: false,
          label: "D, F, B, H",
        },
        {
          isCorrect: false,
          label: "F, D, H, B",
        },
        {
          isCorrect: true,
          label: "D, B, H, F",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "H, D, B, F",
        },
        {
          isCorrect: false,
          label: "B, D, F, H",
        },
        {
          isCorrect: false,
          label: "D, F, B, H",
        },
        {
          isCorrect: false,
          label: "F, D, H, B",
        },
        {
          isCorrect: true,
          label: "D, B, H, F",
        },
      ],
    },
  },
};

export default item;
