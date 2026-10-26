import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "continuation",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "remaja kampung merawat tanda darurat secara bergiliran",
        },
        {
          correct: false,
          label:
            "Raka menyerahkan pemantauan laut kepada remaja setelah sistem darurat dipasang",
        },
        {
          correct: false,
          label:
            "penjaga pantai membatasi penggunaan dermaga sampai tanda darurat diperiksa",
        },
        {
          correct: false,
          label: "warga melarang penggunaan lampu baru",
        },
        {
          correct: false,
          label:
            "Raka menyimpan lampu lama tanpa melanjutkan sistem darurat bersama remaja kampung",
        },
      ],
    },
  },
  stimulus: "harbor-lamp",
};

export default item;
