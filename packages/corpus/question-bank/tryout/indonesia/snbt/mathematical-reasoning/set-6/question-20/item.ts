import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0{,}72\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$1{,}44\\text{ km}$$",
        },
        {
          correct: true,
          label: "$$2{,}88\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$3{,}66\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$4{,}20\\text{ km}$$",
        },
      ],
    },
  },
};

export default item;
