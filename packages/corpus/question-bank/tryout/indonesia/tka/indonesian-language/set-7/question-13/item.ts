import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  stimulus: "reading-minutes",
  versions: {
    id: {
      columns: [
        "Pelaksanaan program",
        "Data yang dilaporkan",
        "Tindak lanjut sekolah",
      ],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Peminjaman naik menjadi rata-rata 310 buku per bulan.",
        },
        { column: 3, label: "Pojok baca ditambahkan di setiap kelas." },
        { column: 1, label: "Siswa membaca buku pilihan sendiri setiap pagi." },
        {
          column: 2,
          label:
            "25 dari 64 siswa mengaku membaca di rumah setidaknya dua kali seminggu.",
        },
      ],
    },
  },
};

export default item;
