import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "geometry-transformations",
  },
  responses: {
    id: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "$$M(3,-2)=(0,2)$$.",
        },
        {
          isCorrect: true,
          label: "$$M$$ mempertahankan jarak.",
        },
        {
          isCorrect: true,
          label: "$$M$$ membalik orientasi.",
        },
        {
          isCorrect: true,
          label: "$$M^2(x,y)=(x+1,y+1)$$.",
        },
        {
          isCorrect: false,
          label: "$$M$$ memiliki sedikitnya satu titik tetap.",
        },
      ],
    },
  },
};

export default item;
