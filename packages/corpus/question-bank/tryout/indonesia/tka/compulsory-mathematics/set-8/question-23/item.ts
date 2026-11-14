import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "exam-summary",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Paling sedikit $$75\\,\\%$$ siswa kelas XI-2 mendapat nilai lebih dari $$64$$.",
        },
        {
          column: 2,
          label:
            "Siswa dengan nilai tertinggi di antara kedua kelas berada di kelas XI-2.",
        },
        {
          column: 1,
          label:
            "Seorang siswa kelas XI-2 yang mendapat nilai $$80$$ termasuk $$8$$ siswa dengan nilai tertinggi di kelasnya.",
        },
        {
          column: 2,
          label:
            "Setengah data di tengah, yaitu nilai di antara kuartil bawah dan kuartil atas, lebih menyebar di kelas XI-2 daripada di kelas XI-1.",
        },
      ],
    },
  },
};

export default item;
