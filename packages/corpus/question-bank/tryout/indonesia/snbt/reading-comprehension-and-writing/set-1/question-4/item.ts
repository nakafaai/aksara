import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kalimat (2) mengandung kesalahan tanda baca.",
        },
        {
          correct: false,
          label: "Kalimat (3) menggunakan konjungsi yang salah.",
        },
        {
          correct: true,
          label:
            "Pola *Sebagai negara kepulauan, maka ...* membuat kalimat (1) tidak efektif.",
        },
        {
          correct: false,
          label: "Kalimat (4) memerlukan tambahan tanda koma.",
        },
        {
          correct: false,
          label: "Kalimat (5) mengandung pemborosan kata.",
        },
      ],
    },
  },
};

export default item;
