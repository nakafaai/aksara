import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "inference",
  },
  stimulus: "tabungan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kerajinan dan kompos tidak memerlukan pemilahan sampah sama sekali.",
        },
        {
          correct: false,
          label:
            "Pemerintah membeli semua kerajinan dan kompos dengan harga tetap.",
        },
        {
          correct: false,
          label:
            "Warga tidak perlu lagi menyetor sampah ke bank sampah tersebut.",
        },
        {
          correct: true,
          label:
            "Sebagian pendapatannya berasal dari produk yang harganya lebih stabil, sehingga tidak sepenuhnya bergantung pada harga barang bekas.",
        },
        {
          correct: false,
          label:
            "Harga barang bekas di bank sampah tersebut tidak pernah turun.",
        },
      ],
    },
  },
};

export default item;
