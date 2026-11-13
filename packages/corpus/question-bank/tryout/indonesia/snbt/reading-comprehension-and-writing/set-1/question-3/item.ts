import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "effective-sentence",
  },
  stimulus: "lumbung",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Meskipun lumbung tidak memungut bunga uang, jumlah daripada gabah yang dikembalikan peminjam harus sebelas kilogram untuk setiap sepuluh kilogram pinjaman.",
        },
        {
          correct: true,
          label: "Meskipun lumbung tidak memungut bunga uang, jumlah gabah yang dikembalikan peminjam harus sebelas kilogram untuk setiap sepuluh kilogram pinjaman.",
        },
        {
          correct: false,
          label: "Meskipun lumbung tidak memungut bunga uang, namun jumlah gabah yang dikembalikan peminjam harus sebelas kilogram untuk setiap sepuluh kilogram pinjaman.",
        },
        {
          correct: false,
          label: "Karena lumbung tidak memungut bunga uang, jumlah gabah yang dikembalikan peminjam harus sebelas kilogram untuk setiap sepuluh kilogram pinjaman.",
        },
        {
          correct: false,
          label: "Lumbung tidak memungut bunga uang, di mana jumlah gabah yang dikembalikan peminjam harus sebelas kilogram untuk setiap sepuluh kilogram pinjaman.",
        },
      ],
    },
  },
};

export default item;
