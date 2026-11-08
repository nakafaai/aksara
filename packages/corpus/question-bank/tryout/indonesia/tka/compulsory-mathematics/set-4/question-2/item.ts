import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "scooter-energy",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}432{.}000$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}1{.}728{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}2{.}160{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}2{.}592{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}17{.}280{.}000$$",
        },
      ],
    },
  },
};

export default item;
