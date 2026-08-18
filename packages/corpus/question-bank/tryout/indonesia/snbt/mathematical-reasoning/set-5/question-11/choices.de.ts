import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$P < Q$$",
      value: false,
    },
    {
      label: "$$P > Q$$",
      value: true,
    },
    {
      label: "$$P = Q$$",
      value: false,
    },
    {
      label: "$$P = 2Q$$",
      value: false,
    },
    {
      label:
        "Die Beziehung zwischen $$P$$ und $$Q$$ lässt sich nicht bestimmen",
      value: false,
    },
  ],
};

export default choices;
