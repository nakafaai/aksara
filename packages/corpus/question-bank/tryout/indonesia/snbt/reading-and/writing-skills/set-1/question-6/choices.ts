import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    {
      label: "Furthermore.",
      value: false,
    },
    {
      label: "In addition.",
      value: true,
    },
    {
      label: "Therefore.",
      value: false,
    },
    {
      label: "In fact.",
      value: false,
    },
    {
      label: "For example.",
      value: false,
    },
  ],
  id: [
    {
      label: "Selanjutnya.",
      value: false,
    },
    {
      label: "Selain itu.",
      value: true,
    },
    {
      label: "Karena itu.",
      value: false,
    },
    {
      label: "Faktanya.",
      value: false,
    },
    {
      label: "Misalnya.",
      value: false,
    },
  ],
};

export default choices;
