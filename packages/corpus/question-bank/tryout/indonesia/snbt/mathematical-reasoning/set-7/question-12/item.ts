import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$60 \\text{ km}$$",
        },
        {
          correct: false,
          label: "$$50 \\text{ km}$$",
        },
        {
          correct: false,
          label: "$$80 \\text{ km}$$",
        },
        {
          correct: false,
          label: "$$90 \\text{ km}$$",
        },
        {
          correct: false,
          label: "$$95 \\text{ km}$$",
        },
      ],
    },
  },
};

export default item;
