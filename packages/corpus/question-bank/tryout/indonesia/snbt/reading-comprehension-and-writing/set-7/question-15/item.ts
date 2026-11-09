import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "text-structure",
  },
  stimulus: "coffee-picking",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "keadaan dulu dan masalahnya, perubahan cara, lalu hasil perubahan itu",
        },
        {
          correct: false,
          label: "hasil, lalu penyebab hasil itu",
        },
        {
          correct: false,
          label: "pendapat, lalu bukti yang mendukung pendapat itu",
        },
        {
          correct: false,
          label: "perbandingan keadaan dua desa",
        },
        {
          correct: false,
          label: "langkah-langkah mengolah kopi dari awal sampai akhir",
        },
      ],
    },
  },
};

export default item;
