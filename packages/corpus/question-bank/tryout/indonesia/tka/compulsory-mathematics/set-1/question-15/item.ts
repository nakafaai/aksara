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
          label: "$$T(1,-2)=(4,2)$$.",
        },
        {
          isCorrect: true,
          label: "$$T$$ menggandakan setiap panjang.",
        },
        {
          isCorrect: true,
          label: "$$T$$ mengalikan setiap luas dengan $$4$$.",
        },
        {
          isCorrect: false,
          label: "$$T$$ membalik orientasi.",
        },
        {
          isCorrect: true,
          label: "$$T^2(x,y)=(-4x,-4y)$$.",
        },
      ],
    },
  },
};

export default item;
