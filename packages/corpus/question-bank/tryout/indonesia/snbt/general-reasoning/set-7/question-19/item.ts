import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Sinta menerima peninjauan gaji dan mengikuti penilaian promosi.",
        },
        {
          isCorrect: false,
          label:
            "Sinta menerima peninjauan gaji, tetapi tidak mengikuti penilaian promosi.",
        },
        {
          isCorrect: false,
          label:
            "Sinta tidak menerima peninjauan gaji maupun penilaian promosi.",
        },
        {
          isCorrect: false,
          label:
            "Sinta mengikuti penilaian promosi tanpa menerima peninjauan gaji.",
        },
        {
          isCorrect: false,
          label: "Sinta belum menyelesaikan sertifikasi profesi.",
        },
      ],
    },
  },
};

export default item;
