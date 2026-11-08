import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "jamu",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "dikeringkan lebih dulu di bawah sinar matahari",
        },
        {
          correct: false,
          label: "dicampur dengan bahan kimia buatan pabrik",
        },
        {
          correct: true,
          label: "dibuat seragam menurut standar tertentu",
        },
        {
          correct: false,
          label: "dijual dengan harga yang lebih murah",
        },
        {
          correct: false,
          label: "dibungkus dalam kemasan yang rapat",
        },
      ],
    },
  },
};

export default item;
