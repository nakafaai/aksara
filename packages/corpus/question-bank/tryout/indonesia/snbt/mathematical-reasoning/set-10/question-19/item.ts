import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "photo-frame",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Setiap kali lebar bingkai bertambah 1 cm, keliling luar bingkai bertambah 8 cm.",
        },
        {
          column: 2,
          label:
            "Jika lebar bingkai 5 cm, keliling luar bingkai adalah 140 cm.",
        },
        {
          column: 1,
          label:
            "Berapa pun lebar bingkainya, panjang luar bingkai selalu 12 cm lebih panjang daripada lebar luarnya.",
        },
        {
          column: 2,
          label:
            "Perbandingan panjang dan lebar ukuran luar bingkai sama dengan perbandingan panjang dan lebar foto.",
        },
      ],
    },
  },
};

export default item;
