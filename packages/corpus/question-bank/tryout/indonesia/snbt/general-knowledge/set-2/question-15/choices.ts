import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Der **Abstellraum** wurde gestern gereinigt.",
      value: false,
    },
    {
      label: "Die **Zeichnung** wird morgen ausgestellt.",
      value: true,
    },
    {
      label: "Der **Tanz** beginnt mittags.",
      value: false,
    },
    {
      label: "Sie hörte einen **Ruf** von hinten.",
      value: false,
    },
    {
      label: "Die Künstlerin erhielt **Lob** für ihr neues Werk.",
      value: false,
    },
  ],
  en: [
    {
      label: "The **storage room** was cleaned yesterday.",
      value: false,
    },
    {
      label: "The **drawing** will be displayed tomorrow.",
      value: true,
    },
    {
      label: "The **dance** begins at noon.",
      value: false,
    },
    {
      label: "She heard a **call** from behind.",
      value: false,
    },
    {
      label: "The artist received **praise** for the new work.",
      value: false,
    },
  ],
  id: [
    {
      label: "**Ruangan** itu dibersihkan kemarin.",
      value: false,
    },
    {
      label: "**Tulisan** itu akan segera diterbitkan.",
      value: true,
    },
    {
      label: "**Tarian** itu dimulai siang hari.",
      value: false,
    },
    {
      label: "Ia mendengar **panggilan** dari arah belakang.",
      value: false,
    },
    {
      label: "Seniman itu menerima **pujian** atas karya barunya.",
      value: false,
    },
  ],
};

export default choices;
