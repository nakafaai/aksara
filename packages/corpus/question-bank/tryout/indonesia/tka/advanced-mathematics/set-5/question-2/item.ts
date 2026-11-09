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
          label: "$$550$$",
        },
        {
          correct: false,
          label: "$$500$$",
        },
        {
          correct: true,
          label: "$$575$$",
        },
        {
          correct: false,
          label: "$$600$$",
        },
        {
          correct: false,
          label: "$$425$$",
        },
      ],
    },
  },
};

export default item;
