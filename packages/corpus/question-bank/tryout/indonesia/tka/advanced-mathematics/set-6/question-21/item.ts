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
          label: "$$\\frac34$$",
        },
        {
          correct: false,
          label: "$$4$$",
        },
        {
          correct: false,
          label: "$$1$$",
        },
        {
          correct: true,
          label: "$$\\frac43$$",
        },
        {
          correct: false,
          label: "$$12$$",
        },
      ],
    },
  },
};

export default item;
