import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "weil.",
      value: true,
    },
    {
      label: "obwohl.",
      value: false,
    },
    {
      label: "damit.",
      value: false,
    },
    {
      label: "sofern nicht.",
      value: false,
    },
    {
      label: "nachdem.",
      value: false,
    },
  ],
  en: [
    {
      label: "because.",
      value: true,
    },
    {
      label: "although.",
      value: false,
    },
    {
      label: "so that.",
      value: false,
    },
    {
      label: "unless.",
      value: false,
    },
    {
      label: "after.",
      value: false,
    },
  ],
  id: [
    {
      label: "karena.",
      value: true,
    },
    {
      label: "meskipun.",
      value: false,
    },
    {
      label: "agar.",
      value: false,
    },
    {
      label: "kecuali.",
      value: false,
    },
    {
      label: "setelah.",
      value: false,
    },
  ],
};

export default choices;
