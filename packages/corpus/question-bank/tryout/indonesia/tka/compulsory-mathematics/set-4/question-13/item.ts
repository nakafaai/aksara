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
          label: "$$(-1,0)$$",
        },
        {
          isCorrect: false,
          label: "$$(0,0)$$",
        },
        {
          isCorrect: false,
          label: "$$\\left(\\frac12,-\\frac12\\right)$$",
        },
        {
          isCorrect: false,
          label: "$$(2,1)$$",
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
