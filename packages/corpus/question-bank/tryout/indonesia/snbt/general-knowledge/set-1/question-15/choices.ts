import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "das Frostphänomen.",
      value: false,
    },
    {
      label: "die Grasfläche.",
      value: false,
    },
    {
      label: "hohes Plateau.",
      value: true,
    },
    {
      label: "der Frost.",
      value: false,
    },
    {
      label: "noch vorhanden.",
      value: false,
    },
  ],
  en: [
    {
      label: "dew phenomenon.",
      value: false,
    },
    {
      label: "expanse of grass.",
      value: false,
    },
    {
      label: "high plateau.",
      value: true,
    },
    {
      label: "frost.",
      value: false,
    },
    {
      label: "still located.",
      value: false,
    },
  ],
  id: [
    {
      label: "fenomena embun.",
      value: false,
    },
    {
      label: "hamparan rumput.",
      value: false,
    },
    {
      label: "dataran tinggi.",
      value: true,
    },
    {
      label: "embun es.",
      value: false,
    },
    {
      label: "masih berada.",
      value: false,
    },
  ],
};

export default choices;
