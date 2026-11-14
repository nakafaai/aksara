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
          label: "$$812\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$975\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$1{.}023\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$1{.}055\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$1{.}298\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
