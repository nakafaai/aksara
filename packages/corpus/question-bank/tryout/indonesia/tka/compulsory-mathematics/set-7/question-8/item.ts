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
          label: "$$62$$",
        },
        {
          correct: true,
          label: "$$66$$",
        },
        {
          correct: false,
          label: "$$64$$",
        },
        {
          correct: false,
          label: "$$44$$",
        },
        {
          correct: false,
          label: "$$70$$",
        },
      ],
    },
  },
};

export default item;
