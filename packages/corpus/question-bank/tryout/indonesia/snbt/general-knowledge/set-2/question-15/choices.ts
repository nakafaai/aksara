import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
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
