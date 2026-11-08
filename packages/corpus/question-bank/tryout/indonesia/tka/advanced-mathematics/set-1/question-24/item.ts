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
          label: "$$8$$",
        },
        {
          correct: true,
          label: "$$4$$",
        },
        {
          correct: false,
          label: "$$2$$",
        },
        {
          correct: false,
          label: "$$1$$",
        },
        {
          correct: false,
          label: "$$0$$",
        },
      ],
    },
  },
};

export default item;
