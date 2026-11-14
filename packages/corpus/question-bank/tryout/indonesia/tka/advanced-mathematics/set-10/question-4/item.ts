import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "matrices",
  },
  stimulus: "laundry",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\text{Rp}200{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}150{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}160{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}310{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}400{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
