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
          label: "$$1{,}2\\text{ km}$$",
        },
        {
          correct: true,
          label: "$$6\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$\\sqrt{45}\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$7{,}5\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$\\sqrt{85}\\text{ km}$$",
        },
      ],
    },
  },
};

export default item;
