import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

// Date: 2025-11-23
const choices: QuestionChoices = {
  en: [
    {
      label: "$$3.5$$",
      value: true,
    },
    {
      label: "$$4$$",
      value: false,
    },
    {
      label: "$$4.5$$",
      value: false,
    },
    {
      label: "$$5$$",
      value: false,
    },
    {
      label: "$$5.5$$",
      value: false,
    },
  ],
  id: [
    {
      label: "$$3{,}5$$",
      value: true,
    },
    {
      label: "$$4$$",
      value: false,
    },
    {
      label: "$$4{,}5$$",
      value: false,
    },
    {
      label: "$$5$$",
      value: false,
    },
    {
      label: "$$5{,}5$$",
      value: false,
    },
  ],
};

export default choices;
