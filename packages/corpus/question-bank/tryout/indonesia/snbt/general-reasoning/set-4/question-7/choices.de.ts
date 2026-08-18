import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$A = B$$ dann $$E = F$$",
      value: false,
    },
    {
      label: "$$A = B$$ oder $$E = F$$",
      value: false,
    },
    {
      label: "$$A \\neq B$$ und $$E = F$$",
      value: false,
    },
    {
      label: "$$E \\neq F$$ oder $$A \\neq B$$",
      value: false,
    },
    {
      label: "$$A = B$$ oder $$E \\neq F$$",
      value: true,
    },
  ],
};

export default choices;
