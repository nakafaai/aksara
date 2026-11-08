import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$-10$$",
        },
        {
          correct: false,
          label: "$$-6$$",
        },
        {
          correct: false,
          label: "$$\\frac23$$",
        },
        {
          correct: false,
          label: "$$6$$",
        },
        {
          correct: true,
          label: "$$10$$",
        },
      ],
    },
  },
};

export default item;
