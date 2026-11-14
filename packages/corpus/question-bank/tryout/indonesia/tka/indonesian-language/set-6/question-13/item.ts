import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  stimulus: "eye-screening",
  versions: {
    id: {
      columns: [
        "Hasil pemeriksaan",
        "Penyebab kacamata belum dipakai",
        "Tindak lanjut",
      ],
      kind: "matrix",
      statements: [
        { column: 1, label: "Sebanyak 120 siswa membutuhkan kacamata." },
        { column: 2, label: "Sebagian siswa malu diejek teman." },
        { column: 3, label: "Sebuah yayasan memberikan kacamata gratis." },
        {
          column: 2,
          label: "Sebagian orang tua menganggap harga kacamata terlalu mahal.",
        },
      ],
    },
  },
};

export default item;
