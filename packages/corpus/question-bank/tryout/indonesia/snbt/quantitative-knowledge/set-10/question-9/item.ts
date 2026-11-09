import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Banyak batang korek api pada pola ke-$$n$$ adalah $$4n$$.",
        },
        { column: 1, label: "Pola ke-10 memerlukan 31 batang korek api." },
        {
          column: 2,
          label:
            "Selisih banyak batang korek api pada pola ke-20 dan pola ke-10 adalah 31.",
        },
        {
          column: 1,
          label:
            "Tepat 100 batang korek api dapat membentuk satu pola utuh tanpa sisa.",
        },
      ],
    },
  },
};

export default item;
