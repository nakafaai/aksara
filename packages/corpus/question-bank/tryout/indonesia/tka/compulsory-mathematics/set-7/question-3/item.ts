import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "bunyi",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Menambah satu bedug besar ke dalam sekelompok bedug besar yang sedang dipukul bersamaan selalu menaikkan taraf intensitas di suatu titik sebesar $$3\\text{ dB}$$, berapa pun banyak bedug semula.",
        },
        {
          column: 2,
          label:
            "Jika taraf intensitas bunyi panggung A di titik Q $$10\\text{ dB}$$ lebih kecil daripada di titik P, jarak Q ke panggung A sama dengan $$10$$ kali jarak P ke panggung A.",
        },
        {
          column: 1,
          label:
            "Untuk setiap jarak $$d$$ dan setiap bilangan asli $$k$$, taraf intensitas bunyi $$k$$ bedug besar yang didengar dari jarak $$d$$ sama dengan taraf intensitas bunyi $$16k$$ bedug kecil yang didengar dari jarak $$2d$$.",
        },
      ],
    },
  },
};

export default item;
