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
          label: "$$462\\text{ cm}^2$$",
        },
        {
          correct: true,
          label: "$$770\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$808{,}5\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$924\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$1{.}078\\text{ cm}^2$$",
        },
      ],
    },
  },
};

export default item;
