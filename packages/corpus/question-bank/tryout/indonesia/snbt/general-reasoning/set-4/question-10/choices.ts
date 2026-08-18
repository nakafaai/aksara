import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
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
