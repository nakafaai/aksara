import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "gambut",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "penuh terisi air",
        },
        {
          correct: false,
          label: "tertutup lumpur tebal",
        },
        {
          correct: false,
          label: "baru dibangun ulang",
        },
        {
          correct: true,
          label: "rusak dan berlubang",
        },
        {
          correct: false,
          label: "terlalu tinggi",
        },
      ],
    },
  },
};

export default item;
