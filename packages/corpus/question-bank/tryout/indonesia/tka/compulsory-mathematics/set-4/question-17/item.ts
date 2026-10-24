import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\frac{4}{3}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{3}{5}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{3\\sqrt{2}}{8}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{4}{5}$$",
        },
        {
          isCorrect: true,
          label: "$$\\frac{3}{4}$$",
        },
      ],
    },
  },
  stimulusKey: "pavilion-roof",
};

export default item;
