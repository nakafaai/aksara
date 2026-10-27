import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$180$$ dan $$10$$",
        },
        {
          correct: false,
          label: "$$170$$ dan $$15$$",
        },
        {
          correct: true,
          label: "$$180$$ dan $$20$$",
        },
        {
          correct: false,
          label: "$$170$$ dan $$20$$",
        },
        {
          correct: false,
          label: "$$160$$ dan $$25$$",
        },
      ],
    },
  },
};

export default item;
