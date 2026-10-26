import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$21$$ menit atau $$10$$ menit",
        },
        {
          correct: false,
          label: "$$15$$ menit atau $$16$$ menit",
        },
        {
          correct: false,
          label: "$$30$$ menit atau $$40$$ menit",
        },
        {
          correct: true,
          label: "$$70$$ menit atau $$30$$ menit",
        },
        {
          correct: false,
          label: "$$10$$ menit atau $$30$$ menit",
        },
      ],
    },
  },
};

export default item;
