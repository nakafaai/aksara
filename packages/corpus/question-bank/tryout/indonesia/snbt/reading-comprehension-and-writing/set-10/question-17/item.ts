import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "data-interpretation",
  },
  stimulus: "running-club",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Jumlah anggota yang ikut latihan naik setiap bulan.",
        },
        {
          column: 2,
          label:
            "Rata-rata waktu pada bulan Maret lebih singkat 4 menit daripada rata-rata waktu pada bulan Januari.",
        },
        {
          column: 1,
          label: "Rata-rata waktu anggota makin singkat setiap bulan.",
        },
        {
          column: 1,
          label:
            "Jumlah anggota yang ikut latihan pada bulan Maret satu setengah kali jumlah pada bulan Januari.",
        },
      ],
    },
  },
};

export default item;
