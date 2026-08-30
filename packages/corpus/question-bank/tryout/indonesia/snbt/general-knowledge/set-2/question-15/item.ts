import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Der **Abstellraum** wurde gestern gereinigt.",
        },
        {
          isCorrect: true,
          label: "Die **Zeichnung** wird morgen ausgestellt.",
        },
        {
          isCorrect: false,
          label: "Der **Tanz** beginnt mittags.",
        },
        {
          isCorrect: false,
          label: "Sie hörte einen **Ruf** von hinten.",
        },
        {
          isCorrect: false,
          label: "Die Künstlerin erhielt **Lob** für ihr neues Werk.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The **storage room** was cleaned yesterday.",
        },
        {
          isCorrect: true,
          label: "The **drawing** will be displayed tomorrow.",
        },
        {
          isCorrect: false,
          label: "The **dance** begins at noon.",
        },
        {
          isCorrect: false,
          label: "She heard a **call** from behind.",
        },
        {
          isCorrect: false,
          label: "The artist received **praise** for the new work.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "**Ruangan** itu dibersihkan kemarin.",
        },
        {
          isCorrect: true,
          label: "**Tulisan** itu akan segera diterbitkan.",
        },
        {
          isCorrect: false,
          label: "**Tarian** itu dimulai siang hari.",
        },
        {
          isCorrect: false,
          label: "Ia mendengar **panggilan** dari arah belakang.",
        },
        {
          isCorrect: false,
          label: "Seniman itu menerima **pujian** atas karya barunya.",
        },
      ],
    },
  },
};

export default item;
