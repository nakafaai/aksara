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
          label: "$$2$$",
        },
        {
          correct: false,
          label: "$$4$$",
        },
        {
          correct: true,
          label: "$$-4$$",
        },
        {
          correct: false,
          label: "$$-2$$",
        },
        {
          correct: false,
          label: "$$0$$",
        },
      ],
    },
  },
};

export default item;
