import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$35\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$41\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$45\\text{ km}$$",
        },
        {
          correct: true,
          label: "$$31\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$48\\text{ km}$$",
        },
      ],
    },
  },
};

export default item;
