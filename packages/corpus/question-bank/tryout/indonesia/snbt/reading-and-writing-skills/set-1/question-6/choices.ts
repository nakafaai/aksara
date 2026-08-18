import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "In contrast",
      value: false,
    },
    {
      label: "In addition",
      value: true,
    },
    {
      label: "Therefore",
      value: false,
    },
    {
      label: "Nevertheless",
      value: false,
    },
    {
      label: "For example",
      value: false,
    },
  ],
  id: [
    {
      label: "Sebaliknya",
      value: false,
    },
    {
      label: "Selain itu",
      value: true,
    },
    {
      label: "Oleh karena itu",
      value: false,
    },
    {
      label: "Namun",
      value: false,
    },
    {
      label: "Misalnya",
      value: false,
    },
  ],
};

export default choices;
