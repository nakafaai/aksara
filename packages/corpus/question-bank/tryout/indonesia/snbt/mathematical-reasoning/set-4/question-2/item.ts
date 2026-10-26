import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1$$ buket camilan dan $$2$$ buket uang",
        },
        {
          correct: false,
          label: "$$1$$ bunga besar dan $$2$$ buket uang",
        },
        {
          correct: false,
          label: "$$1$$ bunga besar dan $$2$$ buket camilan",
        },
        {
          correct: false,
          label: "$$1$$ bunga kecil dan $$2$$ buket camilan",
        },
        {
          correct: true,
          label: "$$2$$ buket camilan dan $$2$$ buket uang",
        },
      ],
    },
  },
};

export default item;
