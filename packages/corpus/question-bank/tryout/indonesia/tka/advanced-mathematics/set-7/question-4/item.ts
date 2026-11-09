import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "matrices",
  },
  stimulus: "nutrition-sachet",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\text{Rp}36{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}42{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}52{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}30{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}20{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
