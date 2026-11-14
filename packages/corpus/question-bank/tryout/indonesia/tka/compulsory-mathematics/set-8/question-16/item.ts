import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "gift-box",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1{.}100\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$1{.}200\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$1{.}600\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$1{.}800\\text{ cm}^2$$",
        },
        {
          correct: true,
          label: "$$2{.}200\\text{ cm}^2$$",
        },
      ],
    },
  },
};

export default item;
