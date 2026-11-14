import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "data-interpretation",
  },
  stimulus: "dermaga",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Jumat",
        },
        {
          correct: false,
          label: "Sabtu",
        },
        {
          correct: false,
          label: "Minggu",
        },
        {
          correct: false,
          label: "Senin",
        },
        {
          correct: false,
          label: "Kamis",
        },
      ],
    },
  },
};

export default item;
