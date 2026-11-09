import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "taman-siswa",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Ki Hadjar ingin Taman Siswa meniru sekolah Eropa sepenuhnya.",
        },
        {
          column: 2,
          label:
            "Dalam sistem among, guru berperan sebagai penguasa yang memerintah.",
        },
        {
          column: 1,
          label: "Taman Siswa didirikan di Yogyakarta pada 1922.",
        },
        {
          column: 1,
          label:
            "Peraturan tahun 1932 tentang sekolah swasta akhirnya dicabut setelah protes meluas.",
        },
      ],
    },
  },
};

export default item;
