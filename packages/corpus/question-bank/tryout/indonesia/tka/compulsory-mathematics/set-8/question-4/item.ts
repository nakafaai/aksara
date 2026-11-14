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
          label: "$$7$$",
        },
        {
          correct: false,
          label: "$$26$$",
        },
        {
          correct: true,
          label: "$$28$$",
        },
        {
          correct: false,
          label: "$$29$$",
        },
        {
          correct: false,
          label: "$$35$$",
        },
      ],
    },
  },
};

export default item;
