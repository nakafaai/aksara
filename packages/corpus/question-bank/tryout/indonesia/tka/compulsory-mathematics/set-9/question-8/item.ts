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
          correct: true,
          label: "$$18$$",
        },
        {
          correct: false,
          label: "$$22$$",
        },
        {
          correct: false,
          label: "$$25$$",
        },
        {
          correct: false,
          label: "$$28$$",
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
