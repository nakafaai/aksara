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
          label: "$$30\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$0{,}015\\text{ km}^2$$",
        },
        {
          correct: false,
          label: "$$0{,}15\\text{ km}^2$$",
        },
        {
          correct: true,
          label: "$$1{,}5\\text{ km}^2$$",
        },
        {
          correct: false,
          label: "$$3\\text{ km}^2$$",
        },
      ],
    },
  },
};

export default item;
