import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "internet-packages",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}93{.}500$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}187{.}000$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}203{.}500$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}205{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}220{.}000$$",
        },
      ],
    },
  },
};

export default item;
