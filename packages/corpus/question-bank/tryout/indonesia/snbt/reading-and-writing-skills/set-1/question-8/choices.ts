import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "konkurriert mit.",
      value: false,
    },
    {
      label: "ahmt nach.",
      value: false,
    },
    {
      label: "gleicht.",
      value: true,
    },
    {
      label: "folgt.",
      value: false,
    },
    {
      label: "ersetzt.",
      value: false,
    },
  ],
  en: [
    {
      label: "competes with.",
      value: false,
    },
    {
      label: "imitates.",
      value: false,
    },
    {
      label: "looks like.",
      value: true,
    },
    {
      label: "follows.",
      value: false,
    },
    {
      label: "replaces.",
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
      label: "mirip dengan.",
      value: true,
    },
    {
      label: "mengikuti.",
      value: false,
    },
    {
      label: "menggantikan.",
      value: false,
    },
  ],
};

export default choices;
