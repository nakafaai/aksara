import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "geometry-transformations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2$$ satuan luas",
        },
        {
          correct: false,
          label: "$$6$$ satuan luas",
        },
        {
          correct: false,
          label: "$$18$$ satuan luas",
        },
        {
          correct: true,
          label: "$$54$$ satuan luas",
        },
        {
          correct: false,
          label: "$$162$$ satuan luas",
        },
      ],
    },
  },
};

export default item;
