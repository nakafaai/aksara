import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$10$$",
        },
        {
          isCorrect: false,
          label: "$$30$$",
        },
        {
          isCorrect: false,
          label: "$$35$$",
        },
        {
          isCorrect: false,
          label: "$$50$$",
        },
        {
          isCorrect: true,
          label: "$$25$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$10$$",
        },
        {
          isCorrect: false,
          label: "$$30$$",
        },
        {
          isCorrect: false,
          label: "$$35$$",
        },
        {
          isCorrect: false,
          label: "$$50$$",
        },
        {
          isCorrect: true,
          label: "$$25$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$10$$",
        },
        {
          isCorrect: false,
          label: "$$30$$",
        },
        {
          isCorrect: false,
          label: "$$35$$",
        },
        {
          isCorrect: false,
          label: "$$50$$",
        },
        {
          isCorrect: true,
          label: "$$25$$",
        },
      ],
    },
  },
};

export default item;
