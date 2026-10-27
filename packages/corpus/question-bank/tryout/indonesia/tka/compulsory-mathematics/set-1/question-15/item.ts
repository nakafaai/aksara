import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "geometry-transformations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$T(1,-2)=(4,2)$$.",
        },
        {
          correct: true,
          label: "$$T$$ menggandakan setiap panjang.",
        },
        {
          correct: true,
          label: "$$T$$ mengalikan setiap luas dengan $$4$$.",
        },
        {
          correct: false,
          label: "$$T$$ membalik orientasi.",
        },
        {
          correct: true,
          label: "$$T^2(x,y)=(-4x,-4y)$$.",
        },
      ],
    },
  },
};

export default item;
