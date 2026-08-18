import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Die Aussagen $$(1)$$, $$(2)$$ und $$(3)$$ sind richtig",
      value: false,
    },
    {
      label: "Die Aussagen $$(1)$$ und $$(3)$$ sind richtig",
      value: false,
    },
    {
      label: "Die Aussagen $$(2)$$ und $$(4)$$ sind richtig",
      value: true,
    },
    {
      label: "Nur Aussage $$(4)$$ ist richtig",
      value: false,
    },
    {
      label: "Alle Aussagen sind richtig",
      value: false,
    },
  ],
};

export default choices;
