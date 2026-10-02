import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Negara mana yang pertama kali mengadopsi Kerangka Sendai?",
        },
        {
          isCorrect: false,
          label: "Berapa biaya untuk memulihkan ekosistem yang rusak?",
        },
        {
          isCorrect: false,
          label: "Kapan degradasi lingkungan mulai terjadi di Indonesia?",
        },
        {
          isCorrect: false,
          label: "Metode pemulihan ekosistem mana yang paling efektif?",
        },
        {
          isCorrect: true,
          label: "Apa saja tiga pendorong risiko yang diakui Kerangka Sendai?",
        },
      ],
    },
  },
};

export default item;
