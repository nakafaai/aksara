import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "fuel-subsidy",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Biaya bantuan tunai itu kurang dari seperempat anggaran subsidi.",
        },
        {
          column: 2,
          label:
            "Rumah tangga di kelompok kedua menerima bantuan tunai yang lebih kecil daripada subsidi yang hilang.",
        },
        {
          column: 1,
          label:
            "Rumah tangga di kelompok terbawah menerima bantuan tunai yang lebih besar daripada subsidi yang hilang.",
        },
        {
          column: 2,
          label:
            "Rumah tangga di kelompok tengah ikut menerima bantuan tunai dari usulan itu.",
        },
      ],
    },
  },
};

export default item;
