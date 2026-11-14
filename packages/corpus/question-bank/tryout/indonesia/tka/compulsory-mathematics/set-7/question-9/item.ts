import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$a+b>0$$",
        },
        {
          correct: true,
          label: "$$b>0$$",
        },
        {
          correct: true,
          label: "$$a-b+c<0$$",
        },
        {
          correct: true,
          label: "$$2a+b<0$$",
        },
        {
          correct: true,
          label: "$$c\\,(a+b+c)>0$$",
        },
      ],
    },
  },
};

export default item;
