import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "$$3a \\leq x \\leq 2b + a$$",
      value: false,
    },
    {
      label: "$$x \\geq -b + 3a$$",
      value: false,
    },
    {
      label: "$$x \\leq b + a$$",
      value: false,
    },
    {
      label: "$$b - 3a \\leq x \\leq -b + a$$",
      value: false,
    },
    {
      label: "$$-b + 3a \\leq x \\leq b + a$$",
      value: true,
    },
  ],
  id: [
    {
      label: "$$3a \\leq x \\leq 2b + a$$",
      value: false,
    },
    {
      label: "$$x \\geq -b + 3a$$",
      value: false,
    },
    {
      label: "$$x \\leq b + a$$",
      value: false,
    },
    {
      label: "$$b - 3a \\leq x \\leq -b + a$$",
      value: false,
    },
    {
      label: "$$-b + 3a \\leq x \\leq b + a$$",
      value: true,
    },
  ],
};

export default choices;
