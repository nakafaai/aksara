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
          correct: true,
          label: "$$\\text{Rp}625{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}1{.}225{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}1{.}850{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}2{.}450{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}3{.}075{.}000$$",
        },
      ],
    },
  },
};

export default item;
