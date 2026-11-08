import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "quantitative-reasoning",
    topic: "motion",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$300\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$450\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$525\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$600\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$750\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
