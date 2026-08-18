import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$72\\text{ Stunden}$$",
      value: false,
    },
    {
      label: "$$132\\text{ Stunden}$$",
      value: false,
    },
    {
      label: "$$144\\text{ Stunden}$$",
      value: true,
    },
    {
      label: "$$240\\text{ Stunden}$$",
      value: false,
    },
    {
      label: "$$360\\text{ Stunden}$$",
      value: false,
    },
  ],
};

export default choices;
