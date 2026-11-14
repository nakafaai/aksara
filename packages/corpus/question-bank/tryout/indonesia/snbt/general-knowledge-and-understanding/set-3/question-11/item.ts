import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "paraphrase",
  },
  stimulus: "beber",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Karena dalang dapat memanjangkan atau memendekkan tuturan setiap adegan sesuai bobotnya, lama pertunjukan lebih bergantung pada dalang daripada pada banyaknya adegan, dan satu gulungan bisa dipentaskan dengan durasi berlainan.",
        },
        {
          correct: false,
          label:
            "Karena setiap adegan hanya menangkap satu saat, lama pertunjukan lebih bergantung pada dalang daripada pada banyaknya adegan, dan satu gulungan bisa dipentaskan dengan durasi berlainan.",
        },
        {
          correct: false,
          label:
            "Karena dalang dapat memanjangkan atau memendekkan tuturan setiap adegan sesuai bobotnya, lama pertunjukan lebih bergantung pada dalang daripada pada banyaknya adegan, dan satu gulungan pasti dipentaskan dengan durasi berlainan.",
        },
        {
          correct: false,
          label:
            "Karena dalang dapat memanjangkan atau memendekkan tuturan setiap adegan sesuai bobotnya, lama pertunjukan hanya bergantung pada dalang, bukan pada banyaknya adegan, dan satu gulungan bisa dipentaskan dengan durasi berlainan.",
        },
        {
          correct: false,
          label:
            "Karena satu gulungan bisa dipentaskan dengan durasi berlainan, dalang dapat memanjangkan atau memendekkan tuturan setiap adegan sesuai bobotnya, dan lama pertunjukan lebih bergantung pada dalang daripada pada banyaknya adegan.",
        },
      ],
    },
  },
};

export default item;
