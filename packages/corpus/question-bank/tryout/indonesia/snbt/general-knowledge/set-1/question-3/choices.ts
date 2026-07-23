import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    {
      label: "but.",
      value: true,
    },
    {
      label: "however.",
      value: false,
    },
    {
      label: "that.",
      value: false,
    },
    {
      label: "so.",
      value: false,
    },
    {
      label: "because.",
      value: false,
    },
  ],
  id: [
    {
      label: "tetapi.",
      value: true,
    },
    {
      label: "akan tetapi.",
      value: false,
    },
    {
      label: "bahwa.",
      value: false,
    },
    {
      label: "sehingga.",
      value: false,
    },
    {
      label: "karena.",
      value: false,
    },
  ],
};

export default choices;
