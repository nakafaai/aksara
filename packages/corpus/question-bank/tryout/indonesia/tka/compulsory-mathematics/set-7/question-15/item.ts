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
          label: "Luas segitiga $$A'B'C'$$ adalah $$16$$ satuan luas.",
        },
        {
          correct: true,
          label: "Koordinat titik $$B'$$ adalah $$(0,8)$$.",
        },
        {
          correct: false,
          label: "Segitiga $$A'B'C'$$ kongruen dengan segitiga $$ABC$$.",
        },
        {
          correct: true,
          label:
            "Keliling segitiga $$A'B'C'$$ sama dengan dua kali keliling segitiga $$ABC$$.",
        },
        {
          correct: false,
          label: "Titik $$C'$$ terletak pada sumbu $$y$$.",
        },
      ],
    },
  },
};

export default item;
