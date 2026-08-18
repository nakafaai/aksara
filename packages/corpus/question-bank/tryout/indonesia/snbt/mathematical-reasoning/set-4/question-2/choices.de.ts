import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$1$$ Snackstrauß und $$2$$ Geldsträuße",
      value: false,
    },
    {
      label: "$$2$$ Snacksträuße und $$2$$ Geldsträuße",
      value: true,
    },
    {
      label: "$$1$$ großer Blumenstrauß und $$2$$ Geldsträuße",
      value: false,
    },
    {
      label: "$$1$$ großer Blumenstrauß und $$2$$ Snacksträuße",
      value: false,
    },
    {
      label: "$$1$$ kleiner Blumenstrauß und $$2$$ Snacksträuße",
      value: false,
    },
  ],
};

export default choices;
