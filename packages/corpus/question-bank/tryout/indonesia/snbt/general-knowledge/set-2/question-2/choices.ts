import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "jedoch.",
      value: false,
    },
    {
      label: "obwohl.",
      value: false,
    },
    {
      label: "während.",
      value: false,
    },
    {
      label: "sondern.",
      value: true,
    },
    {
      label: "vielmehr.",
      value: false,
    },
  ],
  en: [
    { label: "however.", value: false },
    { label: "although.", value: false },
    { label: "while.", value: false },
    { label: "but.", value: true },
    { label: "rather.", value: false },
  ],
  id: [
    { label: "namun.", value: false },
    { label: "meskipun.", value: false },
    { label: "sedangkan.", value: false },
    { label: "tetapi.", value: true },
    { label: "melainkan.", value: false },
  ],
};

export default choices;
