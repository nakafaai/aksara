import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$40\\text{ km}$$",
        },
        {
          correct: true,
          label: "$$10\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$30\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$20\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$5\\text{ km}$$",
        },
      ],
    },
  },
};

export default item;
