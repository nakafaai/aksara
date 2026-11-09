import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "algebra",
    topic: "sequences-series",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$5$$",
        },
        {
          correct: true,
          label: "$$6$$",
        },
        {
          correct: false,
          label: "$$7$$",
        },
        {
          correct: false,
          label: "$$16$$",
        },
        {
          correct: false,
          label: "$$32$$",
        },
      ],
    },
  },
};

export default item;
