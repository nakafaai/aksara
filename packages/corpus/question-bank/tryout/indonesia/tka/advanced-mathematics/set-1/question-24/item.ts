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
          label: "$$\frac32$$",
        },
        {
          correct: true,
          label: "$$3$$",
        },
        {
          correct: false,
          label: "$$6$$",
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
