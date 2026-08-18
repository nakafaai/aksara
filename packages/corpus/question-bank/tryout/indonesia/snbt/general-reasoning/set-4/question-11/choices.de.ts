import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Dito hat die vorausgesetzten Übungen abgeschlossen",
      value: false,
    },
    { label: "Dito hat am Übungstest teilgenommen", value: false },
    { label: "Dito ist kein Lernender", value: false },
    {
      label: "Dito hat die vorausgesetzten Übungen nicht abgeschlossen",
      value: true,
    },
    { label: "Dito hat einen Auswertungsbericht erhalten", value: false },
  ],
};

export default choices;
