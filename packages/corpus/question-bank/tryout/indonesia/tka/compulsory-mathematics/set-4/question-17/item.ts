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
          label: "$$0{,}44\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$0{,}88\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$2{,}2\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$3{,}52\\text{ m}^2$$",
        },
        {
          correct: true,
          label: "$$1{,}76\\text{ m}^2$$",
        },
      ],
    },
  },
  stimulus: "culvert",
};

export default item;
