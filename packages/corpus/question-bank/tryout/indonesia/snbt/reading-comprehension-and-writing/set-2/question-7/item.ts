import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "argument-evaluation",
  },
  stimulus: "plastic-free-market",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Sepanjang tahun ini, dua pasar terdekat dari Sukamaju tutup karena direnovasi.",
        },
        {
          correct: false,
          label: "Tas kain di pintu masuk pasar dijual dengan harga murah.",
        },
        {
          correct: false,
          label:
            "Pedagang ikan di pasar itu mendukung larangan kantong plastik sejak awal.",
        },
        {
          correct: false,
          label:
            "Pembeli menyukai pasar yang lantainya tidak dipenuhi sampah plastik.",
        },
        {
          correct: false,
          label:
            "Selokan yang bersih membuat jalan di sekitar pasar tidak tergenang.",
        },
      ],
    },
  },
};

export default item;
