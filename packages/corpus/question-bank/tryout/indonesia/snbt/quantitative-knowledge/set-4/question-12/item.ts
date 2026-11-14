import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        { column: 1, label: "Banyak segitiga yang memenuhi adalah $$12$$." },
        {
          column: 2,
          label:
            "Panjang sisi terpanjang segitiga itu dapat bernilai $$12\\text{ cm}$$.",
        },
        {
          column: 1,
          label:
            "Tepat $$5$$ di antara segitiga itu merupakan segitiga tumpul.",
        },
        {
          column: 2,
          label:
            "Setiap segitiga yang sisi terpanjangnya $$11\\text{ cm}$$ merupakan segitiga tumpul.",
        },
      ],
    },
  },
};

export default item;
