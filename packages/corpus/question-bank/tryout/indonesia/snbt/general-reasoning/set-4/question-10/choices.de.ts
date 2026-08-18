import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Dito hat die vorausgesetzten Übungen abgeschlossen",
      value: false,
    },
    { label: "Dito nimmt nicht an einem Probetest teil", value: false },
    { label: "Dito erhält keinen Auswertungsbericht", value: false },
    { label: "Dito erhält einen Auswertungsbericht", value: true },
    {
      label:
        "Dito hat die vorausgesetzten Übungen abgeschlossen und erhält einen Auswertungsbericht",
      value: false,
    },
  ],
};

export default choices;
