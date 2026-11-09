import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "national-exam",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Penulis menganggap masalah perbandingan nilai antarsekolah tidak nyata.",
        },
        {
          column: 1,
          label:
            "Menurut penulis, ujian yang menentukan kelulusan dapat mendorong sekolah memangkas pelajaran yang tidak diujikan.",
        },
        {
          column: 2,
          label:
            "Penulis mengusulkan agar hasil ujian bersama tidak dipakai untuk apa pun.",
        },
        {
          column: 1,
          label:
            "Menurut penulis, taruhan yang lebih rendah menghasilkan data yang lebih dapat dipercaya.",
        },
      ],
    },
  },
};

export default item;
