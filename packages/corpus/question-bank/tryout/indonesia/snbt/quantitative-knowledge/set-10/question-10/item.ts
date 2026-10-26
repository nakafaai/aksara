import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$15$$ menit",
        },
        {
          correct: false,
          label: "$$30$$ menit",
        },
        {
          correct: false,
          label: "$$45$$ menit",
        },
        {
          correct: true,
          label: "$$60$$ menit",
        },
        {
          correct: false,
          label: "$$75$$ menit",
        },
      ],
    },
  },
};

export default item;
