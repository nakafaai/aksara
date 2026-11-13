import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "kaca",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$106\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$62\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$58\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$50\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$42{,}625\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
