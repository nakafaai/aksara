import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "kamar",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\text{Rp}240{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}255{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}270{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}300{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}315{.}000$$",
        },
      ],
    },
  },
};

export default item;
