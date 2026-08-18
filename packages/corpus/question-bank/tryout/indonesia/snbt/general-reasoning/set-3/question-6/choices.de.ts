import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$\\text{it}$$",
      value: false,
    },
    {
      label: "$$\\text{pit}$$",
      value: false,
    },
    {
      label: "$$\\text{sit}$$",
      value: false,
    },
    {
      label: "$$\\text{nit}$$",
      value: true,
    },
    {
      label: "nichts davon",
      value: false,
    },
  ],
};

export default choices;
