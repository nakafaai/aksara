import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$120{.}000$$ Rupiah",
      value: false,
    },
    {
      label: "$$160{.}000$$ Rupiah",
      value: false,
    },
    {
      label: "$$200{.}000$$ Rupiah",
      value: false,
    },
    {
      label: "$$240{.}000$$ Rupiah",
      value: true,
    },
    {
      label: "$$280{.}000$$ Rupiah",
      value: false,
    },
  ],
  en: [
    { label: "$$120{,}000$$ rupiah", value: false },
    { label: "$$160{,}000$$ rupiah", value: false },
    { label: "$$200{,}000$$ rupiah", value: false },
    { label: "$$240{,}000$$ rupiah", value: true },
    { label: "$$280{,}000$$ rupiah", value: false },
  ],
  id: [
    { label: "$$120{.}000$$ rupiah", value: false },
    { label: "$$160{.}000$$ rupiah", value: false },
    { label: "$$200{.}000$$ rupiah", value: false },
    { label: "$$240{.}000$$ rupiah", value: true },
    { label: "$$280{.}000$$ rupiah", value: false },
  ],
};

export default choices;
