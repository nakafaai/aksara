import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$70$$ Minuten oder $$30$$ Minuten",
      value: true,
    },
    {
      label: "$$21$$ Minuten oder $$10$$ Minuten",
      value: false,
    },
    {
      label: "$$15$$ Minuten oder $$16$$ Minuten",
      value: false,
    },
    {
      label: "$$30$$ Minuten oder $$40$$ Minuten",
      value: false,
    },
    {
      label: "$$10$$ Minuten oder $$30$$ Minuten",
      value: false,
    },
  ],
};

export default choices;
