import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Buku fiksi mencakup $$35\\%$$ dari seluruh buku yang dipinjam.",
        },
        {
          column: 1,
          label: "Median banyak buku yang dipinjam per jenis adalah 48.",
        },
        {
          column: 2,
          label:
            "Jika data disajikan dalam diagram lingkaran, sudut pusat sektor buku bahasa adalah $$60^\\circ$$.",
        },
        {
          column: 2,
          label:
            "Banyak buku sains yang dipinjam lebih dari dua kali banyak buku sejarah yang dipinjam.",
        },
      ],
    },
  },
};

export default item;
