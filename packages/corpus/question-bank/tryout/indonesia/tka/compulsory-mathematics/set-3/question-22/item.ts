import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "sensor-calibration",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$52$$",
        },
        {
          correct: false,
          label: "$$48$$",
        },
        {
          correct: false,
          label: "$$50$$",
        },
        {
          correct: false,
          label: "$$54$$",
        },
        {
          correct: false,
          label: "$$56$$",
        },
      ],
    },
  },
};

export default item;
