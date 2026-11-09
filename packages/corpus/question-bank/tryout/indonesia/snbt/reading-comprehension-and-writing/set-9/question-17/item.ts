import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "data-interpretation",
  },
  stimulus: "tooth-brushing",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Pada awal tahun, lebih dari separuh siswa kelas II bergigi berlubang.",
        },
        {
          column: 1,
          label: "Banyak siswa yang bergigi berlubang turun di setiap kelas.",
        },
        {
          column: 2,
          label:
            "Setelah enam bulan, kelas III memiliki siswa bergigi berlubang paling banyak.",
        },
        {
          column: 1,
          label:
            "Penurunan di kelas IV lebih besar daripada penurunan di kelas I.",
        },
      ],
    },
  },
};

export default item;
