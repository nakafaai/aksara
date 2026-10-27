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
          label: "$$T(x,y)=(y,x)$$",
        },
        {
          correct: true,
          label: "$$T(2,-3)=(-3,2)$$",
        },
        {
          correct: true,
          label: "$$T^2$$ adalah identitas.",
        },
        {
          correct: true,
          label: "Semua titik tetap T terletak pada $$y=x$$.",
        },
        {
          correct: false,
          label: "$$T$$ mempertahankan orientasi.",
        },
      ],
    },
  },
};

export default item;
