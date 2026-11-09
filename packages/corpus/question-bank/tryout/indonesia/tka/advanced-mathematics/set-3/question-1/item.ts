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
          label: "$$65$$",
        },
        {
          correct: false,
          label: "$$160$$",
        },
        {
          correct: true,
          label: "$$144$$",
        },
        {
          correct: false,
          label: "$$224$$",
        },
        {
          correct: false,
          label: "$$96$$",
        },
      ],
    },
  },
};

export default item;
