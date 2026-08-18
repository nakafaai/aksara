import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$0$$ und $$2$$",
      value: false,
    },
    {
      label: "$$1$$ und $$2$$",
      value: false,
    },
    {
      label: "$$-1$$ und $$0$$",
      value: true,
    },
    {
      label: "$$-2$$ und $$2$$",
      value: false,
    },
    {
      label: "$$-2$$ und $$1$$",
      value: false,
    },
  ],
};

export default choices;
