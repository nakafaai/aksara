import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "data-inference",
  },
  stimulus: "kipas",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Penjualan kipas angin naik karena kolam renang semakin ramai.",
        },
        {
          correct: false,
          label:
            "Penutupan kolam renang pada bulan Mei menurunkan penjualan kipas angin karena warga yang biasanya berenang memilih tetap tinggal di rumah tanpa membeli kipas baru.",
        },
        {
          correct: false,
          label: "Suhu udara tidak berkaitan dengan penjualan kipas angin.",
        },
        {
          correct: true,
          label:
            "Penjualan kipas angin dan pengunjung kolam renang cenderung lebih tinggi pada bulan yang lebih panas, kecuali pengunjung kolam pada bulan Mei ketika kolam ditutup.",
        },
        {
          correct: false,
          label:
            "Pengunjung kolam renang pada bulan Mei sedikit karena suhu udara terlalu panas.",
        },
      ],
    },
  },
};

export default item;
