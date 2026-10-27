import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Setiap peserta memilih teh dengan tambahan gula.",
        },
        {
          correct: false,
          label: "Setiap peminum teh menambahkan gula.",
        },
        {
          correct: false,
          label: "Tidak ada peserta yang meminum teh tanpa tambahan gula.",
        },
        {
          correct: true,
          label:
            "Sekurang-kurangnya satu peserta meminum teh tanpa tambahan gula.",
        },
        {
          correct: false,
          label: "Setiap peserta yang memilih minuman memilih teh.",
        },
      ],
    },
  },
};

export default item;
