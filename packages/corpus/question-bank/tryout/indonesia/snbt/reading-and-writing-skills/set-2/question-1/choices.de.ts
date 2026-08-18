import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Satz $$(2)$$.",
      value: false,
    },
    {
      label: "Satz $$(4)$$.",
      value: false,
    },
    {
      label: "Satz $$(12)$$.",
      value: true,
    },
    {
      label: "Satz $$(13)$$.",
      value: false,
    },
    {
      label: "Satz $$(15)$$.",
      value: false,
    },
  ],
};

export default choices;
