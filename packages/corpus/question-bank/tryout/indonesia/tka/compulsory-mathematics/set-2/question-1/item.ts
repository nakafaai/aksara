import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "internet-packages",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\text{Rp}2{.}750$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}2{.}500$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}3{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}4{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}8{.}000$$",
        },
      ],
    },
  },
};

export default item;
