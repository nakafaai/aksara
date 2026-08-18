import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "NUR $$(1)$$, $$(2)$$, $$(3)$$ sind korrekt",
      value: true,
    },
    {
      label: "NUR $$(1)$$ und $$(3)$$ sind korrekt",
      value: false,
    },
    {
      label: "NUR $$(2)$$ und $$(4)$$ sind korrekt",
      value: false,
    },
    {
      label: "NUR $$(4)$$ ist korrekt",
      value: false,
    },
    {
      label: "ALLE Aussagen sind richtig",
      value: false,
    },
  ],
};

export default choices;
