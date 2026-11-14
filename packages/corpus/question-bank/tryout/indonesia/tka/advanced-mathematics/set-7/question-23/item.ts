import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "calculus",
    topic: "limits",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}0{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}2{.}000{.}000{,}00$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}15{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}2{.}015{.}000{,}00$$",
        },
        {
          correct: false,
          label: "Tak hingga, karena biaya total terus bertambah",
        },
      ],
    },
  },
};

export default item;
