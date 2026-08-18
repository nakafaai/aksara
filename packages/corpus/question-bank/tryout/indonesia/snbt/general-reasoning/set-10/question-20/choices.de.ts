import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Nur $$3$$.",
      value: true,
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
      label: "$$2$$, $$3$$ und $$4$$",
      value: false,
    },
    {
      label: "$$1$$, $$2$$, $$3$$ und $$4$$",
      value: false,
    },
  ],
};

export default choices;
