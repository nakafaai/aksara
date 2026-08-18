import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "zwischen den Sätzen $$(5)$$ und $$(6)$$.",
      value: true,
    },
    {
      label: "vor Satz $$(7)$$.",
      value: false,
    },
    {
      label: "zwischen den Sätzen $$(1)$$ und $$(2)$$.",
      value: false,
    },
    {
      label: "nach dem Satz $$(3)$$.",
      value: false,
    },
    {
      label: "zwischen den Sätzen $$(4)$$ und $$(5)$$.",
      value: false,
    },
  ],
};

export default choices;
