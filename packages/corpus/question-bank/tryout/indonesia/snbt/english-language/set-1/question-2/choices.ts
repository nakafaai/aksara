import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "expensive", value: false },
    { label: "experimental", value: false },
    { label: "not equal or consistent", value: true },
    { label: "widely available", value: false },
    { label: "carefully planned", value: false },
  ],
};

export default choices;
