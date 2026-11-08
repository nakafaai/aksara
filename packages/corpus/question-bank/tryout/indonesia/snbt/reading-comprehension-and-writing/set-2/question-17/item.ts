import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "data-interpretation",
  },
  stimulus: "sleep-survey",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Survei itu diikuti oleh seluruh siswa SMA Bakti.",
        },
        {
          column: 1,
          label: "Siswa yang tidur lebih dari delapan jam setiap malam paling sedikit jumlahnya.",
        },
        {
          column: 2,
          label: "Sebagian besar siswa yang disurvei sudah tidur sesuai anjuran para ahli kesehatan.",
        },
        {
          column: 1,
          label: "Lebih dari separuh siswa yang disurvei tidur kurang dari tujuh jam setiap malam.",
        },
      ],
    },
  },
};

export default item;
