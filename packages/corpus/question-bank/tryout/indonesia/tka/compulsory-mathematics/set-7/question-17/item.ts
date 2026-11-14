import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "pipa",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$1{.}881\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$2{.}475\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$3{.}663\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$5{.}225\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$7{.}524\\text{ kg}$$",
        },
      ],
    },
  },
};

export default item;
