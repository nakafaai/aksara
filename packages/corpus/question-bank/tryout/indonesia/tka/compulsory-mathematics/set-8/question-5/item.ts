import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "linear-equations-inequalities",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}4{.}500{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}4{.}600{.}000$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}4{.}700{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}4{.}800{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}4{.}960{.}000$$",
        },
      ],
    },
  },
};

export default item;
