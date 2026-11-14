import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "hotel-occupancy",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Banyak kamar terisi per malam pada musim sepi di Karangwangi naik dari 2023 ke 2024.",
        },
        {
          column: 2,
          label:
            "Pendapatan hotel berbintang di Karangwangi pada musim ramai 2024 lebih tinggi daripada pada musim ramai 2023.",
        },
        {
          column: 2,
          label:
            "Tingkat hunian setiap hotel lama di Karangwangi turun dari 2023 ke 2024.",
        },
        {
          column: 1,
          label:
            "Tingkat hunian musim ramai Karangwangi turun karena banyak kamar tersedia bertambah lebih cepat daripada banyak kamar terisi.",
        },
      ],
    },
  },
};

export default item;
