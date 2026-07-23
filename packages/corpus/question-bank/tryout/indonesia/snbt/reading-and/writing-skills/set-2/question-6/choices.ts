import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    {
      label: "possible.",
      value: false,
    },
    {
      label: "proper.",
      value: false,
    },
    {
      label: "combine.",
      value: false,
    },
    {
      label: "many.",
      value: false,
    },
    {
      label: "common.",
      value: true,
    },
  ],
  id: [
    {
      label: "mungkin.",
      value: false,
    },
    {
      label: "layak.",
      value: false,
    },
    {
      label: "gabung.",
      value: false,
    },
    {
      label: "banyak.",
      value: false,
    },
    {
      label: "lumrah.",
      value: true,
    },
  ],
};

export default choices;
