import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$30$$",
        },
        {
          correct: false,
          label: "$$27$$",
        },
        {
          correct: false,
          label: "$$29$$",
        },
        {
          correct: false,
          label: "$$31$$",
        },
        {
          correct: false,
          label: "$$32$$",
        },
      ],
    },
  },
};

export default item;
