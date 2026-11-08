import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "ring-mold",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$440\\text{ cm}^2$$",
        },
        {
          correct: true,
          label: "$$902\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$1{.}056\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$1{.}122\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$1{.}364\\text{ cm}^2$$",
        },
      ],
    },
  },
};

export default item;
