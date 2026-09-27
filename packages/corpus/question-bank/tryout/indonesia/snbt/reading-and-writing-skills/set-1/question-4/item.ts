import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kalimat (2) mengandung kesalahan tanda baca.",
        },
        {
          isCorrect: false,
          label: "Kalimat (3) menggunakan konjungsi yang salah.",
        },
        {
          isCorrect: true,
          label:
            "Pola *Sebagai negara kepulauan, maka ...* membuat kalimat (1) tidak efektif.",
        },
        {
          isCorrect: false,
          label: "Kalimat (4) memerlukan tambahan tanda koma.",
        },
        {
          isCorrect: false,
          label: "Kalimat (5) mengandung pemborosan kata.",
        },
      ],
    },
  },
};

export default item;
