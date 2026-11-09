import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "coffee-plots",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Skor cita rasa tidak berhubungan dengan harga yang dibayar koperasi.",
        },
        {
          correct: false,
          label: "Kebun yang dicatat ditanami varietas kopi yang berbeda-beda.",
        },
        {
          correct: false,
          label:
            "Pohon pelindung hanya ditanam di kebun yang berada paling tinggi.",
        },
        {
          correct: false,
          label: "Koperasi tidak mencatat hasil biji dari setiap kebun.",
        },
        {
          correct: true,
          label:
            "Setiap perlakuan hanya diwakili satu kebun dalam satu musim panen.",
        },
      ],
    },
  },
};

export default item;
