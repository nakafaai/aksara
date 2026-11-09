import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "inductive-reasoning",
    topic: "data-comparison",
  },
  stimulus: "belajar",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Nilai rata-rata ujian kelima kelas itu, jika setiap kelas dihitung sama, lebih dari $$75$$.",
        },
        {
          column: 2,
          label:
            "Kelas dengan jam belajar mandiri paling sedikit memiliki persentase siswa ikut bimbingan belajar paling tinggi.",
        },
        {
          column: 1,
          label:
            "Selisih nilai rata-rata ujian kelas XII-5 dan kelas XII-1 adalah $$15$$.",
        },
        {
          column: 1,
          label:
            "Di kelas XII-3, lebih dari dua pertiga siswa mengikuti bimbingan belajar.",
        },
      ],
    },
  },
};

export default item;
