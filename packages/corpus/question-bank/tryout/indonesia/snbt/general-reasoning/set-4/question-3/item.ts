import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "inductive-reasoning",
    topic: "inference",
  },
  stimulus: "lampu",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Perangkap di bawah lampu LED rata-rata menangkap lebih dari dua kali jumlah serangga di bawah lampu natrium.",
        },
        {
          column: 2,
          label:
            "Penutup penyaring cahaya biru membuat lampu LED sama sekali tidak menarik serangga.",
        },
        {
          column: 1,
          label:
            "Menurut pengelola kota, penggantian lampu natrium dengan lampu LED mengurangi pemakaian listrik.",
        },
        {
          column: 2,
          label:
            "Kelelawar lebih sering terlihat berburu di sekitar lampu natrium daripada di sekitar lampu LED.",
        },
      ],
    },
  },
};

export default item;
