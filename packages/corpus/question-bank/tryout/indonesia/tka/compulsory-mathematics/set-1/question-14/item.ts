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
          correct: true,
          label: "$$B'(1,-4)$$ dan luasnya $$28$$ satuan luas",
        },
        {
          correct: false,
          label: "$$B'(1,-4)$$ dan luasnya $$14$$ satuan luas",
        },
        {
          correct: false,
          label: "$$B'(1,8)$$ dan luasnya $$28$$ satuan luas",
        },
        {
          correct: false,
          label: "$$B'(-2,-10)$$ dan luasnya $$28$$ satuan luas",
        },
        {
          correct: false,
          label: "$$B'(1,-4)$$ dan luasnya $$7$$ satuan luas",
        },
      ],
    },
  },
};

export default item;
