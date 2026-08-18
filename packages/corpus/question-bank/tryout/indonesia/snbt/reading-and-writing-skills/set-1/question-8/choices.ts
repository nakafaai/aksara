import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
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
