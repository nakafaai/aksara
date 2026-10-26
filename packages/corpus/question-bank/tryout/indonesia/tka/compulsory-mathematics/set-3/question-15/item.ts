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
          label: "$$M(3,-2)=(0,2)$$.",
        },
        {
          correct: true,
          label: "$$M$$ mempertahankan jarak.",
        },
        {
          correct: true,
          label: "$$M$$ membalik orientasi.",
        },
        {
          correct: true,
          label: "$$M^2(x,y)=(x+1,y+1)$$.",
        },
        {
          correct: false,
          label: "$$M$$ memiliki sedikitnya satu titik tetap.",
        },
      ],
    },
  },
};

export default item;
