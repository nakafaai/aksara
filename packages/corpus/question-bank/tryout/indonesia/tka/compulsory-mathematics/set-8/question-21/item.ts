import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "ogif",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$37$$",
        },
        {
          correct: false,
          label: "$$40$$",
        },
        {
          correct: false,
          label: "$$42$$",
        },
        {
          correct: false,
          label: "$$44$$",
        },
        {
          correct: false,
          label: "$$50$$",
        },
      ],
    },
  },
};

export default item;
