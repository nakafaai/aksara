import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "equitable", value: true },
    { label: "appropriate", value: false },
    { label: "sustainable", value: false },
    { label: "digital", value: false },
    { label: "limited", value: false },
  ],
};

export default choices;
