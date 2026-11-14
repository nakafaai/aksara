import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "shuttle-trips",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Jika tidak ada batas waktu tiba, rencana termurah untuk mengangkut berapa pun banyak peserta tidak pernah memakai bus, karena biaya per kursi minibus lebih murah.",
        },
        {
          column: 1,
          label:
            "Jika semua peserta harus tiba paling lambat pukul 08.30, biaya termurah untuk $$70$$ peserta sama dengan biaya termurah untuk $$72$$ peserta.",
        },
        {
          column: 2,
          label:
            "Jika tidak ada batas waktu tiba, untuk setiap $$n\\ge15$$, biaya termurah untuk $$2n$$ peserta tepat dua kali biaya termurah untuk $$n$$ peserta.",
        },
        {
          column: 1,
          label:
            "Jika bus baru siap di stasiun pukul 07.15 sedangkan kedua minibus siap pukul 07.00, kendaraan itu tetap dapat mengangkut $$116$$ peserta yang semuanya tiba paling lambat pukul 08.30.",
        },
      ],
    },
  },
};

export default item;
