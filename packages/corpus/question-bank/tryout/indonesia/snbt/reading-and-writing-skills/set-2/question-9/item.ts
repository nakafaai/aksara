import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'Ganti tanda titik dua setelah kata "yaitu" dengan tanda titik koma.',
        },
        {
          isCorrect: false,
          label: 'Hapus tanda koma sebelum kata "yaitu".',
        },
        {
          isCorrect: true,
          label: 'Hapus tanda titik dua setelah kata "yaitu".',
        },
        {
          isCorrect: false,
          label: 'Tambahkan tanda titik dua tepat setelah kata "lembaga".',
        },
        {
          isCorrect: false,
          label: "Ganti setiap tanda koma dalam perincian dengan tanda titik.",
        },
      ],
    },
  },
};

export default item;
