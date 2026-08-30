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
          label: "$$\\frac{5}{6}$$",
        },
        {
          isCorrect: false,
          label: "$$1$$",
        },
        {
          isCorrect: true,
          label: "$$\\frac{7}{6}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{4}{3}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{3}{2}$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\frac{5}{6}$$",
        },
        {
          isCorrect: false,
          label: "$$1$$",
        },
        {
          isCorrect: true,
          label: "$$\\frac{7}{6}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{4}{3}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{3}{2}$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\frac{5}{6}$$",
        },
        {
          isCorrect: false,
          label: "$$1$$",
        },
        {
          isCorrect: true,
          label: "$$\\frac{7}{6}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{4}{3}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{3}{2}$$",
        },
      ],
    },
  },
};

export default item;
