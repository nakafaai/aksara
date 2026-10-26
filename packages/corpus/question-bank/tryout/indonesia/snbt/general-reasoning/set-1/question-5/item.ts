import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Angka itu merupakan bagian anggaran yang tersisa untuk kebutuhan kementerian lainnya.",
        },
        {
          correct: false,
          label: "Angka itu merupakan kenaikan produksi padi yang dilaporkan.",
        },
        {
          correct: true,
          label:
            "Angka itu merupakan bagian dari total anggaran kementerian yang dibelanjakan untuk sarana dan prasarana produksi pertanian.",
        },
        {
          correct: false,
          label:
            "Angka itu merupakan kenaikan produksi jagung yang dilaporkan.",
        },
        {
          correct: false,
          label:
            "Angka itu merupakan bagian anggaran yang hanya digunakan untuk mengatur impor.",
        },
      ],
    },
  },
};

export default item;
