import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Wissenschaft",
      value: false,
    },
    {
      label: "Wörterbuch",
      value: true,
    },
    {
      label: "Religion",
      value: false,
    },
    {
      label: "Literatur",
      value: false,
    },
    {
      label: "Geschichte",
      value: false,
    },
  ],
  en: [
    { label: "Science", value: false },
    { label: "Dictionary", value: true },
    { label: "Religion", value: false },
    { label: "Literature", value: false },
    { label: "History", value: false },
  ],
  id: [
    { label: "Sains", value: false },
    { label: "Kamus", value: true },
    { label: "Agama", value: false },
    { label: "Sastra", value: false },
    { label: "Sejarah", value: false },
  ],
};

export default choices;
