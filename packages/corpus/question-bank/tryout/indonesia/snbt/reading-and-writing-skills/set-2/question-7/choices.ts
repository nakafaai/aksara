import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "tritt auf, wenn.",
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
      label: "außer wenn.",
      value: false,
    },
    {
      label: "nachdem.",
      value: false,
    },
  ],
  en: [
    {
      label: "occurs when.",
      value: true,
    },
    {
      label: "even though.",
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
      label: "terjadi ketika.",
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
