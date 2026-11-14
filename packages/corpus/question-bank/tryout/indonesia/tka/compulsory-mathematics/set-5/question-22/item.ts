import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "klub",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Tepat setengah dari seluruh anggota klub Futsal adalah siswa kelas X.",
        },
        {
          column: 2,
          label:
            "Lebih dari $$30\\%$$ anggota klub Robotik adalah siswa kelas XII.",
        },
        {
          column: 2,
          label:
            "Banyak anggota Jurnalistik dari kelas XII $$20\\%$$ lebih sedikit daripada banyak anggota Jurnalistik dari kelas XI.",
        },
      ],
    },
  },
};

export default item;
