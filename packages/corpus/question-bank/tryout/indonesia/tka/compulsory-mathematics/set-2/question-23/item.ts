import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "nilai",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Rata-rata nilai kelas A lebih besar daripada rata-rata nilai kelas B.",
        },
        {
          column: 2,
          label:
            "Jika seorang siswa baru dengan nilai $$100$$ bergabung ke kelas B, median nilai kelas B tetap $$68$$.",
        },
        {
          column: 1,
          label: "Rata-rata nilai kelas A lebih dari $$63$$.",
        },
      ],
    },
  },
};

export default item;
