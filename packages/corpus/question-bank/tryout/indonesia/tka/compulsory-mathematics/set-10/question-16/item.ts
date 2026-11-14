import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "grain-silo",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$28{,}26\\text{ m}^3$$",
        },
        {
          correct: false,
          label: "$$37{,}68\\text{ m}^3$$",
        },
        {
          correct: false,
          label: "$$94{,}2\\text{ m}^3$$",
        },
        {
          correct: false,
          label: "$$188{,}4\\text{ m}^3$$",
        },
        {
          correct: true,
          label: "$$282{,}6\\text{ m}^3$$",
        },
      ],
    },
  },
};

export default item;
