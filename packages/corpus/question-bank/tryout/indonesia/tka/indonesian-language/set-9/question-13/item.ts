import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  stimulus: "silat-club",
  versions: {
    id: {
      columns: [
        "Perkembangan ekstrakurikuler",
        "Masalah yang muncul",
        "Langkah sekolah",
      ],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Anggota naik dari 25 menjadi 70 siswa dalam dua tahun.",
        },
        { column: 2, label: "Lapangan latihan hanya muat sekitar 40 siswa." },
        {
          column: 3,
          label: "Dua anggota senior dilatih menjadi asisten pelatih.",
        },
        { column: 2, label: "Beberapa siswa baru keluar setelah sebulan." },
      ],
    },
  },
};

export default item;
