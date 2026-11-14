import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "cicilan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\text{Rp}531{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}560{.}500$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}679{.}500$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}708{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}835{.}500$$",
        },
      ],
    },
  },
};

export default item;
