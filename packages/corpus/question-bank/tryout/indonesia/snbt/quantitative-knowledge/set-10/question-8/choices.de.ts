import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$1$$ und $$3$$",
      value: true,
    },
    {
      label: "$$2$$ und $$4$$",
      value: false,
    },
    {
      label: "$$1$$ und $$4$$",
      value: false,
    },
    {
      label: "$$3$$ und $$4$$",
      value: false,
    },
    {
      label: "$$1$$",
      value: false,
    },
  ],
};

export default choices;
