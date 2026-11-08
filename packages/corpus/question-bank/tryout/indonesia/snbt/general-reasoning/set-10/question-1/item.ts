import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "conclusion",
  },
  stimulus: "pasar",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Renovasi Pasar Cendana mendatangkan tepat 600 pembeli baru ke kawasan itu setiap hari.",
        },
        {
          correct: false,
          label:
            "Pedagang di Pasar Kenari menaikkan harga dagangannya setelah Pasar Cendana direnovasi.",
        },
        {
          correct: true,
          label:
            "Sebagian kenaikan pengunjung Pasar Cendana mungkin berasal dari Pasar Kenari.",
        },
        {
          correct: false,
          label:
            "Jumlah pengunjung kedua pasar bersama-sama naik lebih dari dua kali lipat setelah renovasi.",
        },
        {
          correct: false,
          label:
            "Renovasi tidak berpengaruh apa pun terhadap jumlah pengunjung di kedua pasar itu.",
        },
      ],
    },
  },
};

export default item;
