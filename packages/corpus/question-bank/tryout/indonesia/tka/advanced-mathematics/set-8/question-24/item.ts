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
          label: "$$4\\sqrt2$$",
        },
        {
          correct: false,
          label: "$$16$$",
        },
        {
          correct: true,
          label: "$$4$$",
        },
        {
          correct: false,
          label: "$$8$$",
        },
        {
          correct: false,
          label: "$$2\\sqrt2$$",
        },
      ],
    },
  },
};

export default item;
