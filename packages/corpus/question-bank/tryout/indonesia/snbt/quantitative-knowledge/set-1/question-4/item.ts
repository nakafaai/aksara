import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$24 \\text{ km/jam}$$",
        },
        {
          correct: false,
          label: "$$48 \\text{ km/jam}$$",
        },
        {
          correct: false,
          label: "$$72 \\text{ km/jam}$$",
        },
        {
          correct: true,
          label: "$$120 \\text{ km/jam}$$",
        },
        {
          correct: false,
          label: "$$96 \\text{ km/jam}$$",
        },
      ],
    },
  },
};

export default item;
