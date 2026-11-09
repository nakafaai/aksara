import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "inductive-reasoning",
    topic: "data-comparison",
  },
  stimulus: "bibit",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Pada penyiraman pagi, tambahan tinggi akibat kompos dua kali tambahan tinggi akibat pupuk cair.",
        },
        {
          column: 1,
          label:
            "Rata-rata tinggi seluruh bibit berpupuk cair lebih besar daripada rata-rata tinggi seluruh bibit berkompos.",
        },
        {
          column: 2,
          label:
            "Pada penyiraman sore, tambahan tinggi akibat pupuk cair dua kali tambahan tinggi akibat kompos.",
        },
        {
          column: 2,
          label:
            "Kombinasi perlakuan yang menghasilkan bibit tertinggi adalah pupuk cair dengan penyiraman pagi.",
        },
      ],
    },
  },
};

export default item;
