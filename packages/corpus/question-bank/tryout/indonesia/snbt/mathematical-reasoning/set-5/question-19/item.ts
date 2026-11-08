import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "bank-pin",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Banyak PIN yang digitnya naik dari kiri ke kanan, misalnya 1358, adalah 252.",
        },
        {
          column: 1,
          label:
            "Banyak PIN yang sama jika dibaca dari kanan ke kiri, misalnya 3773, adalah 100.",
        },
        {
          column: 2,
          label:
            "Banyak PIN yang memuat digit 7 paling sedikit satu kali adalah 4.000.",
        },
        {
          column: 1,
          label:
            "Hanya ada satu PIN yang jumlah keempat digitnya sama dengan 36.",
        },
      ],
    },
  },
};

export default item;
