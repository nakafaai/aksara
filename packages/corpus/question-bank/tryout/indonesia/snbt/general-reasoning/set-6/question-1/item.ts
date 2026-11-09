import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "conclusion",
  },
  stimulus: "piring",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Makanan yang benar-benar dimakan setiap karyawan turun $$80$$ gram setelah piring diganti.",
        },
        {
          correct: true,
          label:
            "Piring kecil mengurangi makanan yang diambil meski lebih banyak karyawan mengambil lebih dari sekali.",
        },
        {
          correct: false,
          label:
            "Semua karyawan mengambil makanan lebih dari sekali setelah kantin mulai memakai piring yang berdiameter lebih kecil.",
        },
        {
          correct: false,
          label:
            "Penggantian piring membuat kantin merugi karena harga makan siang tidak ikut turun.",
        },
        {
          correct: false,
          label:
            "Karyawan menjadi lebih cepat lapar pada sore hari karena makan siang mereka berkurang.",
        },
      ],
    },
  },
};

export default item;
