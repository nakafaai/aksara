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
          correct: false,
          label: "$$80$$",
        },
        {
          correct: false,
          label: "$$82$$",
        },
        {
          correct: false,
          label: "$$84$$",
        },
        {
          correct: true,
          label: "$$88$$",
        },
        {
          correct: false,
          label: "$$90$$",
        },
      ],
    },
  },
};

export default item;
