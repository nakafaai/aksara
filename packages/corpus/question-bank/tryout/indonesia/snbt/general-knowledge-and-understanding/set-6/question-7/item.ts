import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "word-relation",
    topic: "analogy",
  },
  stimulus: "abu",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "roda : sepeda",
        },
        {
          correct: false,
          label: "nelayan : ikan",
        },
        {
          correct: true,
          label: "madu : lebah",
        },
        {
          correct: false,
          label: "air : gelas",
        },
        {
          correct: false,
          label: "dokter : pasien",
        },
      ],
    },
  },
};

export default item;
