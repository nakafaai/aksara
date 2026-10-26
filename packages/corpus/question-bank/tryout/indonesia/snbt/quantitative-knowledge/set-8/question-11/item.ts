import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$10{:}01$$",
        },
        {
          correct: false,
          label: "$$10{:}20$$",
        },
        {
          correct: false,
          label: "$$10{:}36$$",
        },
        {
          correct: false,
          label: "$$11{:}02$$",
        },
        {
          correct: true,
          label: "$$10{:}57$$",
        },
      ],
    },
  },
};

export default item;
