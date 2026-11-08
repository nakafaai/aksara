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
          correct: false,
          label: "$$T$$ mengubah luas setiap bangun menjadi dua kalinya.",
        },
        {
          correct: true,
          label: "$$T(1,0)=(5,-2)$$",
        },
        {
          correct: true,
          label: "$$T$$ sama dengan pencerminan terhadap garis $$x=3$$, dilanjutkan translasi $$\\begin{pmatrix} 0 \\\\ -2 \\end{pmatrix}$$.",
        },
        {
          correct: false,
          label: "$$T$$ memetakan garis $$y=x$$ ke garis itu sendiri.",
        },
        {
          correct: true,
          label: "Bayangan setiap titik pada garis $$x=3$$ tetap terletak pada garis $$x=3$$.",
        },
      ],
    },
  },
};

export default item;
