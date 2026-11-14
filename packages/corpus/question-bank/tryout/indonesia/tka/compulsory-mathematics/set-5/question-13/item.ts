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
          label: "$$6$$ satuan luas",
        },
        {
          correct: true,
          label: "$$24$$ satuan luas",
        },
        {
          correct: false,
          label: "$$27$$ satuan luas",
        },
        {
          correct: false,
          label: "$$48$$ satuan luas",
        },
        {
          correct: false,
          label: "$$78$$ satuan luas",
        },
      ],
    },
  },
};

export default item;
