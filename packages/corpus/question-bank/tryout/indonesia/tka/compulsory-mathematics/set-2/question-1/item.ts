import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "panel",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\text{Rp}165{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}144{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}135{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}125{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}120{.}000$$",
        },
      ],
    },
  },
};

export default item;
