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
          label: "$$T(1,0)=(1,3)$$",
        },
        {
          correct: true,
          label: "$$T$$ sama dengan pencerminan terhadap garis $$x=1$$, dilanjutkan translasi $$\\begin{pmatrix} 0 \\\\ 3 \\end{pmatrix}$$.",
        },
        {
          correct: false,
          label: "Menerapkan $$T$$ dua kali berturut-turut mengembalikan setiap titik ke posisi semula.",
        },
        {
          correct: true,
          label: "Menerapkan $$T$$ dua kali berturut-turut sama dengan translasi $$\\begin{pmatrix} 0 \\\\ 6 \\end{pmatrix}$$.",
        },
      ],
    },
  },
};

export default item;
