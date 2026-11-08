import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "monthly-rainfall",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Jumlah curah hujan enam bulan pertama sama dengan jumlah curah hujan enam bulan terakhir.",
        },
        {
          column: 1,
          label:
            "Curah hujan bulan Desember lebih dari 8 kali curah hujan bulan Agustus.",
        },
        {
          column: 2,
          label:
            "Penurunan curah hujan terbesar dari satu bulan ke bulan berikutnya terjadi dari Maret ke April.",
        },
        {
          column: 1,
          label: "Banyak bulan basah lebih dari dua kali banyak bulan kering.",
        },
      ],
    },
  },
};

export default item;
