import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "matrices",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$-13$$",
        },
        {
          correct: false,
          label: "$$-7$$",
        },
        {
          correct: false,
          label: "$$8$$",
        },
        {
          correct: true,
          label: "$$7$$",
        },
        {
          correct: false,
          label: "$$13$$",
        },
      ],
    },
  },
};

export default item;
