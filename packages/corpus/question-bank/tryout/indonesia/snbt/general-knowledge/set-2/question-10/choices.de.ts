import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "vollständige Verdauung.",
      value: false,
    },
    {
      label: "schnelle Fermentation.",
      value: false,
    },
    {
      label: "unvollständige Aufnahme.",
      value: true,
    },
    {
      label: "übermäßige Enzymbildung.",
      value: false,
    },
    {
      label: "Vorliebe für ein Lebensmittel.",
      value: false,
    },
  ],
};

export default choices;
