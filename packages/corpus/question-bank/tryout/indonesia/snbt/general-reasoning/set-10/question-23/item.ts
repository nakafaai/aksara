import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "quantitative-reasoning",
    topic: "data-interpretation",
  },
  stimulus: "internet",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Paket Hemat",
        },
        {
          correct: true,
          label: "Paket Keluarga",
        },
        {
          correct: false,
          label: "Paket Super",
        },
        {
          correct: false,
          label: "Paket Pelajar",
        },
        {
          correct: false,
          label: "Paket Keluarga dan Paket Super sama murahnya",
        },
      ],
    },
  },
};

export default item;
