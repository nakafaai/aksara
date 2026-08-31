import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Anschließend",
        },
        {
          isCorrect: false,
          label: "Allerdings",
        },
        {
          isCorrect: false,
          label: "Daher",
        },
        {
          isCorrect: false,
          label: "Umgekehrt",
        },
        {
          isCorrect: false,
          label: "Falls dies zutrifft",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Next",
        },
        {
          isCorrect: false,
          label: "However",
        },
        {
          isCorrect: false,
          label: "Therefore",
        },
        {
          isCorrect: false,
          label: "Conversely",
        },
        {
          isCorrect: false,
          label: "If so",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Selanjutnya",
        },
        {
          isCorrect: false,
          label: "Namun",
        },
        {
          isCorrect: false,
          label: "Oleh karena itu",
        },
        {
          isCorrect: false,
          label: "Sebaliknya",
        },
        {
          isCorrect: false,
          label: "Seandainya",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
