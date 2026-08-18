import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$150\\text{ Gramm}$$",
      value: false,
    },
    {
      label: "$$175\\text{ Gramm}$$",
      value: false,
    },
    {
      label: "$$225\\text{ Gramm}$$",
      value: true,
    },
    {
      label: "$$250\\text{ Gramm}$$",
      value: false,
    },
    {
      label: "$$275\\text{ Gramm}$$",
      value: false,
    },
  ],
};

export default choices;
