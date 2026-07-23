import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    { label: "Chicken", value: false },
    { label: "Beef", value: false },
    { label: "Rabbit", value: false },
    { label: "Lamb", value: true },
    { label: "Duck", value: false },
  ],
  id: [
    { label: "Ayam", value: false },
    { label: "Sapi", value: false },
    { label: "Kelinci", value: false },
    { label: "Domba", value: true },
    { label: "Bebek", value: false },
  ],
};

export default choices;
