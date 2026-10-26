import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Negara mana yang pertama kali mengadopsi Kerangka Sendai?",
        },
        {
          correct: false,
          label: "Berapa biaya untuk memulihkan ekosistem yang rusak?",
        },
        {
          correct: false,
          label: "Kapan degradasi lingkungan mulai terjadi di Indonesia?",
        },
        {
          correct: false,
          label: "Metode pemulihan ekosistem mana yang paling efektif?",
        },
        {
          correct: true,
          label: "Apa saja tiga pendorong risiko yang diakui Kerangka Sendai?",
        },
      ],
    },
  },
};

export default item;
