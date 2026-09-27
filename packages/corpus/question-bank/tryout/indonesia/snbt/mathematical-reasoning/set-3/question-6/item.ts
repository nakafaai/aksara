import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Tawaran pertama",
        },
        {
          isCorrect: false,
          label: "Kedua tawaran sama besar",
        },
        {
          isCorrect: false,
          label: "Tawaran pertama dua kali lebih besar",
        },
        { isCorrect: true, label: "Tawaran kedua" },
        {
          isCorrect: false,
          label: "Tidak dapat ditentukan",
        },
      ],
    },
  },
};

export default item;
