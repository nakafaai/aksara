import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "water-tariff",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}72{.}500$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}78{.}000$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}90{.}500$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}97{.}500$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}115{.}500$$",
        },
      ],
    },
  },
};

export default item;
