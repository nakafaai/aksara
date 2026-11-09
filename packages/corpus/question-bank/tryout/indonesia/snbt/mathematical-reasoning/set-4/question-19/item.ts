import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "school-raffle",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Peluang kedua hadiah jatuh pada tiket milik Rafi adalah $$\\dfrac{3}{95}$$.",
        },
        {
          column: 1,
          label:
            "Jika kedua hadiah berbeda, yaitu hadiah pertama untuk tiket yang terambil lebih dulu dan hadiah kedua untuk tiket berikutnya, banyak kemungkinan hasil undian adalah 380.",
        },
        {
          column: 2,
          label:
            "Peluang Rafi mendapat tepat satu hadiah adalah $$\\dfrac{16}{95}$$.",
        },
        {
          column: 2,
          label:
            "Peluang Rafi mendapat paling sedikit satu hadiah lebih dari $$\\dfrac12$$.",
        },
      ],
    },
  },
};

export default item;
