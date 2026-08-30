import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "F, E, H, G",
        },
        {
          isCorrect: false,
          label: "E, F, G, H",
        },
        {
          isCorrect: false,
          label: "F, G, E, H",
        },
        {
          isCorrect: false,
          label: "G, F, H, E",
        },
        {
          isCorrect: false,
          label: "H, F, E, G",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "F, E, H, G",
        },
        {
          isCorrect: false,
          label: "E, F, G, H",
        },
        {
          isCorrect: false,
          label: "F, G, E, H",
        },
        {
          isCorrect: false,
          label: "G, F, H, E",
        },
        {
          isCorrect: false,
          label: "H, F, E, G",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "F, E, H, G",
        },
        {
          isCorrect: false,
          label: "E, F, G, H",
        },
        {
          isCorrect: false,
          label: "F, G, E, H",
        },
        {
          isCorrect: false,
          label: "G, F, H, E",
        },
        {
          isCorrect: false,
          label: "H, F, E, G",
        },
      ],
    },
  },
};

export default item;
