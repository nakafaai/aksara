import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    { label: "Monday", value: false },
    { label: "Tuesday", value: true },
    { label: "Wednesday", value: false },
    { label: "Thursday", value: false },
    { label: "Friday", value: false },
  ],
  id: [
    { label: "Senin", value: false },
    { label: "Selasa", value: true },
    { label: "Rabu", value: false },
    { label: "Kamis", value: false },
    { label: "Jumat", value: false },
  ],
};

export default choices;
