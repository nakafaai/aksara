import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "money-changer",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}30{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}510{.}000$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}1{.}770{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}1{.}785{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}1{.}800{.}000$$",
        },
      ],
    },
  },
};

export default item;
