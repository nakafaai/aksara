import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "punctuation",
  },
  stimulus: "debat",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Setelah mosi dibacakan, ketua juri tim menyusun argumen tanpa telepon genggam dan tanpa bantuan pelatih.",
        },
        {
          correct: true,
          label:
            "Setelah mosi dibacakan ketua juri, tim menyusun argumen tanpa telepon genggam dan tanpa bantuan pelatih.",
        },
        {
          correct: false,
          label:
            "Kalimat (8) tidak perlu diberi koma karena anak kalimatnya berada di awal kalimat.",
        },
        {
          correct: false,
          label:
            "Setelah mosi dibacakan ketua, juri tim menyusun argumen tanpa telepon genggam dan tanpa bantuan pelatih.",
        },
        {
          correct: false,
          label:
            "Setelah mosi dibacakan ketua juri tim, menyusun argumen tanpa telepon genggam dan tanpa bantuan pelatih.",
        },
      ],
    },
  },
};

export default item;
