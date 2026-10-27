import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0{,}50\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$1{,}22\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$2{,}40\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$2{,}50\\text{ km}$$",
        },
        {
          correct: true,
          label: "$$1{,}44\\text{ km}$$",
        },
      ],
    },
  },
};

export default item;
