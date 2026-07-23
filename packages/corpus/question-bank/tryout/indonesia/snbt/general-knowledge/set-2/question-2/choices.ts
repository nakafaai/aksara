import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    { label: "however.", value: false },
    { label: "although.", value: false },
    { label: "while.", value: false },
    { label: "but.", value: true },
    { label: "rather.", value: false },
  ],
  id: [
    { label: "namun.", value: false },
    { label: "meskipun.", value: false },
    { label: "sedangkan.", value: false },
    { label: "tetapi.", value: true },
    { label: "melainkan.", value: false },
  ],
};

export default choices;
