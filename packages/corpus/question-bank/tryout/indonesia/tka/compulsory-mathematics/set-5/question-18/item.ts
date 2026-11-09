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
          label: "$$\\text{Rp}269{.}500$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}490{.}000$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}759{.}500$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}1{.}029{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}1{.}568{.}000$$",
        },
      ],
    },
  },
};

export default item;
