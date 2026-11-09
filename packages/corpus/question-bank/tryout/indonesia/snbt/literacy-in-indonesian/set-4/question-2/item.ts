import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "antibiotic-resistance",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Antibiotik efektif untuk menyembuhkan pilek dan flu.",
        },
        {
          column: 1,
          label:
            "Gen kekebalan dapat berpindah antarbakteri dari jenis yang berbeda.",
        },
        {
          column: 1,
          label:
            "Sebelum antibiotik diberikan, bakteri yang tahan tidak lebih unggul daripada bakteri lain.",
        },
        {
          column: 2,
          label:
            "Banyak golongan antibiotik baru dipasarkan sejak akhir 1980-an.",
        },
      ],
    },
  },
};

export default item;
