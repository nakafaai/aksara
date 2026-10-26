import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "kesalahan menurun setelah contoh nyata dan penjelasan ditambahkan",
        },
        {
          correct: false,
          label: "kantin menghasilkan sisa makanan setiap hari",
        },
        {
          correct: false,
          label: "lubang biopori diperiksa secara berkala",
        },
        {
          correct: false,
          label: "relawan berdiri di dekat wadah",
        },
        {
          correct: false,
          label: "uji coba berlangsung empat minggu",
        },
      ],
    },
  },
  stimulus: "food-scraps",
};

export default item;
