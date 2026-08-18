import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "NUR $$(1)$$, $$(2)$$ und $$(3)$$ sind wahr",
      value: true,
    },
    {
      label: "NUR $$(1)$$ und $$(3)$$ sind wahr",
      value: false,
    },
    {
      label: "NUR $$(2)$$ und $$(4)$$ sind wahr",
      value: false,
    },
    {
      label: "ALLE Aussagen sind wahr",
      value: false,
    },
    {
      label: "ALLE Aussagen sind falsch",
      value: false,
    },
  ],
};

export default choices;
