import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "panel",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}600$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}900$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}1{.}000$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}1{.}050$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}1{.}200$$",
        },
      ],
    },
  },
};

export default item;
