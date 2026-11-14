import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  stimulus: "clinic-queue",
  versions: {
    id: {
      columns: ["Hasil yang dilaporkan", "Keluhan", "Tanggapan puskesmas"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Rata-rata waktu tunggu tercatat turun menjadi 40 menit.",
        },
        {
          column: 2,
          label: "Pesan singkat terlambat masuk di desa yang sinyalnya lemah.",
        },
        {
          column: 3,
          label: "Kader posyandu dilatih mengambilkan nomor antrean.",
        },
        {
          column: 2,
          label: "Pak Harun baru mendapat nomor dua jam setelah tiba.",
        },
      ],
    },
  },
};

export default item;
