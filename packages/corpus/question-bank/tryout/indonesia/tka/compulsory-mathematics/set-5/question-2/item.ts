import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "money-changer",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\text{Rp}1{.}870{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}1{.}897{.}500$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}1{.}925{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}2{.}070{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}4{.}930{.}000$$",
        },
      ],
    },
  },
};

export default item;
