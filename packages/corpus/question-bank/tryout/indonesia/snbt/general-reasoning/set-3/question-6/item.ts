import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "it",
        },
        {
          isCorrect: false,
          label: "pit",
        },
        {
          isCorrect: true,
          label: "nit",
        },
        {
          isCorrect: false,
          label: "sit",
        },
        {
          isCorrect: false,
          label: "nichts davon",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "it",
        },
        {
          isCorrect: false,
          label: "pit",
        },
        {
          isCorrect: true,
          label: "nit",
        },
        {
          isCorrect: false,
          label: "sit",
        },
        {
          isCorrect: false,
          label: "none of the above",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "it",
        },
        {
          isCorrect: false,
          label: "pit",
        },
        {
          isCorrect: true,
          label: "nit",
        },
        {
          isCorrect: false,
          label: "sit",
        },
        {
          isCorrect: false,
          label: "tidak ada satu pun",
        },
      ],
    },
  },
};

export default item;
