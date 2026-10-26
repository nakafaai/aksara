import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2$$ tahun",
        },
        {
          correct: false,
          label: "$$3$$ tahun",
        },
        {
          correct: false,
          label: "$$4$$ tahun",
        },
        {
          correct: true,
          label: "$$6$$ tahun",
        },
        {
          correct: false,
          label: "$$5$$ tahun",
        },
      ],
    },
  },
};

export default item;
