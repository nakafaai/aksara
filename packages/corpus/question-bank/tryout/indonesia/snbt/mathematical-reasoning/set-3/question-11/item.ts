import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\frac{5!}{2}$$",
        },
        {
          isCorrect: false,
          label: "$$5!$$",
        },
        {
          isCorrect: false,
          label: "$$2(6!)$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{7!}{2}$$",
        },
        {
          isCorrect: true,
          label: "$$2(5!)$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\frac{5!}{2}$$",
        },
        {
          isCorrect: false,
          label: "$$5!$$",
        },
        {
          isCorrect: false,
          label: "$$2(6!)$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{7!}{2}$$",
        },
        {
          isCorrect: true,
          label: "$$2(5!)$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\frac{5!}{2}$$",
        },
        {
          isCorrect: false,
          label: "$$5!$$",
        },
        {
          isCorrect: false,
          label: "$$2(6!)$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{7!}{2}$$",
        },
        {
          isCorrect: true,
          label: "$$2(5!)$$",
        },
      ],
    },
  },
};

export default item;
