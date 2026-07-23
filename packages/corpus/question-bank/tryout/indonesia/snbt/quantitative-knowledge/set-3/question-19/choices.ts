import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "$$1.5$$ cm",
      value: true,
    },
    {
      label: "$$2$$ cm",
      value: false,
    },
    {
      label: "$$2.5$$ cm",
      value: false,
    },
    {
      label: "$$3$$ cm",
      value: false,
    },
    {
      label: "$$3.5$$ cm",
      value: false,
    },
  ],
  id: [
    {
      label: "$$1{,}5$$ cm",
      value: true,
    },
    {
      label: "$$2$$ cm",
      value: false,
    },
    {
      label: "$$2{,}5$$ cm",
      value: false,
    },
    {
      label: "$$3$$ cm",
      value: false,
    },
    {
      label: "$$3{,}5$$ cm",
      value: false,
    },
  ],
};

export default choices;
