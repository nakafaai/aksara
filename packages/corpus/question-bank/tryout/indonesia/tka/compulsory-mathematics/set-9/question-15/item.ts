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
          label: "Koordinat titik $$P'$$ adalah $$(-1,1)$$.",
        },
        {
          correct: false,
          label: "Koordinat titik $$R'$$ adalah $$(3,-5)$$.",
        },
        {
          correct: true,
          label: "Sisi $$P'Q'$$ tegak, sejajar sumbu $$y$$.",
        },
        {
          correct: false,
          label: "Seluruh persegi panjang $$P'Q'R'S'$$ terletak di kuadran I.",
        },
        {
          correct: true,
          label: "Luas persegi panjang $$P'Q'R'S'$$ adalah $$8$$ satuan luas.",
        },
      ],
    },
  },
};

export default item;
