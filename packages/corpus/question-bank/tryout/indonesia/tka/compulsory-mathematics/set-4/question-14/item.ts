import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "geometry-transformations",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$10\\sqrt{145}\\text{ m}$$",
        },
        {
          isCorrect: true,
          label: "$$130\\text{ m}$$",
        },
        {
          isCorrect: false,
          label: "$$\\left(20\\sqrt{10}+30\\sqrt{5}\\right)\\text{ m}$$",
        },
        {
          isCorrect: false,
          label: "$$\\left(20+30\\sqrt{17}\\right)\\text{ m}$$",
        },
        {
          isCorrect: false,
          label: "$$\\left(30+20\\sqrt{37}\\right)\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
