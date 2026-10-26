import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$36$$ Orang",
        },
        {
          correct: false,
          label: "$$60$$ Orang",
        },
        {
          correct: false,
          label: "$$48$$ Orang",
        },
        {
          correct: false,
          label: "$$30$$ Orang",
        },
        {
          correct: false,
          label: "$$20$$ Orang",
        },
      ],
    },
  },
};

export default item;
