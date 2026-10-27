import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Harga Mie A tidak pernah turun",
        },
        {
          correct: false,
          label: "Harga Mie B naik pada setiap periode",
        },
        {
          correct: false,
          label: "Setiap produk lebih sering naik daripada turun",
        },
        {
          correct: true,
          label:
            "Ada satu produk mie yang mengalami tepat satu kali penurunan harga",
        },
        {
          correct: false,
          label:
            "Harga Mie A selalu di bawah $$\\text{Rp}\\,3000$$ setiap tahun",
        },
      ],
    },
  },
};

export default item;
