import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "school-transport",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Jika dipilih secara acak seorang siswa yang naik angkutan umum, peluang siswa itu dari kelas XI adalah $$0{,}3$$.",
        },
        {
          column: 2,
          label:
            "Jika $$6$$ siswa kelas X yang diantar keluarga beralih ke sepeda, bersepeda menjadi cara berangkat yang paling banyak dipilih di kelas X.",
        },
        {
          column: 1,
          label:
            "Perbandingan banyak siswa yang berjalan kaki di kelas X, XI, dan XII adalah $$4:3:3$$.",
        },
        {
          column: 2,
          label:
            "Lebih dari $$55\\,\\%$$ siswa kelas XII tidak naik angkutan umum.",
        },
      ],
    },
  },
};

export default item;
