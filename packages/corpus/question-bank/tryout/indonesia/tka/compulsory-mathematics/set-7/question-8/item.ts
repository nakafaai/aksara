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
          label: "$$42$$",
        },
        {
          correct: true,
          label: "$$66$$",
        },
        {
          correct: false,
          label: "$$68$$",
        },
        {
          correct: false,
          label: "$$84$$",
        },
        {
          correct: false,
          label: "$$100$$",
        },
      ],
    },
  },
};

export default item;
