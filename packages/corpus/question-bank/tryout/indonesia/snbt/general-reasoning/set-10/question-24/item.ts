import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "J, E, C, G",
        },
        {
          isCorrect: false,
          label: "C, E, G, J",
        },
        {
          isCorrect: false,
          label: "E, G, C, J",
        },
        {
          isCorrect: true,
          label: "E, C, J, G",
        },
        {
          isCorrect: false,
          label: "G, E, J, C",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "J, E, C, G",
        },
        {
          isCorrect: false,
          label: "C, E, G, J",
        },
        {
          isCorrect: false,
          label: "E, G, C, J",
        },
        {
          isCorrect: true,
          label: "E, C, J, G",
        },
        {
          isCorrect: false,
          label: "G, E, J, C",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "J, E, C, G",
        },
        {
          isCorrect: false,
          label: "C, E, G, J",
        },
        {
          isCorrect: false,
          label: "E, G, C, J",
        },
        {
          isCorrect: true,
          label: "E, C, J, G",
        },
        {
          isCorrect: false,
          label: "G, E, J, C",
        },
      ],
    },
  },
};

export default item;
