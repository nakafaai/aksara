import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Sebagian koleksi riset bukan dataset publik.",
        },
        {
          isCorrect: false,
          label: "Semua koleksi riset terenkripsi.",
        },
        {
          isCorrect: false,
          label: "Sebagian dataset publik merupakan arsip terenkripsi.",
        },
        {
          isCorrect: false,
          label: "Setiap dataset yang memerlukan kunci adalah koleksi riset.",
        },
        {
          isCorrect: false,
          label: "Tidak ada koleksi riset yang bersifat publik.",
        },
      ],
    },
  },
};

export default item;
