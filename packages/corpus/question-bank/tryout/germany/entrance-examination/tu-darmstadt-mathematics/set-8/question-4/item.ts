import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "nur $$k=3$$",
        },
        {
          correct: false,
          label: "nur $$k=33$$",
        },
        {
          correct: true,
          label: "$$k=3$$ oder $$k=33$$",
        },
        {
          correct: false,
          label: "$$k=10{,}5$$ oder $$k=25{,}5$$",
        },
        {
          correct: false,
          label: "$$k=-3$$ oder $$k=3$$",
        },
        {
          correct: false,
          label: "nur $$k=18$$",
        },
      ],
    },
  },
};

export default item;
