import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Satz $$(7)$$.",
      value: false,
    },
    {
      label: "Satz $$(6)$$.",
      value: false,
    },
    {
      label: "Satz $$(5)$$.",
      value: false,
    },
    {
      label: "Satz $$(4)$$.",
      value: true,
    },
    {
      label: "Satz $$(3)$$.",
      value: false,
    },
  ],
};

export default choices;
