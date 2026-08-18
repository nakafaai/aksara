import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    { label: "$$2$$ Teddybären", value: false },
    { label: "$$2$$ Murmeln", value: false },
    { label: "$$1$$ Ball und $$1$$ Barbie-Puppe", value: false },
    { label: "$$1$$ Barbie-Puppe und $$1$$ Murmel", value: false },
    { label: "$$1$$ Teddybär und $$1$$ Ball", value: true },
  ],
};

export default choices;
