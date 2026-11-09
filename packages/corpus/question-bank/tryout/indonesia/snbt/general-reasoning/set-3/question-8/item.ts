import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "evaluation",
  },
  stimulus: "kantong",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Perbandingan jumlah plastik dari kantong belanja yang berkurang dengan jumlah plastik dari kantong sampah yang bertambah, misalnya dalam satuan berat.",
        },
        {
          correct: false,
          label: "Harga satu kantong sampah plastik di minimarket.",
        },
        {
          correct: false,
          label: "Banyak minimarket di kota tersebut.",
        },
        {
          correct: false,
          label:
            "Alasan warga membawa tas belanja sendiri, misalnya karena ingin menghemat pengeluaran atau karena mengikuti anjuran pemerintah kota tentang sampah plastik.",
        },
        {
          correct: false,
          label: "Warna kantong sampah yang paling banyak terjual.",
        },
      ],
    },
  },
};

export default item;
