import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "print-prices",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Untuk mendapatkan 300 lembar, memesan 501 lembar lebih murah daripada memesan tepat 300 lembar.",
        },
        {
          column: 1,
          label:
            "Biaya pesanan 101 lembar lebih murah daripada biaya pesanan 100 lembar.",
        },
        {
          column: 2,
          label:
            "Makin banyak lembar dalam satu pesanan, biaya totalnya selalu makin besar.",
        },
        {
          column: 1,
          label:
            "Biaya pesanan 501 lembar lebih murah daripada biaya pesanan 400 lembar.",
        },
      ],
    },
  },
};

export default item;
