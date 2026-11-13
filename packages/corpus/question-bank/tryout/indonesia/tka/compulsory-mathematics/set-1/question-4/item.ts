import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "linear-equations-inequalities",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$32$$",
        },
        {
          correct: false,
          label: "$$30$$",
        },
        {
          correct: false,
          label: "$$2$$",
        },
        {
          correct: false,
          label: "$$46$$",
        },
        {
          correct: false,
          label: "$$58$$",
        },
      ],
    },
  },
};

export default item;
