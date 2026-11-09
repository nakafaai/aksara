import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "tabungan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Naik sedikit demi sedikit",
        },
        {
          correct: true,
          label: "Turun dengan tajam",
        },
        {
          correct: false,
          label: "Tidak berubah sama sekali",
        },
        {
          correct: false,
          label: "Naik dan turun berganti-ganti",
        },
        {
          correct: false,
          label: "Hilang dari pasaran",
        },
      ],
    },
  },
};

export default item;
