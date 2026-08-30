import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "continuation",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Raka berhenti memperhatikan keadaan laut",
        },
        {
          isCorrect: true,
          label: "remaja kampung merawat tanda darurat secara bergiliran",
        },
        {
          isCorrect: false,
          label: "penjaga pantai menutup seluruh dermaga",
        },
        {
          isCorrect: false,
          label: "warga melarang penggunaan lampu baru",
        },
        {
          isCorrect: false,
          label: "Raka menjual semua barang peninggalan ayahnya",
        },
      ],
    },
  },
  stimulusKey: "harbor-lamp",
};

export default item;
