import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "it", value: false },
    { label: "pit", value: false },
    { label: "sit", value: false },
    { label: "nit", value: true },
    { label: "none of the above", value: false },
  ],
  id: [
    { label: "it", value: false },
    { label: "pit", value: false },
    { label: "sit", value: false },
    { label: "nit", value: true },
    { label: "tidak ada satupun", value: false },
  ],
};

export default choices;
