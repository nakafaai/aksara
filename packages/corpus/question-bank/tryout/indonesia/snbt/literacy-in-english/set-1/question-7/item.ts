import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$2$$ and $$3$$",
        },
        {
          correct: false,
          label: "$$1$$",
        },
        {
          correct: false,
          label: "$$2$$ and $$4$$",
        },
        {
          correct: false,
          label: "$$3$$ and $$4$$",
        },
        {
          correct: false,
          label: "$$4$$",
        },
      ],
    },
  },
};

export default item;
