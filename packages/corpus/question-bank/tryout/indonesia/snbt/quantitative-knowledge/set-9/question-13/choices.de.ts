import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$14 \\text{ und } 2$$",
      value: false,
    },
    {
      label: "$$12 \\text{ und } 2$$",
      value: false,
    },
    {
      label: "$$8 \\text{ und } 2$$",
      value: false,
    },
    {
      label: "$$4 \\text{ und } 2$$",
      value: true,
    },
    {
      label: "$$2 \\text{ und } 2$$",
      value: false,
    },
  ],
};

export default choices;
