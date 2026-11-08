import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "explicit-information",
  },
  stimulus: "last-angkot",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Jumlah penumpang angkot 07 menurun setelah bus koridor beroperasi.",
        },
        {
          column: 2,
          label:
            "Mak Inah menolak naik bus koridor karena tarifnya lebih mahal.",
        },
        {
          column: 2,
          label:
            "Pak Damar meminta Mak Inah membayar ongkos pada hari terakhir.",
        },
        {
          column: 1,
          label:
            "Halte bus terdekat berjarak sekitar dua ratus meter dari pasar.",
        },
      ],
    },
  },
};

export default item;
