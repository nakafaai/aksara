import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "$$1 - (-1)^n$$",
      value: false,
    },
    {
      label: "$$1 + (-1)^n$$",
      value: false,
    },
    {
      label: "$$-(-1)^n$$",
      value: true,
    },
    {
      label: "$$2(-1)^n$$",
      value: false,
    },
    {
      label: "$$-1$$",
      value: false,
    },
  ],
  id: [
    {
      label: "$$1 - (-1)^n$$",
      value: false,
    },
    {
      label: "$$1 + (-1)^n$$",
      value: false,
    },
    {
      label: "$$-(-1)^n$$",
      value: true,
    },
    {
      label: "$$2(-1)^n$$",
      value: false,
    },
    {
      label: "$$-1$$",
      value: false,
    },
  ],
};

export default choices;
