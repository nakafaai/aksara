import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "Dismissive", value: false },
    { label: "Unconditionally enthusiastic", value: false },
    { label: "Alarmist", value: false },
    { label: "Balanced and cautious", value: true },
    { label: "Indifferent", value: false },
  ],
};

export default choices;
