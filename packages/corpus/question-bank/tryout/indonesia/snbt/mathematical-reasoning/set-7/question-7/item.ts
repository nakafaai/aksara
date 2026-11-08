import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "dice-game",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Peluang jumlah kedua mata dadu sama dengan 11 adalah $$\\dfrac{1}{18}$$.",
        },
        {
          column: 1,
          label:
            "Jika pemain bermain dua kali, peluang jumlah mata dadu 12 muncul pada kedua permainan adalah $$\\dfrac{1}{1{.}296}$$.",
        },
        {
          column: 2,
          label:
            "Jika permainan dimainkan 360 kali, banyak kejadian jumlah mata dadu 12 yang diharapkan adalah 20 kali.",
        },
        {
          column: 2,
          label:
            "Peluang jumlah kedua mata dadu sama dengan 6 sama besar dengan peluang jumlah kedua mata dadu sama dengan 7.",
        },
      ],
    },
  },
};

export default item;
