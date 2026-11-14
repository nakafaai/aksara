import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "tiket",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}1{.}910{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}1{.}820{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}2{.}205{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}1{.}785{.}000$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}1{.}845{.}000$$",
        },
      ],
    },
  },
};

export default item;
