import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "linear-equations-inequalities",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$122$$",
        },
        {
          correct: false,
          label: "$$132$$",
        },
        {
          correct: true,
          label: "$$138$$",
        },
        {
          correct: false,
          label: "$$150$$",
        },
        {
          correct: false,
          label: "$$186$$",
        },
      ],
    },
  },
};

export default item;
