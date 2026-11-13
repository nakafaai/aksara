import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "ogif",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Rata-rata lama membaca yang sebenarnya pasti kurang dari $$41$$ menit.",
        },
        {
          column: 2,
          label:
            "Median lama membaca yang sebenarnya pasti lebih dari $$32$$ menit.",
        },
        {
          column: 2,
          label:
            "Pasti ada paling sedikit $$20$$ siswa yang membaca selama $$45$$ menit atau lebih.",
        },
      ],
    },
  },
};

export default item;
