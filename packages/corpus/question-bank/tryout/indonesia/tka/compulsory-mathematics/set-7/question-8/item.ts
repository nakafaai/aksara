import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "algebra",
    topic: "sequences-series",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1{.}911$$",
        },
        {
          correct: false,
          label: "$$2{.}100$$",
        },
        {
          correct: true,
          label: "$$2{.}107$$",
        },
        {
          correct: false,
          label: "$$2{.}205$$",
        },
        {
          correct: false,
          label: "$$4{.}214$$",
        },
      ],
    },
  },
};

export default item;
