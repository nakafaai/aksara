import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "vectors",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$ABCD$$ adalah persegi panjang yang bukan persegi.",
        },
        {
          correct: true,
          label: "Koordinat titik $$C$$ adalah $$(5,0,2)$$.",
        },
        {
          correct: true,
          label: "Diagonal $$AC$$ tegak lurus diagonal $$BD$$.",
        },
        {
          correct: true,
          label: "Luas $$ABCD$$ adalah $$9$$ satuan luas.",
        },
        {
          correct: false,
          label: "Panjang diagonal $$AC$$ adalah $$3\\sqrt3$$.",
        },
      ],
    },
  },
};

export default item;
