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
          label: "$$0{,}88$$",
        },
        {
          correct: true,
          label: "$$0{,}96$$",
        },
        {
          correct: false,
          label: "$$0{,}92$$",
        },
        {
          correct: false,
          label: "$$1{,}00$$",
        },
        {
          correct: false,
          label: "$$1{,}04$$",
        },
      ],
    },
  },
  stimulus: "water-tank",
};

export default item;
