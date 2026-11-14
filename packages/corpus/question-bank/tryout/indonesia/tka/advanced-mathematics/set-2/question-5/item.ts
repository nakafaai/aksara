import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "matrices",
  },
  stimulus: "feed-mix",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}150{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}200{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}250{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}300{.}000{,}00$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}450{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
