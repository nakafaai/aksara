import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$27 \\text{ und } -8$$",
      value: true,
    },
    {
      label: "$$27 \\text{ und } 8$$",
      value: false,
    },
    {
      label: "$$24 \\text{ und } -8$$",
      value: false,
    },
    {
      label: "$$24 \\text{ und } -4$$",
      value: false,
    },
    {
      label: "$$24 \\text{ und } 4$$",
      value: false,
    },
  ],
  en: [
    {
      label: "$$27 \\text{ and } -8$$",
      value: true,
    },
    {
      label: "$$27 \\text{ and } 8$$",
      value: false,
    },
    {
      label: "$$24 \\text{ and } -8$$",
      value: false,
    },
    {
      label: "$$24 \\text{ and } -4$$",
      value: false,
    },
    {
      label: "$$24 \\text{ and } 4$$",
      value: false,
    },
  ],
  id: [
    {
      label: "$$27 \\text{ dan } -8$$",
      value: true,
    },
    {
      label: "$$27 \\text{ dan } 8$$",
      value: false,
    },
    {
      label: "$$24 \\text{ dan } -8$$",
      value: false,
    },
    {
      label: "$$24 \\text{ dan } -4$$",
      value: false,
    },
    {
      label: "$$24 \\text{ dan } 4$$",
      value: false,
    },
  ],
};

export default choices;
