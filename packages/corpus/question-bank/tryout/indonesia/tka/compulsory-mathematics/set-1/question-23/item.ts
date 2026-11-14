import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "call-duration",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Panggilan yang lamanya paling sedikit $$20$$ menit hanya seperempat dari seluruh panggilan, tetapi taksiran total lama panggilan itu lebih dari $$40\\%$$ taksiran total lama seluruh panggilan.",
        },
        {
          column: 2,
          label:
            "Jika tabel disusun ulang menjadi tiga kelas, yaitu $$0\\le t<10$$, $$10\\le t<20$$, dan $$20\\le t<30$$, taksiran rata-rata dari tabel baru sama dengan taksiran rata-rata dari tabel semula.",
        },
        {
          column: 1,
          label:
            "Taksiran modus lebih kecil daripada taksiran rata-rata, dengan selisih lebih dari $$6$$ menit.",
        },
        {
          column: 2,
          label:
            "Jika $$7$$ panggilan yang tercatat pada kelas $$15\\le t<20$$ ternyata seharusnya berada di kelas $$10\\le t<15$$, taksiran modus menjadi lebih dari $$10$$ menit.",
        },
      ],
    },
  },
};

export default item;
