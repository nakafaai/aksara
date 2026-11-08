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
          label: "$$1{,}5\\text{ km}$$",
        },
        {
          correct: true,
          label: "$$2{,}5\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$3{,}5\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$10\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$25\\text{ km}$$",
        },
      ],
    },
  },
};

export default item;
