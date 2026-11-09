import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "inference",
  },
  stimulus: "angklung",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Satu angklung dapat memainkan seluruh nada sebuah lagu.",
        },
        {
          correct: true,
          label:
            "Setiap angklung dibuat untuk menghasilkan satu nada tertentu.",
        },
        {
          correct: false,
          label:
            "Tabung-tabung dalam satu angklung berbunyi pada nada yang berbeda-beda.",
        },
        {
          correct: false,
          label:
            "Sebuah lagu angklung cukup dimainkan oleh satu orang yang terampil.",
        },
        {
          correct: false,
          label:
            "Panjang tabung bambu tidak memengaruhi bunyi yang dihasilkan angklung.",
        },
      ],
    },
  },
};

export default item;
