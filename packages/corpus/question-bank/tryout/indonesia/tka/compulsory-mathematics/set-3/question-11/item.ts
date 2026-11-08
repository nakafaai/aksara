import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}1{.}305{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}1{.}845{.}000$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}3{.}150{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}3{.}690{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}9{.}450{.}000$$",
        },
      ],
    },
  },
};

export default item;
