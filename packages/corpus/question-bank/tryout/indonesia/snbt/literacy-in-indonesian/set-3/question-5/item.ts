import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "paragraph-relation",
  },
  stimulus: "mangrove-carbon",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "paragraf ketiga membantah temuan paragraf kedua tentang simpanan karbon",
        },
        {
          correct: false,
          label:
            "paragraf ketiga mengulang penjelasan paragraf kedua dengan contoh yang berbeda",
        },
        {
          correct: false,
          label:
            "paragraf ketiga memperkenalkan peran mangrove yang sama sekali baru",
        },
        {
          correct: false,
          label:
            "paragraf ketiga menyimpulkan seluruh isi bacaan tentang mangrove",
        },
        {
          correct: true,
          label:
            "paragraf ketiga menjelaskan akibat jika simpanan karbon dalam paragraf kedua terganggu",
        },
      ],
    },
  },
};

export default item;
