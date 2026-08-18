import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Die Anweisung $$(1)$$ ist ausreichend.",
      value: false,
    },
    {
      label: "Die Anweisung $$(2)$$ ist ausreichend.",
      value: true,
    },
    {
      label:
        "Die Anweisungen $$(1)$$ und $$(2)$$ sind ausreichend, wenn sie zusammen verwendet werden.",
      value: false,
    },
    {
      label:
        "Anweisung $$(1)$$ ist ausreichend, Anweisung $$(2)$$ ist ausreichend.",
      value: false,
    },
    {
      label: "Die Anweisungen $$(1)$$ und $$(2)$$ sind nicht ausreichend.",
      value: false,
    },
  ],
};

export default choices;
