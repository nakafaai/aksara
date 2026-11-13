import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "online-taxi",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}53{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}63{.}600$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}71{.}500$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}84{.}800$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}85{.}800$$",
        },
      ],
    },
  },
};

export default item;
