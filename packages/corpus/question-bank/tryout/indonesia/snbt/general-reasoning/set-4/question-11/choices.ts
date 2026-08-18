import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
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
