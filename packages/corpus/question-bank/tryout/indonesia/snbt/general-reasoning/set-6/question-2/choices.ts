import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "October", value: false },
    { label: "November", value: false },
    { label: "December", value: true },
    { label: "January", value: false },
    { label: "February", value: false },
  ],
  id: [
    { label: "Oktober", value: false },
    { label: "November", value: false },
    { label: "Desember", value: true },
    { label: "Januari", value: false },
    { label: "Februari", value: false },
  ],
};

export default choices;
