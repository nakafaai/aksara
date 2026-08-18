import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "Dismissive of all nutritional advice", value: false },
    {
      label: "Certain that one food can prevent every infection",
      value: false,
    },
    { label: "Alarmist about eating any sugar", value: false },
    { label: "Practical and evidence-based", value: true },
    { label: "Indifferent to dietary habits", value: false },
  ],
};

export default choices;
