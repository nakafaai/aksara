import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$30-10\\sqrt3$$ Liter",
        },
        {
          correct: false,
          label: "$$30+10\\sqrt3$$ Liter",
        },
        {
          correct: false,
          label: "$$20$$ Liter",
        },
        {
          correct: false,
          label: "$$10$$ Liter",
        },
        {
          correct: false,
          label: "$$60-20\\sqrt3$$ Liter",
        },
        {
          correct: false,
          label: "$$30-10\\sqrt3$$ Liter oder $$30+10\\sqrt3$$ Liter",
        },
      ],
    },
  },
};

export default item;
