import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Semua kelompok selalu mempunyai tujuan yang sama",
        },
        {
          isCorrect: false,
          label: "Perang tidak pernah menghasilkan perubahan politik",
        },
        {
          isCorrect: false,
          label: "Kelompok yang bertikai selalu memiliki informasi lengkap",
        },
        {
          isCorrect: true,
          label:
            "Biaya perang memberi kedua pihak dorongan kuat untuk mencari kesepakatan",
        },
        {
          isCorrect: false,
          label: "Lembaga internasional menyelesaikan setiap perselisihan",
        },
      ],
    },
  },
};

export default item;
