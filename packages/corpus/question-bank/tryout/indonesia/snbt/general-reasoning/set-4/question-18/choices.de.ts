import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$2$$ Belletristikbücher",
      value: false,
    },
    {
      label: "$$1$$ Belletristikbuch und $$1$$ Wissenschaftsbuch",
      value: false,
    },
    {
      label: "$$1$$ Wissenschaftsbuch und $$1$$ Geschichtsbuch",
      value: false,
    },
    {
      label: "$$2$$ Geschichtsbücher",
      value: false,
    },
    {
      label: "$$2$$ Wissenschaftsbücher",
      value: true,
    },
  ],
};

export default choices;
