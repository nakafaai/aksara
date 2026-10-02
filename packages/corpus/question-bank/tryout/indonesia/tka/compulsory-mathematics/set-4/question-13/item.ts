import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "geometry-transformations",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$(-1,2)$$",
        },
        {
          isCorrect: false,
          label: "$$(0,0)$$",
        },
        {
          isCorrect: false,
          label: "$$\\left(\\frac{1}{2},\\frac{1}{2}\\right)$$",
        },
        {
          isCorrect: false,
          label: "$$(1,-3)$$",
        },
        {
          isCorrect: true,
          label: "$$(2,-1)$$",
        },
      ],
    },
  },
};

export default item;
