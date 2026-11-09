import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$35$$",
        },
        {
          correct: false,
          label: "$$45$$",
        },
        {
          correct: false,
          label: "$$70$$",
        },
        {
          correct: false,
          label: "$$80$$",
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
