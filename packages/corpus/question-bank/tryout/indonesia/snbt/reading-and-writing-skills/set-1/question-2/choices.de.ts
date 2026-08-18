import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "nach dem Satz $$(2)$$.",
      value: true,
    },
    {
      label: "vor Satz $$(5)$$.",
      value: false,
    },
    {
      label: "nach dem Satz $$(4)$$.",
      value: false,
    },
    {
      label: "vor Satz $$(6)$$.",
      value: false,
    },
    {
      label: "nach dem Satz $$(7)$$.",
      value: false,
    },
  ],
};

export default choices;
