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
          correct: true,
          label: "$$0$$",
        },
        {
          correct: false,
          label: "$$\\frac{5}{3}$$",
        },
        {
          correct: false,
          label: "$$4$$",
        },
        {
          correct: false,
          label: "$$20$$",
        },
        {
          correct: false,
          label: "$$95$$",
        },
      ],
    },
  },
};

export default item;
