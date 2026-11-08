import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "main-idea",
  },
  stimulus: "biopori",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Genangan di kota hanya dapat diatasi dengan membongkar seluruh jalan beraspal dan halaman berlapis beton.",
        },
        {
          correct: false,
          label:
            "Cacing tanah adalah satu-satunya hewan yang dapat hidup di dalam lubang resapan biopori.",
        },
        {
          correct: false,
          label:
            "Kompos dari lubang biopori lebih baik daripada pupuk buatan untuk semua jenis tanaman.",
        },
        {
          correct: true,
          label:
            "Lubang biopori membantu air meresap dan menghasilkan kompos, asalkan dibuat banyak dan dirawat.",
        },
        {
          correct: false,
          label:
            "Satu lubang biopori yang dirawat dengan baik cukup untuk mencegah genangan di seluruh kota.",
        },
      ],
    },
  },
};

export default item;
