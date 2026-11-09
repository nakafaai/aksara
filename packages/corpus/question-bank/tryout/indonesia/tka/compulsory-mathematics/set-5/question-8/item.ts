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
          label: "$$75$$",
        },
        {
          correct: true,
          label: "$$79$$",
        },
        {
          correct: false,
          label: "$$80$$",
        },
        {
          correct: false,
          label: "$$83$$",
        },
        {
          correct: false,
          label: "$$87$$",
        },
      ],
    },
  },
};

export default item;
