import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$A$$",
        },
        {
          correct: true,
          label: "$$B$$",
        },
        {
          correct: false,
          label: "$$C$$",
        },
        {
          correct: false,
          label: "$$A$$ dan $$C$$ sama-sama terbaik",
        },
        {
          correct: false,
          label: "$$B$$ dan $$C$$ sama-sama terbaik",
        },
      ],
    },
  },
};

export default item;
