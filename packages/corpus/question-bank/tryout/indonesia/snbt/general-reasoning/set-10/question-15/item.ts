import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Sebagian koleksi riset bukan dataset publik.",
        },
        {
          correct: false,
          label: "Semua koleksi riset terenkripsi.",
        },
        {
          correct: false,
          label: "Sebagian dataset publik merupakan arsip terenkripsi.",
        },
        {
          correct: false,
          label: "Setiap dataset yang memerlukan kunci adalah koleksi riset.",
        },
        {
          correct: false,
          label: "Tidak ada koleksi riset yang bersifat publik.",
        },
      ],
    },
  },
};

export default item;
