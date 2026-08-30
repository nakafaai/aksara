import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "language-suitability",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Bibit tidak ditemukan; status hidup belum dapat dipastikan",
        },
        {
          isCorrect: false,
          label: "Bibit pasti hilang selamanya",
        },
        {
          isCorrect: false,
          label: "Semua bibit di lokasi telah mati",
        },
        {
          isCorrect: false,
          label: "Pemantauan tidak berguna",
        },
        {
          isCorrect: false,
          label: "Arus pasti merusak seluruh tanaman",
        },
      ],
    },
  },
  stimulusKey: "mangrove-nursery",
};

export default item;
