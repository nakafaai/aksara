import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "arena-seats",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Banyak kursi kategori C lebih dari dua kali banyak kursi kategori B.",
        },
        {
          column: 2,
          label: "Ada baris yang memiliki tepat $$50$$ kursi.",
        },
        {
          column: 1,
          label: "Ada dua baris berurutan yang banyak kursinya berjumlah tepat $$100$$.",
        },
        {
          column: 1,
          label:
            "Jika harga tiket setiap kategori dinaikkan $$\\text{Rp}10{.}000{,}00$$, pendapatan saat semua kursi terjual bertambah lebih dari $$\\text{Rp}14{.}000{.}000{,}00$$.",
        },
      ],
    },
  },
};

export default item;
