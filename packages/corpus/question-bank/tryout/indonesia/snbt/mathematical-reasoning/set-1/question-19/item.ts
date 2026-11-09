import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "volleyball-league",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Ada kemungkinan keenam tim memperoleh poin yang sama pada akhir kompetisi.",
        },
        { column: 1, label: "Setiap tim bertanding sebanyak 5 kali." },
        {
          column: 2,
          label:
            "Ada kemungkinan dua tim sama-sama memperoleh 15 poin pada akhir kompetisi.",
        },
        {
          column: 1,
          label:
            "Tim yang memperoleh 12 poin pada akhir kompetisi memenangi tepat 4 pertandingan.",
        },
      ],
    },
  },
};

export default item;
