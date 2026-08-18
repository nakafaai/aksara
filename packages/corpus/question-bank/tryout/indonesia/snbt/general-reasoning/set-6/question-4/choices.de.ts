import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "erhöht den Blutdruck",
      value: true,
    },
    {
      label: "senkt den Blutdruck",
      value: false,
    },
    {
      label: "beugt Herz-Kreislauf-Erkrankungen vor",
      value: false,
    },
    {
      label: "beschleunigt die Verdauung",
      value: false,
    },
    {
      label: "beseitigt den Kaliumbedarf des Körpers",
      value: false,
    },
  ],
};

export default choices;
