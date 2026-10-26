import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$60$$ dan $$155$$ orang",
        },
        {
          correct: true,
          label: "$$60$$ dan $$145$$ orang",
        },
        {
          correct: false,
          label: "$$62$$ dan $$155$$ orang",
        },
        {
          correct: false,
          label: "$$62$$ dan $$145$$ orang",
        },
        {
          correct: false,
          label: "$$65$$ dan $$155$$ orang",
        },
      ],
    },
  },
};

export default item;
