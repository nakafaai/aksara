import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$180$$ und $$20$$",
      value: true,
    },
    {
      label: "$$180$$ und $$10$$",
      value: false,
    },
    {
      label: "$$170$$ und $$15$$",
      value: false,
    },
    {
      label: "$$170$$ und $$20$$",
      value: false,
    },
    {
      label: "$$160$$ und $$25$$",
      value: false,
    },
  ],
};

export default choices;
