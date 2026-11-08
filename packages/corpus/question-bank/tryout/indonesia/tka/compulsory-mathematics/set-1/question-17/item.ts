import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\text{Rp}1{.}425{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}1{.}235{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}1{.}330{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}1{.}520{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}1{.}615{.}000$$",
        },
      ],
    },
  },
};

export default item;
