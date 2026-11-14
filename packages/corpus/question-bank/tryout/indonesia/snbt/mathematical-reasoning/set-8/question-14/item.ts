import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "carpool-cost",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Pada perjalanan pagi biasa, bagian Pak Andi lebih dari dua kali bagian Citra.",
        },
        {
          column: 2,
          label:
            "Jika Dewi tidak ikut pada suatu pagi, bagian Citra pagi itu naik lebih dari $$10\\%$$ dibanding pagi biasa.",
        },
        {
          column: 1,
          label:
            "Jika Budi tidak ikut pada suatu pagi, kenaikan bagian Pak Andi pagi itu lebih besar daripada kenaikan bagian Citra.",
        },
        {
          column: 2,
          label:
            "Jika Citra dan Dewi sama-sama tidak ikut pada suatu pagi, bagian Budi pagi itu lebih dari $$\\text{Rp}45{.}000$$.",
        },
      ],
    },
  },
};

export default item;
