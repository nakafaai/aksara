import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    {
      label: "even.",
      value: false,
    },
    {
      label: "and.",
      value: false,
    },
    {
      label: "that.",
      value: true,
    },
    {
      label: "when.",
      value: false,
    },
    {
      label: "if.",
      value: false,
    },
  ],
  id: [
    {
      label: "bahkan.",
      value: false,
    },
    {
      label: "dan.",
      value: false,
    },
    {
      label: "bahwa.",
      value: true,
    },
    {
      label: "ketika.",
      value: false,
    },
    {
      label: "seandainya.",
      value: false,
    },
  ],
};

export default choices;
