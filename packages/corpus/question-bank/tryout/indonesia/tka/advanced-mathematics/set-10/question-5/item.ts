import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "matrices",
  },
  stimulus: "laundry",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}200{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}233{.}333{,}33$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}230{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}225{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}250{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
