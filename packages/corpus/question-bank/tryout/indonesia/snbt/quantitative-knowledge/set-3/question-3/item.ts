import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1$$ jam $$15$$ menit",
        },
        {
          correct: false,
          label: "$$1$$ jam $$30$$ menit",
        },
        {
          correct: true,
          label: "$$1$$ jam $$20$$ menit",
        },
        {
          correct: false,
          label: "$$1$$ jam $$40$$ menit",
        },
        {
          correct: false,
          label: "$$1$$ jam $$45$$ menit",
        },
      ],
    },
  },
};

export default item;
