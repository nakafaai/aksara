import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1{,}02$$",
        },
        {
          correct: false,
          label: "$$1{,}06$$",
        },
        {
          correct: true,
          label: "$$1{,}04$$",
        },
        {
          correct: false,
          label: "$$1{,}08$$",
        },
        {
          correct: false,
          label: "$$1{,}10$$",
        },
      ],
    },
  },
};

export default item;
