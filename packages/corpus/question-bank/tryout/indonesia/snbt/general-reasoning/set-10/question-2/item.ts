import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "strengthening",
  },
  stimulus: "pasar",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Jalan menuju Pasar Kenari sedang diperbaiki pada hari penghitungan sesudah renovasi.",
        },
        {
          correct: false,
          label:
            "Harga sayur dan ikan di kedua pasar naik sedikit sepanjang tahun itu.",
        },
        {
          correct: false,
          label:
            "Pasar di kota lain yang direnovasi juga mencatat kenaikan jumlah pengunjung.",
        },
        {
          correct: false,
          label:
            "Cuaca pada kedua hari penghitungan sama-sama cerah dan tidak hujan.",
        },
        {
          correct: true,
          label:
            "Sebagian pengunjung baru Pasar Cendana mengaku dulu selalu berbelanja di minimarket.",
        },
      ],
    },
  },
};

export default item;
