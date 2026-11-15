import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "regression-mean",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Menurut cara yang diusulkan guru, kenaikan yang dapat dikaitkan dengan kelas tambahan sekitar $$4$$ poin.",
        },
        {
          column: 2,
          label:
            "Kenaikan nilai kelompok kelas tambahan lebih dari $$25\\%$$ dari nilai awalnya.",
        },
        {
          column: 1,
          label:
            "Kelompok bernilai tertinggi turun $$4$$ poin walaupun tidak mendapat perlakuan apa pun.",
        },
        {
          column: 2,
          label:
            "Kenaikan nilai kelompok pembanding lebih dari $$15\\%$$ dari nilai awalnya.",
        },
      ],
    },
  },
};

export default item;
