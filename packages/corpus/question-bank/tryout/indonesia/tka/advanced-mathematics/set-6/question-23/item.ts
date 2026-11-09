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
          label: "$$1$$",
        },
        {
          correct: false,
          label: "$$6$$",
        },
        {
          correct: false,
          label: "$$\\infty$$",
        },
        {
          correct: true,
          label: "$$2$$",
        },
      ],
    },
  },
};

export default item;
