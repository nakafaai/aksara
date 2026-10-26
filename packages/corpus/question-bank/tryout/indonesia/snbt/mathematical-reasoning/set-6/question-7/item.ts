import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$2520$$ unit",
        },
        {
          correct: false,
          label: "$$1960$$ unit",
        },
        {
          correct: false,
          label: "$$2000$$ unit",
        },
        {
          correct: false,
          label: "$$2720$$ unit",
        },
        {
          correct: false,
          label: "$$3000$$ unit",
        },
      ],
    },
  },
};

export default item;
