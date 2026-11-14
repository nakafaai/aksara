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
          label: "$$3$$",
        },
        {
          correct: false,
          label: "$$2$$",
        },
        {
          correct: false,
          label: "$$\\infty$$",
        },
        {
          correct: true,
          label: "$$4$$",
        },
        {
          correct: false,
          label: "$$8$$",
        },
      ],
    },
  },
};

export default item;
