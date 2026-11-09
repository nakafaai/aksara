import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "evaluation",
  },
  stimulus: "kipas",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Harga tiket kolam renang pada setiap bulan.",
        },
        {
          correct: false,
          label: "Jumlah karyawan toko elektronik pada setiap bulan.",
        },
        {
          correct: false,
          label: "Merek kipas angin yang paling banyak terjual.",
        },
        {
          correct: false,
          label:
            "Lama penutupan kolam renang pada bulan Mei dalam hari, beserta alasan perbaikan yang dilakukan pengelola kolam renang.",
        },
        {
          correct: true,
          label:
            "Penjualan kipas angin dan rata-rata suhu maksimum pada bulan-bulan yang sama di beberapa tahun sebelumnya.",
        },
      ],
    },
  },
};

export default item;
