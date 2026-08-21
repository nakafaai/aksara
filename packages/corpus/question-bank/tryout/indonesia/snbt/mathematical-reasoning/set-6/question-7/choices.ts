import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$1960$$ Einheiten",
      value: false,
    },
    {
      label: "$$2000$$ Einheiten",
      value: false,
    },
    {
      label: "$$2520$$ Einheiten",
      value: true,
    },
    {
      label: "$$2720$$ Einheiten",
      value: false,
    },
    {
      label: "$$3000$$ Einheiten",
      value: false,
    },
  ],
  en: [
    { label: "$$1960$$ units", value: false },
    { label: "$$2000$$ units", value: false },
    { label: "$$2520$$ units", value: true },
    { label: "$$2720$$ units", value: false },
    { label: "$$3000$$ units", value: false },
  ],
  id: [
    { label: "$$1960$$ unit", value: false },
    { label: "$$2000$$ unit", value: false },
    { label: "$$2520$$ unit", value: true },
    { label: "$$2720$$ unit", value: false },
    { label: "$$3000$$ unit", value: false },
  ],
};

export default choices;
