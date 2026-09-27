import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "perubahan secara dramatis.",
        },
        {
          isCorrect: true,
          label: "perubahan garis keturunan virus dari generasi ke generasi.",
        },
        {
          isCorrect: false,
          label: "perkembangan yang pesat.",
        },
        {
          isCorrect: false,
          label: "perubahan yang terjadi secara cepat.",
        },
        {
          isCorrect: false,
          label: "pertumbuhan.",
        },
      ],
    },
  },
};

export default item;
