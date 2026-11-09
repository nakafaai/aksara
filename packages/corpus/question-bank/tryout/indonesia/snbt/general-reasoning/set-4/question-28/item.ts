import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "relative-motion",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Ari menyusul Bima untuk pertama kali setelah $$400$$ detik.",
        },
        {
          column: 1,
          label:
            "Saat pertama kali menyusul Bima, Ari telah menempuh tepat $$5$$ putaran.",
        },
        {
          column: 2,
          label:
            "Jika keduanya berlari berlawanan arah dari titik awal yang sama, mereka bertemu untuk pertama kali setelah $$40$$ detik.",
        },
        {
          column: 2,
          label: "Dalam $$10$$ menit, Bima menempuh lebih dari $$6$$ putaran.",
        },
      ],
    },
  },
};

export default item;
