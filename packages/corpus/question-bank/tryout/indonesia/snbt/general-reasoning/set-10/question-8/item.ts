import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$45$$ dan $$186$$ orang",
        },
        {
          correct: false,
          label: "$$45$$ dan $$187$$ orang",
        },
        {
          correct: false,
          label: "$$45$$ dan $$188$$ orang",
        },
        {
          correct: false,
          label: "$$46$$ dan $$189$$ orang",
        },
        {
          correct: false,
          label: "$$46$$ dan $$190$$ orang",
        },
      ],
    },
  },
};

export default item;
