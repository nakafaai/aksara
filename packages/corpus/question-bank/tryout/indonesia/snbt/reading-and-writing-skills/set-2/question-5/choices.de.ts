import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Satz $$(1)$$.",
      value: false,
    },
    {
      label: "Satz $$(5)$$.",
      value: false,
    },
    {
      label: "Satz $$(6)$$.",
      value: false,
    },
    {
      label: "Satz $$(8)$$.",
      value: false,
    },
    {
      label: "Satz $$(10)$$.",
      value: true,
    },
  ],
};

export default choices;
