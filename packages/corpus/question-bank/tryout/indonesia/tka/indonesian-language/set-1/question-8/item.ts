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
          isCorrect: true,
          label: "remaja kampung merawat tanda darurat secara bergiliran",
        },
        {
          isCorrect: false,
          label:
            "Raka menyerahkan pemantauan laut kepada remaja setelah sistem darurat dipasang",
        },
        {
          isCorrect: false,
          label:
            "penjaga pantai membatasi penggunaan dermaga sampai tanda darurat diperiksa",
        },
        {
          isCorrect: false,
          label: "warga melarang penggunaan lampu baru",
        },
        {
          isCorrect: false,
          label:
            "Raka menyimpan lampu lama tanpa melanjutkan sistem darurat bersama remaja kampung",
        },
      ],
    },
  },
  stimulusKey: "harbor-lamp",
};

export default item;
