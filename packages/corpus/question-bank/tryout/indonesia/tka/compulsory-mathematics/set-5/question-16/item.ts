import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "village-pool",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$125\\text{ m}^3$$",
        },
        {
          correct: false,
          label: "$$187{,}5\\text{ m}^3$$",
        },
        {
          correct: false,
          label: "$$250\\text{ m}^3$$",
        },
        {
          correct: true,
          label: "$$375\\text{ m}^3$$",
        },
        {
          correct: false,
          label: "$$500\\text{ m}^3$$",
        },
      ],
    },
  },
};

export default item;
