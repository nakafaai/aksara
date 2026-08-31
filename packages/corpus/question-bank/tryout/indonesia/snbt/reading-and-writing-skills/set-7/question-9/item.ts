import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "(4)-(1)-(3)-(2)",
        },
        {
          isCorrect: false,
          label: "(1)-(4)-(3)-(2)",
        },
        {
          isCorrect: true,
          label: "(4)-(3)-(1)-(2)",
        },
        {
          isCorrect: false,
          label: "(4)-(1)-(2)-(3)",
        },
        {
          isCorrect: false,
          label: "(2)-(4)-(1)-(3)",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "(4)-(1)-(3)-(2)",
        },
        {
          isCorrect: false,
          label: "(1)-(4)-(3)-(2)",
        },
        {
          isCorrect: true,
          label: "(4)-(3)-(1)-(2)",
        },
        {
          isCorrect: false,
          label: "(4)-(1)-(2)-(3)",
        },
        {
          isCorrect: false,
          label: "(2)-(4)-(1)-(3)",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "(4)-(1)-(3)-(2)",
        },
        {
          isCorrect: false,
          label: "(1)-(4)-(3)-(2)",
        },
        {
          isCorrect: true,
          label: "(4)-(3)-(1)-(2)",
        },
        {
          isCorrect: false,
          label: "(4)-(1)-(2)-(3)",
        },
        {
          isCorrect: false,
          label: "(2)-(4)-(1)-(3)",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
