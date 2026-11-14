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
          label: "$$2$$",
        },
        {
          correct: true,
          label: "$$8$$",
        },
        {
          correct: false,
          label: "$$6$$",
        },
        {
          correct: false,
          label: "$$0$$",
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
