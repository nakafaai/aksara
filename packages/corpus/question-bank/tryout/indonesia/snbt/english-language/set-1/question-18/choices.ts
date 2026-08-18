import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "Increase", value: false },
    { label: "Ignore", value: false },
    { label: "Prevent", value: false },
    { label: "Measure", value: false },
    { label: "Relieve", value: true },
  ],
};

export default choices;
