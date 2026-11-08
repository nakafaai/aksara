import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "matrices",
  },
  stimulus: "furniture-workshop",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}7{.}500{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}9{.}000{.}000{,}00$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}9{.}500{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}10{.}000{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}10{.}500{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
