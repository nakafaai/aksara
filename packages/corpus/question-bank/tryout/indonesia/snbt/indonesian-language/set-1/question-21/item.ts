import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Semua kelompok selalu mempunyai tujuan yang sama",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Perang tidak pernah menghasilkan perubahan politik",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Biaya perang memberi kedua pihak dorongan kuat untuk mencari kesepakatan",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kelompok yang bertikai selalu memiliki informasi lengkap",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Lembaga internasional menyelesaikan setiap perselisihan",
            },
          ],
        },
      ],
    },
  },
};

export default item;
