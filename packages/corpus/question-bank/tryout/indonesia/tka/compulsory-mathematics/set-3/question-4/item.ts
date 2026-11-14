import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$-76$$",
        },
        {
          correct: false,
          label: "$$-72$$",
        },
        {
          correct: false,
          label: "$$-64$$",
        },
        {
          correct: false,
          label: "$$-4$$",
        },
        {
          correct: false,
          label: "$$76$$",
        },
      ],
    },
  },
};

export default item;
