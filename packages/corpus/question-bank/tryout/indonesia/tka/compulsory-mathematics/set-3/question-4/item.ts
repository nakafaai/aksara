import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$144\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$324\\text{ km}$$",
        },
        {
          correct: true,
          label: "$$396\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$540\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$576\\text{ km}$$",
        },
      ],
    },
  },
};

export default item;
