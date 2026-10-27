import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$49{,}5$$ hari",
        },
        {
          correct: false,
          label: "$$48$$ hari",
        },
        {
          correct: false,
          label: "$$48{,}5$$ hari",
        },
        {
          correct: false,
          label: "$$49$$ hari",
        },
        {
          correct: false,
          label: "$$50$$ hari",
        },
      ],
    },
  },
};

export default item;
