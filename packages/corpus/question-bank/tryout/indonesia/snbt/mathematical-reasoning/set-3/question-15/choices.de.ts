import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$0{,}15$$ Teil",
      value: false,
    },
    {
      label: "$$0{,}3$$ Teil",
      value: false,
    },
    {
      label: "$$0{,}45$$ Teil",
      value: false,
    },
    {
      label: "$$0{,}6$$ Teil",
      value: false,
    },
    {
      label: "$$0{,}75$$ Teil",
      value: true,
    },
  ],
};

export default choices;
