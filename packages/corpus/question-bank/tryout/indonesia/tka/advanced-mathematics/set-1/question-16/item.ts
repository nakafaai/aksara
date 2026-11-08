import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "circles",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$675\\pi\\text{ cm}^2$$",
        },
        {
          correct: true,
          label: "$$1{.}125\\pi\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$1{.}200\\pi\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$2{.}250\\pi\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$3{.}375\\pi\\text{ cm}^2$$",
        },
      ],
    },
  },
};

export default item;
