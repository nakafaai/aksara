import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$12\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$10\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$15\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$16\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$20\\text{ km}$$",
        },
      ],
    },
  },
};

export default item;
