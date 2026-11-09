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
          correct: false,
          label: "$$\\text{Rp}340{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}765{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}2{.}295{.}000$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}2{.}550{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}25{.}500{.}000$$",
        },
      ],
    },
  },
};

export default item;
