import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Peluang muncul paling sedikit satu mata dadu 6 adalah $$\\dfrac13$$.",
        },
        {
          column: 1,
          label:
            "Peluang jumlah kedua mata dadu sama dengan 7 adalah $$\\dfrac16$$.",
        },
        {
          column: 2,
          label:
            "Peluang jumlah kedua mata dadu sama dengan 8 adalah $$\\dfrac16$$.",
        },
        {
          column: 1,
          label:
            "Peluang hasil kali kedua mata dadu merupakan bilangan ganjil adalah $$\\dfrac14$$.",
        },
      ],
    },
  },
};

export default item;
