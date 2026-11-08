import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "calculus",
    topic: "limits",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0$$",
        },
        {
          correct: false,
          label: "$$\\frac{5}{12}$$",
        },
        {
          correct: true,
          label: "$$\\frac{12}{5}$$",
        },
        {
          correct: false,
          label: "$$12$$",
        },
        {
          correct: false,
          label: "$$\\infty$$",
        },
      ],
    },
  },
};

export default item;
