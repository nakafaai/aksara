import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Setiap peserta memilih teh dengan tambahan gula.",
        },
        {
          isCorrect: false,
          label: "Setiap peminum teh menambahkan gula.",
        },
        {
          isCorrect: false,
          label: "Tidak ada peserta yang meminum teh tanpa tambahan gula.",
        },
        {
          isCorrect: true,
          label:
            "Sekurang-kurangnya satu peserta meminum teh tanpa tambahan gula.",
        },
        {
          isCorrect: false,
          label: "Setiap peserta yang memilih minuman memilih teh.",
        },
      ],
    },
  },
};

export default item;
