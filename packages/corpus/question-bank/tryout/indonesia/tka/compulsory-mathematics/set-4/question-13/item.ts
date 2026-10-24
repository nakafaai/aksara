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
          label: "$$(-4,6)$$",
        },
        {
          isCorrect: false,
          label: "$$(-6,-4)$$",
        },
        {
          isCorrect: false,
          label: "$$(-4,-6)$$",
        },
        {
          isCorrect: false,
          label: "$$(-3,-2)$$",
        },
        {
          isCorrect: true,
          label: "$$(6,4)$$",
        },
      ],
    },
  },
};

export default item;
