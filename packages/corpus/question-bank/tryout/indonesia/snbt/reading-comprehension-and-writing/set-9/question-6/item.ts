import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "main-idea",
  },
  stimulus: "food-bank",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Banyak makanan dari usaha katering dibuang setiap malam.",
        },
        {
          correct: false,
          label:
            "Masih ada keluarga di Kota Purbaya yang kesulitan membeli makanan.",
        },
        {
          correct: false,
          label: "Makanan yang berbau atau berlendir langsung ditolak.",
        },
        {
          correct: true,
          label:
            "Bank makanan yang didirikan mahasiswa menyalurkan sisa makanan katering yang layak santap kepada keluarga yang membutuhkan.",
        },
        {
          correct: false,
          label: "Sembilan usaha katering rutin menyumbangkan makanan.",
        },
      ],
    },
  },
};

export default item;
