import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$15$$ Minuten",
      value: false,
    },
    {
      label: "$$30$$ Minuten",
      value: false,
    },
    {
      label: "$$45$$ Minuten",
      value: false,
    },
    {
      label: "$$60$$ Minuten",
      value: true,
    },
    {
      label: "$$75$$ Minuten",
      value: false,
    },
  ],
};

export default choices;
