import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$1{,}2 \\text{ Minuten}$$",
      value: false,
    },
    {
      label: "$$4{,}8 \\text{ Minuten}$$",
      value: false,
    },
    {
      label: "$$18{,}8 \\text{ Minuten}$$",
      value: false,
    },
    {
      label: "$$16{,}8 \\text{ Minuten}$$",
      value: true,
    },
    {
      label: "$$14{,}2 \\text{ Minuten}$$",
      value: false,
    },
  ],
};

export default choices;
