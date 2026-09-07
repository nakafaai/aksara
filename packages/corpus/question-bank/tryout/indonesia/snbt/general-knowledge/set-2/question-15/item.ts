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
          isCorrect: false,
          label: "Der **Tanz** beginnt mittags.",
        },
        {
          isCorrect: true,
          label: "Die **Zeichnung** wird morgen ausgestellt.",
        },
        {
          isCorrect: false,
          label: "Sie hörte einen **Ruf** von hinten.",
        },
        {
          isCorrect: false,
          label: "Sie benutzte eine **Waage**, um das Mehl abzuwiegen.",
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
          isCorrect: false,
          label: "The **dance** begins at noon.",
        },
        {
          isCorrect: true,
          label: "The **drawing** will be displayed tomorrow.",
        },
        {
          isCorrect: false,
          label: "She heard a **call** from behind.",
        },
        {
          isCorrect: false,
          label: "She used **scales** to weigh the flour.",
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
