import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "however.",
      value: false,
    },
    {
      label: "so.",
      value: true,
    },
    {
      label: "even.",
      value: false,
    },
    {
      label: "then.",
      value: false,
    },
    {
      label: "therefore.",
      value: false,
    },
  ],
  id: [
    {
      label: "namun.",
      value: false,
    },
    {
      label: "sehingga.",
      value: true,
    },
    {
      label: "bahkan.",
      value: false,
    },
    {
      label: "kemudian.",
      value: false,
    },
    {
      label: "oleh karena itu.",
      value: false,
    },
  ],
};

export default choices;
