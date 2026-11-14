import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "overtime-pay",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}1{.}075{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}1{.}150{.}000$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}1{.}225{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}1{.}375{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}1{.}725{.}000$$",
        },
      ],
    },
  },
};

export default item;
