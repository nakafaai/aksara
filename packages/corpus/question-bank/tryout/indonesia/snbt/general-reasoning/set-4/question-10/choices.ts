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
  en: [
    { label: "Dito completed the prerequisite exercises", value: false },
    { label: "Dito did not take a mock test", value: false },
    { label: "Dito receives no evaluation report", value: false },
    { label: "Dito receives an evaluation report", value: true },
    {
      label:
        "Dito completed the prerequisite exercises and receives an evaluation report",
      value: false,
    },
  ],
  id: [
    { label: "Dito telah menyelesaikan latihan prasyarat", value: false },
    { label: "Dito tidak mengikuti tes simulasi", value: false },
    { label: "Dito tidak menerima laporan evaluasi", value: false },
    { label: "Dito menerima laporan evaluasi", value: true },
    {
      label:
        "Dito telah menyelesaikan latihan prasyarat dan menerima laporan evaluasi",
      value: false,
    },
  ],
};

export default choices;
