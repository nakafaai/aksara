import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
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
          label: "$$\\frac12$$",
        },
        {
          correct: false,
          label: "$$1$$",
        },
        {
          correct: true,
          label: "$$2$$",
        },
        {
          correct: false,
          label: "$$4$$",
        },
      ],
    },
  },
};

export default item;
