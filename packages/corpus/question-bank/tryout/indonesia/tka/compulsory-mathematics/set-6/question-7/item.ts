import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$6\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$12\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$15\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$18\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$30\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
