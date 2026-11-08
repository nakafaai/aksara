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
          correct: false,
          label: "$$\\text{Rp}1{.}200{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}1{.}400{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}1{.}500{.}000$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}1{.}600{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}2{.}200{.}000$$",
        },
      ],
    },
  },
};

export default item;
