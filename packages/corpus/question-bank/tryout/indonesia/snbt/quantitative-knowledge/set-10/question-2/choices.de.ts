import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$90 - x$$",
      value: false,
    },
    {
      label: "$$90 - 2x$$",
      value: false,
    },
    {
      label: "$$180 - x$$",
      value: false,
    },
    {
      label: "$$180 - 2x$$",
      value: true,
    },
    {
      label: "Unbekannt",
      value: false,
    },
  ],
};

export default choices;
