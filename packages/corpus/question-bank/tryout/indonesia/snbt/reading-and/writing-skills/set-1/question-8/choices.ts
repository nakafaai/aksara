import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "rivaling.",
      value: false,
    },
    {
      label: "imitating.",
      value: false,
    },
    {
      label: "matching.",
      value: true,
    },
    {
      label: "following the example of.",
      value: false,
    },
    {
      label: "copying.",
      value: false,
    },
  ],
  id: [
    {
      label: "menyaingi.",
      value: false,
    },
    {
      label: "menirukan.",
      value: false,
    },
    {
      label: "menyamai.",
      value: true,
    },
    {
      label: "meneladani.",
      value: false,
    },
    {
      label: "mencontoh.",
      value: false,
    },
  ],
};

export default choices;
