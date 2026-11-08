import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$231\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$924\\text{ cm}^2$$",
        },
        {
          correct: true,
          label: "$$1{.}848\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$2{.}079\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$3{.}696\\text{ cm}^2$$",
        },
      ],
    },
  },
};

export default item;
