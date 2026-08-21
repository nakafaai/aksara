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
  en: [
    {
      label: "complete digestion.",
      value: false,
    },
    {
      label: "rapid fermentation.",
      value: false,
    },
    {
      label: "incomplete absorption.",
      value: true,
    },
    {
      label: "excess enzyme production.",
      value: false,
    },
    {
      label: "food preference.",
      value: false,
    },
  ],
  id: [
    {
      label: "pencernaan sempurna.",
      value: false,
    },
    {
      label: "fermentasi cepat.",
      value: false,
    },
    {
      label: "penyerapan yang tidak sempurna.",
      value: true,
    },
    {
      label: "produksi enzim berlebih.",
      value: false,
    },
    {
      label: "kesukaan terhadap makanan.",
      value: false,
    },
  ],
};

export default choices;
