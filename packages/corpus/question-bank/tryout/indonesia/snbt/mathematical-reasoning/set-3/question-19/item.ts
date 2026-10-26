import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3{,}2\\text{ km}$$",
        },
        {
          correct: true,
          label: "$$7{,}6\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$6{,}4\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$7{,}0\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$8{,}4\\text{ km}$$",
        },
      ],
    },
  },
};

export default item;
