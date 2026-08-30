import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "data-probability",
    topic: "data",
  },
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\frac{42}{17}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{43}{17}$$",
        },
        {
          isCorrect: true,
          label: "$$\\frac{44}{17}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{45}{17}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{46}{17}$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\frac{42}{17}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{43}{17}$$",
        },
        {
          isCorrect: true,
          label: "$$\\frac{44}{17}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{45}{17}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{46}{17}$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\frac{42}{17}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{43}{17}$$",
        },
        {
          isCorrect: true,
          label: "$$\\frac{44}{17}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{45}{17}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{46}{17}$$",
        },
      ],
    },
  },
  stimulusKey: "study-time-survey",
};

export default item;
