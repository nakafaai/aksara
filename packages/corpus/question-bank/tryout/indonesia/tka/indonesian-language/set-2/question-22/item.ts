import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  versions: {
    id: {
      columns: ["Hasil", "Keterbatasan"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Rata-rata bagian akhir lebih tinggi pada sesi berjeda",
        },
        {
          column: 2,
          label: "Semua peserta menjalani urutan kondisi yang sama",
        },
        {
          column: 2,
          label: "Peserta berasal dari satu kelas",
        },
      ],
    },
  },
  stimulus: "study-breaks",
};

export default item;
