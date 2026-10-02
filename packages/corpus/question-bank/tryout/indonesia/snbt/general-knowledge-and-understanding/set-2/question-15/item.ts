import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "**Ruangan** itu dibersihkan kemarin.",
        },
        {
          isCorrect: false,
          label: "**Tarian** itu dimulai siang hari.",
        },
        {
          isCorrect: true,
          label: "**Tulisan** itu akan segera diterbitkan.",
        },
        {
          isCorrect: false,
          label: "Ia mendengar **panggilan** dari arah belakang.",
        },
        {
          isCorrect: false,
          label: "Ia memakai **timbangan** untuk menakar tepung.",
        },
      ],
    },
  },
};

export default item;
