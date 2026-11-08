import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "algebra",
    topic: "sequences-series",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$80$$ buku",
        },
        {
          correct: false,
          label: "$$234$$ buku",
        },
        {
          correct: false,
          label: "$$480$$ buku",
        },
        {
          correct: false,
          label: "$$517$$ buku",
        },
        {
          correct: true,
          label: "$$564$$ buku",
        },
      ],
    },
  },
};

export default item;
