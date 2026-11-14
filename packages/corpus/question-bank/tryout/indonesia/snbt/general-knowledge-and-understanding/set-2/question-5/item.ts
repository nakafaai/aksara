import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "delta",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pasir dan lumpur yang dibawa oleh sungai yang sama dapat mengendap di tempat yang berbeda.",
        },
        {
          correct: false,
          label:
            "Membongkar bendungan di hulu tidak akan menghentikan pemadatan endapan lama di delta.",
        },
        {
          correct: true,
          label:
            "Rupa sebuah delta terutama ditentukan oleh banyaknya endapan yang dibawa sungai ke muara.",
        },
        {
          correct: false,
          label: "Endapan yang sudah mengendap masih dapat berpindah tempat.",
        },
        {
          correct: false,
          label:
            "Endapan di muara dapat mengubah jalur aliran sungai yang membawanya.",
        },
      ],
    },
  },
};

export default item;
