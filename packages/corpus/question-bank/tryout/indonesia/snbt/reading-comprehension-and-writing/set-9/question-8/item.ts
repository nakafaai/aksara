import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "referent",
  },
  stimulus: "food-bank",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "makanan yang dibeli keluarga yang membutuhkan",
        },
        {
          correct: true,
          label: "sisa makanan layak santap yang dijemput dari usaha katering",
        },
        {
          correct: false,
          label: "makanan yang sudah disajikan kepada tamu",
        },
        {
          correct: false,
          label: "makanan yang berbau atau berlendir",
        },
        {
          correct: false,
          label: "makanan yang dijual mahasiswa",
        },
      ],
    },
  },
};

export default item;
