import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$250$$",
        },
        {
          correct: true,
          label: "$$500$$",
        },
        {
          correct: false,
          label: "$$1{.}000$$",
        },
        {
          correct: false,
          label: "$$5{.}000$$",
        },
        {
          correct: false,
          label: "$$50{.}000$$",
        },
      ],
    },
  },
};

export default item;
