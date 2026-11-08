import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "bakery-plan",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Bu Sari dapat membuat 80 roti cokelat dan 30 roti keju dalam sehari.",
        },
        {
          column: 2,
          label:
            "Bu Sari dapat membuat 30 roti cokelat dan 60 roti keju dalam sehari.",
        },
        {
          column: 1,
          label:
            "Jika hanya membuat roti keju, Bu Sari dapat membuat paling banyak 70 roti dalam sehari.",
        },
        {
          column: 1,
          label:
            "Membuat 100 roti cokelat saja dalam sehari memenuhi semua batasan.",
        },
      ],
    },
  },
};

export default item;
