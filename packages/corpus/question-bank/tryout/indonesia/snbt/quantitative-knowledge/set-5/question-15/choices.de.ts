import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$4 \\text{ oder } -2$$",
      value: true,
    },
    {
      label: "$$-4 \\text{ oder } 2$$",
      value: false,
    },
    {
      label: "$$-2 \\text{ oder } 3$$",
      value: false,
    },
    {
      label: "$$2 \\text{ oder } -3$$",
      value: false,
    },
    {
      label: "$$3 \\text{ oder } 8$$",
      value: false,
    },
  ],
};

export default choices;
