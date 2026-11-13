import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "belajar",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Median nilai ujian kesembilan siswa pasti $$70$$.",
        },
        {
          column: 2,
          label:
            "Nilai ujian Gita pasti lebih tinggi daripada nilai ujian setiap siswa yang jam belajarnya lebih banyak daripada Gita.",
        },
        {
          column: 1,
          label:
            "Rata-rata nilai ujian siswa yang jam belajarnya paling sedikit $$8$$ jam per minggu, termasuk Gita, pasti lebih dari $$83$$.",
        },
      ],
    },
  },
};

export default item;
