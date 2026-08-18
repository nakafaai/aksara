import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$(1)$$, $$(2)$$ und $$(3)$$ sind richtig.",
      value: false,
    },
    {
      label: "$$(1)$$ und $$(3)$$ sind richtig.",
      value: true,
    },
    {
      label: "$$(2)$$ und $$(4)$$ sind richtig.",
      value: false,
    },
    {
      label: "Nur $$(4)$$ ist richtig.",
      value: false,
    },
    {
      label: "Alle Aussagen sind richtig.",
      value: false,
    },
  ],
};

export default choices;
