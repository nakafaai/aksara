import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$1, 2, 3$$",
      value: true,
    },
    {
      label: "$$1 \\text{ und } 3$$",
      value: false,
    },
    {
      label: "$$2 \\text{ und } 4$$",
      value: false,
    },
    {
      label: "$$4 \\text{ nur}$$",
      value: false,
    },
    {
      label: "alle",
      value: false,
    },
  ],
};

export default choices;
