import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "quantitative-reasoning",
    topic: "data-interpretation",
  },
  stimulus: "minuman",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Senin",
        },
        {
          correct: false,
          label: "Selasa",
        },
        {
          correct: false,
          label: "Rabu",
        },
        {
          correct: false,
          label: "Kamis",
        },
        {
          correct: true,
          label: "Jumat",
        },
      ],
    },
  },
};

export default item;
