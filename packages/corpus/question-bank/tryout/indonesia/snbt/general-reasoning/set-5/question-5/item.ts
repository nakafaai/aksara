import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "data-inference",
  },
  stimulus: "bimbel",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Banyak siswa yang tidak hadir pada satu sesi pun lebih sedikit pada Februari daripada pada Januari.",
        },
        {
          column: 2,
          label:
            "Pada Februari, siswa yang hadir paling sedikit satu sesi rata-rata hadir pada $$7{,}2$$ sesi.",
        },
        {
          column: 2,
          label:
            "Pada Februari, rata-rata $$72$$ siswa terdaftar absen pada setiap sesi.",
        },
        {
          column: 1,
          label:
            "Pada Januari, pasti ada siswa yang hadir pada paling sedikit $$10$$ sesi.",
        },
      ],
    },
  },
};

export default item;
