import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Harga Mie A tidak pernah turun",
        },
        {
          isCorrect: false,
          label: "Harga Mie B naik pada setiap periode",
        },
        {
          isCorrect: false,
          label: "Setiap produk lebih sering naik daripada turun",
        },
        {
          isCorrect: true,
          label:
            "Ada satu produk mie yang mengalami tepat satu kali penurunan harga",
        },
        {
          isCorrect: false,
          label:
            "Harga Mie A selalu di bawah $$\\text{Rp}\\,3000$$ setiap tahun",
        },
      ],
    },
  },
};

export default item;
