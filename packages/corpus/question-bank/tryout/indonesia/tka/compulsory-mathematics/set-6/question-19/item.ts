import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1{.}120\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$1{.}220\\text{ cm}^2$$",
        },
        {
          correct: true,
          label: "$$1{.}370\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$1{.}400\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$1{.}600\\text{ cm}^2$$",
        },
      ],
    },
  },
};

export default item;
