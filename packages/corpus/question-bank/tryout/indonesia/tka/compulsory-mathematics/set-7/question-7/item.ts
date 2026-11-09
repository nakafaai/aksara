import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "functions",
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
          label: "$$\\text{Rp}122{.}825{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}140{.}000{.}000$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}144{.}500{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}170{.}000{.}000$$",
        },
      ],
    },
  },
};

export default item;
