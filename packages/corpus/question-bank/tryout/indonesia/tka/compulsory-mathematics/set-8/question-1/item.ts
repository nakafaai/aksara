import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "grosir",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}376{.}200$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}383{.}600$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}387{.}600$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}396{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}399{.}000$$",
        },
      ],
    },
  },
};

export default item;
