import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "matrices",
  },
  stimulus: "print-shop",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}2{.}000{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}1{.}600{.}000{,}00$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}2{.}200{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}2{.}500{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}3{.}600{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
