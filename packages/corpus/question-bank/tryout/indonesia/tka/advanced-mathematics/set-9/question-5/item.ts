import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "matrices",
  },
  stimulus: "batik-studio",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}50{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}77{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}80{.}000{,}00$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}100{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}120{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
