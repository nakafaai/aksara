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
  en: [
    { label: "Dito completed the prerequisite exercises", value: false },
    { label: "Dito took the practice test", value: false },
    { label: "Dito is not a student", value: false },
    { label: "Dito did not complete the prerequisite exercises", value: true },
    { label: "Dito received an evaluation report", value: false },
  ],
  id: [
    { label: "Dito menyelesaikan latihan prasyarat", value: false },
    { label: "Dito mengikuti tes latihan", value: false },
    { label: "Dito bukan seorang siswa", value: false },
    { label: "Dito tidak menyelesaikan latihan prasyarat", value: true },
    { label: "Dito menerima laporan evaluasi", value: false },
  ],
};

export default choices;
