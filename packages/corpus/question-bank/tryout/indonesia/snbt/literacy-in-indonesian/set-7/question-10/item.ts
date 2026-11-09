import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "explicit-information",
  },
  stimulus: "mobile-library",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Dimas selalu datang paling awal ke balai dusun.",
        },
        {
          column: 1,
          label: "Wulan membawa buku dari perpustakaan kecamatan.",
        },
        {
          column: 1,
          label:
            "Kalimat yang diucapkan Dimas tentang paus biru tidak tertulis di halaman itu.",
        },
        {
          column: 2,
          label: "Wulan menegur Dimas karena berpura-pura dapat membaca.",
        },
      ],
    },
  },
};

export default item;
