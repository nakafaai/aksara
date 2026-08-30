import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "(1)-(2)-(3)-(4)",
        },
        {
          isCorrect: false,
          label: "(2)-(1)-(4)-(3)",
        },
        {
          isCorrect: false,
          label: "(3)-(1)-(2)-(4)",
        },
        {
          isCorrect: false,
          label: "(4)-(2)-(3)-(1)",
        },
        {
          isCorrect: false,
          label: "(1)-(3)-(2)-(4)",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "(1)-(2)-(3)-(4)",
        },
        {
          isCorrect: false,
          label: "(2)-(1)-(4)-(3)",
        },
        {
          isCorrect: false,
          label: "(3)-(1)-(2)-(4)",
        },
        {
          isCorrect: false,
          label: "(4)-(2)-(3)-(1)",
        },
        {
          isCorrect: false,
          label: "(1)-(3)-(2)-(4)",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "(1)-(2)-(3)-(4)",
        },
        {
          isCorrect: false,
          label: "(2)-(1)-(4)-(3)",
        },
        {
          isCorrect: false,
          label: "(3)-(1)-(2)-(4)",
        },
        {
          isCorrect: false,
          label: "(4)-(2)-(3)-(1)",
        },
        {
          isCorrect: false,
          label: "(1)-(3)-(2)-(4)",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
