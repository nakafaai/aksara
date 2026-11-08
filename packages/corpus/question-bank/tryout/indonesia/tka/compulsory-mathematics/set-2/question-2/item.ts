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
          label: "$$\\text{Rp}185{.}000$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}209{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}220{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}225{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}230{.}000$$",
        },
      ],
    },
  },
};

export default item;
