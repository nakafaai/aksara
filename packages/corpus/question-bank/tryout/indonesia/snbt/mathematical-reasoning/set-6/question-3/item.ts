import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "football-league",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Tim C memperoleh poin lebih banyak daripada tim D.",
        },
        { column: 2, label: "Selisih gol tim B adalah $$+3$$." },
        { column: 1, label: "Tim A tidak pernah kalah dalam kompetisi itu." },
        {
          column: 2,
          label: "Jumlah gol yang tercipta dalam seluruh kompetisi adalah 48.",
        },
      ],
    },
  },
};

export default item;
