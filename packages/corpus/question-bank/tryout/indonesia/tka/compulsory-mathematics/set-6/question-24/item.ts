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
          label: "$$15$$ kali",
        },
        {
          correct: false,
          label: "$$60$$ kali",
        },
        {
          correct: false,
          label: "$$75$$ kali",
        },
        {
          correct: true,
          label: "$$90$$ kali",
        },
        {
          correct: false,
          label: "$$105$$ kali",
        },
      ],
    },
  },
};

export default item;
