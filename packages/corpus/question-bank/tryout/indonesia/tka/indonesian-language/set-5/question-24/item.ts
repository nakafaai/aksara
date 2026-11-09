import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "language-suitability",
  },
  stimulus: "turtle-nest",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Hampir semua telur penyu di pantai itu berhasil diselamatkan.",
        },
        {
          correct: false,
          label: "Relawan menetaskan 4.000 tukik pada tahun lalu.",
        },
        {
          correct: false,
          label: "Sebanyak 800 telur berhasil menetas pada tahun lalu.",
        },
        {
          correct: true,
          label:
            "Sebanyak 3.200 dari 4.000 telur yang dipindahkan, atau 80 persen, berhasil menetas.",
        },
        {
          correct: false,
          label:
            "Tingkat penetasan mencapai 75 persen dari telur yang dipindahkan.",
        },
      ],
    },
  },
};

export default item;
