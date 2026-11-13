import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "atap",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1{.}540$$",
        },
        {
          correct: false,
          label: "$$1{.}740$$",
        },
        {
          correct: false,
          label: "$$1{.}755$$",
        },
        {
          correct: false,
          label: "$$1{.}800$$",
        },
        {
          correct: true,
          label: "$$1{.}840$$",
        },
      ],
    },
  },
};

export default item;
