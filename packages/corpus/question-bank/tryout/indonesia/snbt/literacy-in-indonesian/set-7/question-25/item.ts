import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-reasoning",
  },
  stimulus: "borrowed-words",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kata itu dipinjam pada masa penjajahan yang penuh penderitaan.",
        },
        {
          correct: false,
          label:
            "Orang Indonesia tidak mengenal ajaran Hindu dan Buddha sama sekali.",
        },
        {
          correct: true,
          label:
            "Dalam ajaran asalnya, hidup yang terus berputar dipandang sebagai penderitaan.",
        },
        {
          correct: false,
          label:
            "Lembaga bahasa menetapkan makna baru itu dalam dokumen resmi.",
        },
        {
          correct: false,
          label:
            "Bunyi kata itu mungkin terdengar sedih bagi sebagian besar penutur bahasa Indonesia.",
        },
      ],
    },
  },
};

export default item;
