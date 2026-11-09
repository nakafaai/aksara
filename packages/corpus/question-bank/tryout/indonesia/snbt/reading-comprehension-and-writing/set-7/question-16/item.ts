import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "reading",
    topic: "data-interpretation",
  },
  stimulus: "library-loans",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$160$$ buku",
        },
        {
          correct: true,
          label: "$$180$$ buku",
        },
        {
          correct: false,
          label: "$$200$$ buku",
        },
        {
          correct: false,
          label: "$$260$$ buku",
        },
        {
          correct: false,
          label: "$$340$$ buku",
        },
      ],
    },
  },
};

export default item;
