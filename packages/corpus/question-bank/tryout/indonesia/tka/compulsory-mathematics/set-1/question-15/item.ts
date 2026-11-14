import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "geometry-transformations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$22$$ satuan luas",
        },
        {
          correct: false,
          label: "$$17$$ satuan luas",
        },
        {
          correct: false,
          label: "$$16$$ satuan luas",
        },
        {
          correct: true,
          label: "$$12$$ satuan luas",
        },
        {
          correct: false,
          label: "$$8$$ satuan luas",
        },
      ],
    },
  },
};

export default item;
