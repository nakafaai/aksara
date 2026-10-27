import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$ab=1$$",
        },
        {
          correct: true,
          label: "$$a-b=4$$",
        },
        {
          correct: true,
          label: "$$a^2+b^2=18$$",
        },
        {
          correct: false,
          label: "$$a+b=4$$",
        },
        {
          correct: true,
          label: "$$a^2-4a-1=0$$",
        },
      ],
    },
  },
};

export default item;
