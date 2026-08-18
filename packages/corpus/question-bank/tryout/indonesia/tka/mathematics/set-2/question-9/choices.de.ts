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
};

export default choices;
