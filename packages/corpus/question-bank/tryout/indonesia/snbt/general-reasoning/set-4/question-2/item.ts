import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2$$ boneka beruang",
        },
        {
          correct: true,
          label: "$$1$$ boneka beruang dan $$1$$ bola",
        },
        {
          correct: false,
          label: "$$2$$ kelereng",
        },
        {
          correct: false,
          label: "$$1$$ bola dan $$1$$ boneka Barbie",
        },
        {
          correct: false,
          label: "$$1$$ boneka Barbie dan $$1$$ kelereng",
        },
      ],
    },
  },
};

export default item;
