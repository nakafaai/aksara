import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            'Ganti tanda titik dua setelah kata "yaitu" dengan tanda titik koma.',
        },
        {
          correct: false,
          label: 'Hapus tanda koma sebelum kata "yaitu".',
        },
        {
          correct: true,
          label: 'Hapus tanda titik dua setelah kata "yaitu".',
        },
        {
          correct: false,
          label: 'Tambahkan tanda titik dua tepat setelah kata "lembaga".',
        },
        {
          correct: false,
          label: "Ganti setiap tanda koma dalam perincian dengan tanda titik.",
        },
      ],
    },
  },
};

export default item;
