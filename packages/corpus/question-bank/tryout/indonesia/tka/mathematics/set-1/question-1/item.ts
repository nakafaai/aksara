import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac54$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac94$$",
        },
        {
          isCorrect: true,
          label: "$$\\frac{25}{16}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{25}{8}$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac54$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac94$$",
        },
        {
          isCorrect: true,
          label: "$$\\frac{25}{16}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{25}{8}$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac54$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac94$$",
        },
        {
          isCorrect: true,
          label: "$$\\frac{25}{16}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{25}{8}$$",
        },
      ],
    },
  },
};

export default item;
