import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "sugar-tax",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Menunjukkan bahwa pungutan itu terutama bekerja dengan membuat konsumen membeli lebih sedikit.",
        },
        {
          correct: false,
          label:
            "Menunjukkan bahwa konsumen Inggris lebih peduli kesehatan daripada konsumen lain.",
        },
        {
          correct: true,
          label:
            "Menunjukkan bahwa cukai dapat mengurangi gula melalui perubahan resep oleh produsen.",
        },
        {
          correct: false,
          label:
            "Menjelaskan cara menghitung besarnya cukai berdasarkan harga jual minuman.",
        },
        {
          correct: false,
          label:
            "Membuktikan bahwa produsen minuman selalu menolak aturan pemerintah tentang gula.",
        },
      ],
    },
  },
};

export default item;
