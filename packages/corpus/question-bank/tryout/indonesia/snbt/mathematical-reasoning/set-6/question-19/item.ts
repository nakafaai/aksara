import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "speed-cameras",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Mobil yang tidak dinyatakan melanggar pasti tidak pernah melaju lebih dari 100 km/jam pada saat mana pun di antara kedua kamera.",
        },
        { column: 1, label: "Mobil P tidak dinyatakan melanggar." },
        {
          column: 2,
          label:
            "Kecepatan rata-rata mobil S di antara kedua kamera adalah 115 km/jam.",
        },
        {
          column: 1,
          label:
            "Waktu tempuh paling singkat di antara kedua kamera tanpa dinyatakan melanggar adalah 7 menit 12 detik.",
        },
      ],
    },
  },
};

export default item;
