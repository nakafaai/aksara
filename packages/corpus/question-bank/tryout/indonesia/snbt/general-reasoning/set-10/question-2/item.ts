import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "strengthening",
  },
  stimulus: "sepeda",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Jalan Cempaka sedang diperbaiki pada hari penghitungan sesudah jalur dibangun.",
        },
        {
          correct: false,
          label:
            "Harga sepeda di toko-toko Kota Lembayung naik sepanjang tahun itu.",
        },
        {
          correct: false,
          label:
            "Kota lain yang membangun jalur sepeda juga mencatat kenaikan jumlah pesepeda.",
        },
        {
          correct: false,
          label:
            "Cuaca pada kedua hari penghitungan sama-sama cerah dan tidak berangin.",
        },
        {
          correct: true,
          label:
            "Sebagian pengguna jalur baru mengaku dulu pergi bekerja dengan sepeda motor.",
        },
      ],
    },
  },
};

export default item;
