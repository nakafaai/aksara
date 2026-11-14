import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "probability",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$105$$",
        },
        {
          correct: false,
          label: "$$90$$",
        },
        {
          correct: false,
          label: "$$72$$",
        },
        {
          correct: false,
          label: "$$54$$",
        },
        {
          correct: true,
          label: "$$36$$",
        },
      ],
    },
  },
};

export default item;
