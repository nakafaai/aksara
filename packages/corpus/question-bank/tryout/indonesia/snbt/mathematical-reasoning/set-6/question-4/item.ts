import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$7$$ bulan",
        },
        {
          correct: false,
          label: "$$8$$ bulan",
        },
        {
          correct: false,
          label: "$$9$$ bulan",
        },
        {
          correct: false,
          label: "$$12$$ bulan",
        },
        {
          correct: true,
          label: "$$10$$ bulan",
        },
      ],
    },
  },
};

export default item;
