import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "nur $$r=5$$",
        },
        {
          correct: false,
          label: "nur $$r=13$$",
        },
        {
          correct: false,
          label: "nur $$r=\\sqrt{65}$$",
        },
        {
          correct: false,
          label: "nur $$r=4{,}5$$",
        },
        {
          correct: false,
          label: "nur $$r=9$$",
        },
        {
          correct: true,
          label: "$$r=5$$ oder $$r=13$$",
        },
      ],
    },
  },
};

export default item;
