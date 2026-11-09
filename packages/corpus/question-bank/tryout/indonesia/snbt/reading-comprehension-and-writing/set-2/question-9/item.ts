import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "word-meaning",
  },
  stimulus: "plastic-free-market",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "mudah dicapai dari rumah pembeli",
        },
        {
          correct: true,
          label: "harganya dapat dibayar oleh pembeli",
        },
        {
          correct: false,
          label: "tersedia dalam jumlah yang banyak",
        },
        {
          correct: false,
          label: "dibuat dari bahan yang kuat",
        },
        {
          correct: false,
          label: "diberikan tanpa bayaran",
        },
      ],
    },
  },
};

export default item;
