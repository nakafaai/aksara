import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "(1)-(3)-(4)-(2)",
        },
        {
          isCorrect: true,
          label: "(3)-(1)-(4)-(2)",
        },
        {
          isCorrect: false,
          label: "(3)-(4)-(1)-(2)",
        },
        {
          isCorrect: false,
          label: "(3)-(1)-(2)-(4)",
        },
        {
          isCorrect: false,
          label: "(2)-(3)-(1)-(4)",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "(1)-(3)-(4)-(2)",
        },
        {
          isCorrect: true,
          label: "(3)-(1)-(4)-(2)",
        },
        {
          isCorrect: false,
          label: "(3)-(4)-(1)-(2)",
        },
        {
          isCorrect: false,
          label: "(3)-(1)-(2)-(4)",
        },
        {
          isCorrect: false,
          label: "(2)-(3)-(1)-(4)",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "(1)-(3)-(4)-(2)",
        },
        {
          isCorrect: true,
          label: "(3)-(1)-(4)-(2)",
        },
        {
          isCorrect: false,
          label: "(3)-(4)-(1)-(2)",
        },
        {
          isCorrect: false,
          label: "(3)-(1)-(2)-(4)",
        },
        {
          isCorrect: false,
          label: "(2)-(3)-(1)-(4)",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
