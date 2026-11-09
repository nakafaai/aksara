import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "data-interpretation",
  },
  stimulus: "minibus-schedule",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Rata-rata penumpang per hari paling tinggi terjadi pada bulan April.",
        },
        {
          column: 2,
          label:
            "Rata-rata waktu tunggu terus turun dari bulan Januari sampai bulan April.",
        },
        {
          column: 2,
          label:
            "Rata-rata penumpang pada bulan April lebih dari satu setengah kali rata-rata penumpang pada bulan Maret.",
        },
        {
          column: 1,
          label:
            "Pada bulan Februari, rata-rata penumpang paling sedikit dan rata-rata waktu tunggu paling lama.",
        },
      ],
    },
  },
};

export default item;
