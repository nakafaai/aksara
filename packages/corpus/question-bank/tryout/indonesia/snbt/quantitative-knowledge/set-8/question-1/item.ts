import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\frac{1}{3}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{32}{99}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{23}{99}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{232}{999}$$",
        },
        {
          isCorrect: true,
          label: "$$\\frac{323}{999}$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$\\frac{1}{3}$$" },
        { isCorrect: false, label: "$$\\frac{32}{99}$$" },
        { isCorrect: false, label: "$$\\frac{23}{99}$$" },
        { isCorrect: false, label: "$$\\frac{232}{999}$$" },
        { isCorrect: true, label: "$$\\frac{323}{999}$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$\\frac{1}{3}$$" },
        { isCorrect: false, label: "$$\\frac{32}{99}$$" },
        { isCorrect: false, label: "$$\\frac{23}{99}$$" },
        { isCorrect: false, label: "$$\\frac{232}{999}$$" },
        { isCorrect: true, label: "$$\\frac{323}{999}$$" },
      ],
    },
  },
};

export default item;
