import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "knockout-cup",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Pemain yang mendapat bye dan akhirnya menjadi juara memainkan 6 pertandingan.",
        },
        {
          column: 1,
          label: "Juara turnamen memainkan paling banyak 6 pertandingan.",
        },
        {
          column: 1,
          label: "Babak perempat final terdiri atas 4 pertandingan.",
        },
        {
          column: 2,
          label:
            "Banyak pertandingan di babak kedua sama dengan banyak pertandingan di semua babak setelahnya digabungkan.",
        },
      ],
    },
  },
};

export default item;
