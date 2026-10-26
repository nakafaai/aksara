import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$5$$ bulan",
        },
        {
          correct: false,
          label: "$$6$$ bulan",
        },
        {
          correct: true,
          label: "$$4$$ bulan",
        },
        {
          correct: false,
          label: "$$8$$ bulan",
        },
        {
          correct: false,
          label: "$$9$$ bulan",
        },
      ],
    },
  },
};

export default item;
