import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0{,}64\\text{ m}^2$$",
        },
        {
          correct: true,
          label: "$$1{,}28\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$1{,}6\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$2{,}56\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$3{,}2\\text{ m}^2$$",
        },
      ],
    },
  },
};

export default item;
