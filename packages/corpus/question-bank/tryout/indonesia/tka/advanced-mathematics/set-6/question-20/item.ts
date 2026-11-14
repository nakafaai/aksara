import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "geometric-transformations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Hanya titik $$O(0,0)$$",
        },
        {
          correct: true,
          label: "Semua titik pada garis $$y=x$$",
        },
        {
          correct: false,
          label: "Semua titik pada garis $$y=-x$$",
        },
        {
          correct: false,
          label: "Semua titik pada sumbu $$X$$",
        },
        {
          correct: false,
          label: "Semua titik pada garis $$y=2x$$",
        },
      ],
    },
  },
};

export default item;
